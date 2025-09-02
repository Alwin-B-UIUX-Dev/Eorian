import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { UserSession } from '@/entities';
import type { IUserSession, IUserSessionRepository } from '@/interfaces';
import type { CreateUserSessionData, IUserSessionData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresUserSessionRepository implements IUserSessionRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(userSessionsData: CreateUserSessionData): Promise<IUserSession> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO user-sessions (user_id, refresh_token, device_info, ip_address, expires_at, is_active, revoked_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
          [
            userSessionsData.user_id,
            userSessionsData.refresh_token,
            userSessionsData.device_info,
            userSessionsData.ip_address,
            userSessionsData.expires_at,
            userSessionsData.is_active,
            userSessionsData.revoked_at
          ]
        );

        const userUserSessions: IUserSessionData = await t.one(
          /*sql*/ `SELECT * FROM v_user_session WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IUserSessionData =
          DatabaseMapper.snakeToCamel<IUserSessionData>(userUserSessions);

        return new UserSession(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }
  public async findById(id: string): Promise<IUserSession> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IUserSession[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IUserSessionData>): Promise<IUserSession> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
