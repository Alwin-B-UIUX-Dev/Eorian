import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { User } from '@/entities';
import type { IUser, IUserRepository } from '@/interfaces';
import type { CreateUserData, IUserData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresUserRepository implements IUserRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(userData: CreateUserData): Promise<IUser> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO users (username, email, password_hash, role_id, is_active, is_connected, email_verified, gdpr_consent, gdpr_consent_date, last_login_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
          [
            userData.username,
            userData.email,
            userData.password_hash,
            userData.role_id,
            userData.is_active,
            userData.is_connected,
            userData.email_verified,
            userData.gdpr_consent,
            userData.gdpr_consent_date,
            userData.last_login_at
          ]
        );

        const userUser: IUserData = await t.one(
          /*sql*/ `SELECT * FROM v_user_login WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IUserData = DatabaseMapper.snakeToCamel<IUserData>(userUser);

        return new User(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }
  public async findById(id: string): Promise<IUser> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IUser[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IUserData>): Promise<IUser> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
