// src/services/TokenService.ts

import { logger } from '@/configs';
import type { ITokenManager, ITokenService, IUser, IUserSessionRepository } from '@/interfaces';
import type { IDeviceInfoData, ITokenPayloadData } from '@/types';

export class TokenService implements ITokenService {
  constructor(
    private readonly tokenManager: ITokenManager,
    private readonly sessionRepository: IUserSessionRepository
  ) {}

  // MÉTHODE 1 - Génération Access Token (stateless)
  public async generateAccessToken(user: IUser): Promise<string> {
    try {
      const payload: ITokenPayloadData = {
        userId: user.getId().toString(),
        username: user.getUsername(),
        role: user.getRoleName(),
        sessionType: 'stateless'
      };

      const accessToken: string = await this.tokenManager.generateAccessToken(payload);

      logger.info('Access token generated', {
        operation: 'generate_access_token',
        userId: user.getId(),
        tokenType: 'access'
      });

      return accessToken;
    } catch (error) {
      logger.error('Failed to generate access token', {
        operation: 'generate_access_token',
        userId: user.getId(),
        error: error instanceof Error ? error.message : 'unknown'
      });
      throw error;
    }
  }

  // MÉTHODE 2 - Génération Refresh Token (stateful)
  public async generateRefreshToken(
    user: IUser,
    deviceInfo?: IDeviceInfoData,
    clientIP?: string
  ): Promise<string> {
    try {
      const payload: ITokenPayloadData = {
        userId: user.getId().toString(),
        username: user.getUsername(),
        role: user.getRoleName(),
        sessionType: 'stateful'
      };

      const refreshToken: string = await this.tokenManager.generateRefreshToken(payload);

      // Stocker en DB pour le remember me
      await this.sessionRepository.createSession(user.getId(), refreshToken, deviceInfo, clientIP);

      logger.info('Refresh token generated and session created', {
        operation: 'generate_refresh_token',
        userId: user.getId(),
        tokenType: 'refresh'
      });

      return refreshToken;
    } catch (error) {
      logger.error('Failed to generate refresh token', {
        operation: 'generate_refresh_token',
        userId: user.getId(),
        error: error instanceof Error ? error.message : 'unknown'
      });
      throw error;
    }
  }

  public async revokeRefreshToken(refreshToken: string): Promise<void> {
    try {
      await this.sessionRepository.revokeSession(refreshToken);
    } catch (error) {
      logger.error('Failed to revoke refresh token', {
        operation: 'revoke_refresh_token',
        error: error instanceof Error ? error.message : 'unknown'
      });
      throw error;
    }
  }

  // RÉVOCATION DE TOUS LES REFRESH TOKENS D'UN USER
  public async revokeAllUserRefreshTokens(userId: string): Promise<void> {
    try {
      await this.sessionRepository.revokeAllUserSession(userId);
    } catch (error) {
      logger.error('Failed to revoke all user refresh tokens', {
        operation: 'revoke_all_user_refresh_tokens',
        userId,
        error: error instanceof Error ? error.message : 'unknown'
      });
      throw error;
    }
  }
}
