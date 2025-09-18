// src/middlewares/AuthMiddleware.ts
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { logger } from '@/configs';
import { TokenError } from '@/exceptions';
import type { ITokenManager } from '@/interfaces';
import type { ITokenPayloadData } from '@/types';

export class AuthMiddleware {
  public static authenticate(tokenManager: ITokenManager): RequestHandler {
    return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
      try {
        const cookieAccess: string | undefined = req.cookies?.accessToken;
        const cookieRefresh: string | undefined = req.cookies?.refreshToken;
        const authHeader: string | undefined = req.headers?.authorization;
        const headerAccess: string | undefined = authHeader?.startsWith('Bearer ')
          ? authHeader.slice(7).trim()
          : undefined;
        const accessToken: string | undefined = cookieAccess ?? headerAccess;
        const refreshToken: string | undefined = cookieRefresh;
        logger.error('🎯 MIDDLEWARE - tokens:', {
          accessToken: !!accessToken,
          refreshToken: !!refreshToken
        });

        let payload: ITokenPayloadData;
        let tokenType: 'access' | 'refresh';

        // AU MOINS UN TOKEN DOIT EXISTER
        if (!accessToken && !refreshToken) {
          logger.error('❌ MIDDLEWARE - No tokens found');
          throw TokenError.tokenNotFound().log();
        }

        // Essaye accessToken d'abord, puis refreshToken
        if (accessToken) {
          try {
            console.log('🔍 MIDDLEWARE - Verifying access token...');
            payload = await tokenManager.verifyToken(accessToken);
            tokenType = 'access';
            console.log('✅ MIDDLEWARE - Access token verified');
          } catch (error) {
            console.log('❌ MIDDLEWARE - Access token failed:', error);
            if (refreshToken) {
              console.log('🔄 MIDDLEWARE - Trying refresh token...');
              payload = await tokenManager.verifyToken(refreshToken);
              tokenType = 'refresh';
              console.log('✅ MIDDLEWARE - Refresh token verified');
            } else {
              console.log('❌ MIDDLEWARE - No refresh token to fallback');
              throw TokenError.tokenNotFound().log();
            }
          }
        } else if (refreshToken) {
          // PAS D'ACCESS TOKEN MAIS REFRESH TOKEN EXISTE
          payload = await tokenManager.verifyToken(refreshToken);
          tokenType = 'refresh';
        } else {
          // CETTE LIGNE NE SERA JAMAIS ATTEINTE (garde-fou)
          throw TokenError.tokenNotFound().log();
        }

        req.user = {
          id: payload?.userId,
          username: payload?.username ?? undefined,
          role: payload?.role,
          tokenType,
          jwtId: payload?.jti as string
        };

        next();
      } catch (error) {
        logger.error('🚨 MIDDLEWARE - Error:', error);
        next(error);
      }
    };
  }

  public static authenticateRole(...allowedRoles: string[]): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
      if (!req.user) {
        throw TokenError.authenticationRequired(
          "L'authentification est requise avant la vérification des rôles"
        );
      }

      const userRole: string | undefined = req.user.role;

      if (!userRole || !allowedRoles.includes(userRole)) {
        throw TokenError.insufficientPermissions(
          `Accès refusé. Rôles requis: ${allowedRoles.join(', ')}`
        );
      }

      next();
    };
  }
}
