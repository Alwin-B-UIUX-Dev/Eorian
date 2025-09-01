import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { UserRoles } from '@/entities';
import type { IUserRoles, IUserRolesRepository } from '@/interfaces';
import type { CreateUserRolesData, IUserRolesData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresUserRolesRepository implements IUserRolesRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(userRolesData: CreateUserRolesData): Promise<IUserRoles> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO user-roles (role_name, description)
          VALUES ($1, $2) RETURNING id`,
          [userRolesData.role_name, userRolesData.description]
        );

        const userUserRoles: IUserRolesData = await t.one(
          /*sql*/ `SELECT * FROM v_user_UserRoles WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IUserRolesData =
          DatabaseMapper.snakeToCamel<IUserRolesData>(userUserRoles);

        return new UserRoles(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }
  public async findById(id: string): Promise<IUserRoles> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IUserRoles[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IUserRolesData>): Promise<IUserRoles> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
