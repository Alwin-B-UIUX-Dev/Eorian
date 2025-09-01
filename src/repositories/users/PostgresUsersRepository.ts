import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { Users } from '@/entities';
import type { IUsers, IUsersRepository } from '@/interfaces';
import type { CreateUsersData, IUsersData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresUsersRepository implements IUsersRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(usersData: CreateUsersData): Promise<IUsers> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO users (username, email, password_hash, role_id, is_active, is_connected, email_verified, gdpr_consent, gdpr_consent_date, last_login_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
          [
            usersData.username,
            usersData.email,
            usersData.password_hash,
            usersData.role_id,
            usersData.is_active,
            usersData.is_connected,
            usersData.email_verified,
            usersData.gdpr_consent,
            usersData.gdpr_consent_date,
            usersData.last_login_at
          ]
        );

        const UsersUsers: IUsersData = await t.one(
          /*sql*/ `SELECT * FROM v_user_login WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IUsersData = DatabaseMapper.snakeToCamel<IUsersData>(UsersUsers);

        return new Users(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }
  public async findById(id: string): Promise<IUsers> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IUsers[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IUsersData>): Promise<IUsers> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
