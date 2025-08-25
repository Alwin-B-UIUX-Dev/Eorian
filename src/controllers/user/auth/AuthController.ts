// src/controllers/AuthController.ts

import type { NextFunction, Request, Response } from 'express';
import { logger } from '@/configs';
import { LoginDto, LogoutDto, RegisterUserDto, ResponseUserDto } from '@/dtos';
import { ApiError } from '@/exceptions';
import type {
  IAuthController,
  IAuthService,
  ICookieManager,
  ITokenService,
  IUser
} from '@/interfaces';
import type { IApiResponseData, IDeviceInfoData } from '@/types';
import { ApiResponse, DeviceInfo, Masker, RequestIdGenerator } from '@/utils';

export class AuthController implements IAuthController {
  constructor(
    private readonly authService: IAuthService, // Injection + déclaration
    private readonly tokenService: ITokenService, // Injection + déclaration
    private readonly cookieManager: ICookieManager // Injection + déclaration
  ) {
    console.log('🔧 AuthController constructor', {
      hasAuthService: !!this.authService,
      hasTokenService: !!this.tokenService,
      hasCookieManager: !!this.cookieManager
    });
  }

  // ===== HANDLERS =====
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log('🔧 AuthController state', {
        hasAuthService: !!this.authService,
        hasTokenService: !!this.tokenService,
        hasCookieManager: !!this.cookieManager,
        authServiceType: this.authService?.constructor.name
      });

      const requestId: string = RequestIdGenerator.getFromRequest(req);
      const deviceInfo: IDeviceInfoData = DeviceInfo.extractFromRequest(req);
      const clientIP: string = DeviceInfo.getClientIP(req);
      const registerUserDto = new RegisterUserDto(req.body);
      const gdprConsent: boolean = registerUserDto.getGdprConsent();
      console.log('🚀 ~ AuthController ~ register ~ registerUserDto:', registerUserDto);

      logger.info('User registration attempt', {
        requestId,
        email: Masker.maskEmail(registerUserDto.getEmail()),
        username: Masker.maskUsername(registerUserDto.getUsername()),
        deviceInfo,
        clientIP: Masker.MaskClientIP(clientIP),
        timestamp: new Date().toISOString(),
        operation: 'user_registration'
      });

      if (gdprConsent === false) {
        throw new ApiError('Veuillez accepter notre politique de confidentialité.', 403, {
          requestId,
          email: Masker.maskEmail(registerUserDto.getEmail()),
          username: Masker.maskUsername(registerUserDto.getUsername()),
          deviceInfo,
          clientIP: Masker.MaskClientIP(clientIP),
          timestamp: new Date().toISOString(),
          operation: 'user_registration'
        });
      }

      const user: IUser = await this.authService.register(registerUserDto);
      const userResponse: ResponseUserDto = ResponseUserDto.fromUser(user);

      logger.info('User registration successful', {
        requestId,
        email: Masker.maskEmail(registerUserDto.getEmail()),
        username: Masker.maskUsername(registerUserDto.getUsername()),
        deviceInfo,
        clientIP: Masker.MaskClientIP(clientIP),
        timestamp: new Date().toISOString(),
        operation: 'user_registration_success'
      });

      const response: IApiResponseData<{ user: ResponseUserDto }> = ApiResponse.success(
        'Inscription réussie. Veuillez vous connecter.',
        { user: userResponse },
        requestId
      );

