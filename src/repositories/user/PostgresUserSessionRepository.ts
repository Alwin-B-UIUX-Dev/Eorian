// src/repositories/PostgresSessionRepository.ts

import type { IDatabase } from 'pg-promise';
import { database, logger } from '@/configs';
import { DatabaseError } from '@/exceptions';
import type { IUserSessionRepository } from '@/interfaces';
import type { IDeviceInfoData, IUserSessionData } from '@/types';

export class PostgresUserSessionRepository implements IUserSessionRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();
  private readonly logger = logger;

  public async createSession(
    userId: string,
    refreshToken: string,
    deviceInfo?: IDeviceInfoData,
    ipAddress?: string
  ): Promise<void> {
    // TRANSACTION
    return await this.db.tx(async t => {
      try {
        this.logger.info('Creating new session', {
          operation: 'create_session',
          userId,
          deviceInfo,
          ipAddress
        });

        await t.query(
          `INSERT INTO user_sessions (user_id, refresh_token, device_info, ip_address, expires_at)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            userId,
            refreshToken,
            deviceInfo || 'unknown',
            ipAddress || null,
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          ]
        );

        this.logger.info('Session created successfully', {
          operation: 'create_session',
          userId
        });
      } catch (error) {
        this.logger.error('Failed to create session', {
          operation: 'create_session',
          userId,
          error: error instanceof Error ? error.message : 'unknown',
          stack: error instanceof Error ? error.stack : undefined
        });

        // Gestion erreur contrainte
        if (error instanceof Error && 'code' in error && error.code === '23505') {
          throw DatabaseError.transactionFailed('create_session_duplicate_token');
        }
        throw DatabaseError.transactionFailed('create_session');
      }
    });
  }

  public async cleanExpiredSessions(): Promise<void> {
    try {
      this.logger.info('Starting cleanup of expired sessions', {
        operation: 'clean_expired_sessions'
      });

      const result: { rowCount: number } = await this.db.result(`
        DELETE FROM user_sessions
        WHERE expires_at < NOW() OR is_active = false
      `);

      this.logger.info('Expired sessions cleanup completed', {
        operation: 'clean_expired_sessions',
        deletedCount: result.rowCount
      });
    } catch (error) {
      this.logger.error('Failed to clean expired sessions', {
        operation: 'clean_expired_sessions',
        error: error instanceof Error ? error.message : 'unknown',
        stack: error instanceof Error ? error.stack : undefined
      });

      throw DatabaseError.transactionFailed('clean_expired_sessions');
    }
  }

  public async findValidSessionByToken(refreshToken: string): Promise<IUserSessionData | null> {
    try {
      this.logger.info('Attempting to find valid session by token', {
        operation: 'find_valid_session_by_token',
        tokenPrefix: `${refreshToken.substring(0, 8)}***` // RGPD: Masquage
      });

      const result: IUserSessionData | null = await this.db.oneOrNone<IUserSessionData>(
        `SELECT * FROM v_user_session WHERE refresh_token = $1`,
        [refreshToken]
      );

      const found: boolean = result !== null;
      this.logger.info('Session search completed', {
        operation: 'find_valid_session_by_token',
        found,
        userId: found ? result?.id : null
      });

      return result;
    } catch (error) {
      this.logger.error('Failed to find valid session by token', {
        operation: 'find_valid_session_by_token',
        error: error instanceof Error ? error.message : 'unknown',
        stack: error instanceof Error ? error.stack : undefined
      });

      throw DatabaseError.transactionFailed('find_valid_session_by_token');
    }
  }

  public async revokeSession(refreshToken: string): Promise<void> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Revoking session', {
          operation: 'revoke_session',
          tokenPrefix: `${refreshToken.substring(0, 8)}***`
        });

        const result: { rowCount: number } = await t.result(
          `UPDATE user_sessions
           SET is_active = false, updated_at = NOW()
           WHERE refresh_token = $1 AND is_active = true`,
          [refreshToken]
        );

        // Vérification du nombre de lignes affectées
        if (result.rowCount === 0) {
          this.logger.warn('Session not found or already revoked', {
            operation: 'revoke_session'
          });
        } else {
          this.logger.info('Session revoked successfully', {
            operation: 'revoke_session',
            revokedCount: result.rowCount
          });
        }
      } catch (error) {
        this.logger.error('Failed to revoke session', {
          operation: 'revoke_session',
          error: error instanceof Error ? error.message : 'unknown',
          stack: error instanceof Error ? error.stack : undefined
        });

        throw DatabaseError.transactionFailed('revoke_session');
      }
    });
  }

  public async revokeAllUserSessions(userId: string): Promise<void> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Revoking all user sessions', {
          operation: 'revoke_all_user_sessions',
          userId
        });

        const result: { rowCount: number } = await t.result(
          `UPDATE user_sessions
           SET is_active = false, updated_at = NOW()
           WHERE user_id = $1 AND is_active = true`,
          [userId]
        );

        this.logger.info('All user sessions revoked', {
          operation: 'revoke_all_user_sessions',
          userId,
          revokedCount: result.rowCount
        });
      } catch (error) {
        this.logger.error('Failed to revoke all user sessions', {
          operation: 'revoke_all_user_sessions',
          userId,
          error: error instanceof Error ? error.message : 'unknown',
          stack: error instanceof Error ? error.stack : undefined
        });

        throw DatabaseError.transactionFailed('revoke_all_user_sessions');
      }
    });
  }
}