      res.status(201).json(response);
    } catch (error) {
      const requestId: string = RequestIdGenerator.getFromRequest(req);
      const clientIP: string = DeviceInfo.getClientIP(req);
      const deviceInfo: IDeviceInfoData = DeviceInfo.extractFromRequest(req);

      // Si c'est déjà une ApiError, on la log et la passe au middleware
      if (error instanceof ApiError) {
        error.log();
        return next(error);
      }

      // Sinon, on crée une nouvelle ApiError avec les infos contextuelles
      const apiError = new ApiError('User registration failed', 500, {
        requestId,
        email: req.body?.email,
        deviceInfo,
        clientIP: Masker.MaskClientIP(clientIP),
        operation: 'user_registration_failed',
        originalError: error instanceof Error ? error.message : String(error)
      });

      // Log automatique avec stack incluse
      apiError.log();

      // Passe au middleware de gestion d'erreur
      next(apiError);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestId: string = RequestIdGenerator.getFromRequest(req);
      const deviceInfo: IDeviceInfoData = DeviceInfo.extractFromRequest(req);
      const clientIP: string = DeviceInfo.getClientIP(req);
      const loginDto = new LoginDto(req.body);

      logger.info('User login attempt', {
        requestId,
        identifier: Masker.maskIdentifier(loginDto.getIdentifierType()),
        rememberMe: loginDto.getRememberMe(),
        deviceInfo,
        clientIP: Masker.MaskClientIP(clientIP),
        timestamp: new Date().toISOString(),
        operation: 'user_login'
      });

      const user: IUser = await this.authService.login(loginDto);
      const rememberMe: boolean = loginDto.getRememberMe();

      // GÉNÉRATION SELON TES 2 MÉTHODES DISTINCTES
      let accessToken: string | undefined;
      let refreshToken: string | undefined;
      let sessionType: 'stateless' | 'stateful';

      if (rememberMe === true) {
        // SESSION STATEFUL - 7 jours
        refreshToken = await this.tokenService.generateRefreshToken(user, deviceInfo, clientIP);
        sessionType = 'stateful';
      } else {
        // SESSION STATELESS - 15 minutes
        accessToken = await this.tokenService.generateAccessToken(user);
        sessionType = 'stateless';
      }

      // SET COOKIES (ton CookieManager gère les undefined)
      this.cookieManager.setAuthCookies(res, accessToken, refreshToken);

      // RÉPONSE USER
      const userResponse: ResponseUserDto = ResponseUserDto.fromUser(user);

      logger.info('User login successful', {
        requestId,
        userId: userResponse.id,
        email: Masker.maskEmail(userResponse.email),
        sessionType,
        deviceInfo,
        clientIP: Masker.MaskClientIP(clientIP),
        timestamp: new Date().toISOString(),
        operation: 'user_login_success'
      });

      // CALCUL D'EXPIRATION
      const expirationTime: number =
        sessionType === 'stateful'
          ? 7 * 24 * 60 * 60 * 1000 // 7 jours
          : 15 * 60 * 1000; // 15 minutes

      const response: IApiResponseData<{
        user: ResponseUserDto;
        sessionType: 'stateless' | 'stateful';
        expiresAt: Date;
      }> = ApiResponse.success(
        'Connexion réussie.',
        {
          user: userResponse,
          sessionType,
          expiresAt: new Date(Date.now() + expirationTime)
        },
        requestId
      );

      res.status(200).json(response);
    } catch (error) {
      const deviceInfo: IDeviceInfoData = DeviceInfo.extractFromRequest(req);
      const clientIP: string = DeviceInfo.getClientIP(req);

      logger.error('User login failed', {
        requestId: RequestIdGenerator.getFromRequest(req),
        email: req.body?.email,
        error: error instanceof Error ? error.message : 'Unknown error',
        deviceInfo,
        clientIP: Masker.MaskClientIP(clientIP),
        timestamp: new Date().toISOString(),
        operation: 'user_login_failed'
      });

      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deviceInfo: IDeviceInfoData = DeviceInfo.extractFromRequest(req);
      const clientIP: string = DeviceInfo.getClientIP(req);
      const logoutDto = new LogoutDto(req.body);
      const userId: string | undefined = req.user?.id;
      const tokenType: 'access' | 'refresh' | undefined = req.user?.tokenType;

      logger.info('User logout attempt', {
        userId,
        logoutInfo: logoutDto.getLogInfo(),
        tokenType,
        deviceInfo,
        clientIP: Masker.MaskClientIP(clientIP),
        timestamp: new Date().toISOString(),
        operation: 'user_logout'
      });

      // ACCESS TOKEN → Déconnexion stateless
      if (tokenType === 'access') {
        await this.authService.logout(userId as string); // UPDATE isConnected = false
        this.cookieManager.clearAuthCookies(res);

        logger.info('User logout successful', {
          userId,
          tokenType,
          deviceInfo,
          clientIP: Masker.MaskClientIP(clientIP),
          timestamp: new Date().toISOString(),
          operation: 'user_logout_success'
        });

        res.status(200).json(
          ApiResponse.success('Déconnexion réussie - Votre session expirera automatiquement', {
            loggedOut: true,
            strategy: 'stateless'
          })
        );
      }
      // REFRESH TOKEN → Déconnexion stateful
      else if (tokenType === 'refresh') {
        if (logoutDto.isLogoutAllDevices()) {
          await this.tokenService.revokeAllUserRefreshTokens(userId as string);
        } else {
          await this.tokenService.revokeRefreshToken(req.cookies.refreshToken);
        }
        await this.authService.logout(userId as string);
        this.cookieManager.clearAuthCookies(res);

        logger.info('User logout successful', {
          userId,
          logoutInfo: logoutDto.getLogInfo(),
          tokenType,
          deviceInfo,
          clientIP: Masker.MaskClientIP(clientIP),
          timestamp: new Date().toISOString(),
          operation: 'user_logout_success'
        });

        res.status(200).json(
          ApiResponse.success('Déconnexion réussie - Session révoquée immédiatement', {
            loggedOut: true,
            strategy: 'stateful'
          })
        );
      }
    } catch (error) {
      this.cookieManager.clearAuthCookies(res);
      next(error);
    }
  }
}
