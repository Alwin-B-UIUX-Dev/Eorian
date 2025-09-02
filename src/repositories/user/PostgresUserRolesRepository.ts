import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { UserRole } from '@/entities';
import type { IUserRole, IUserRolesRepository } from '@/interfaces';
import type { CreateUserRoleData, IUserRoleData } from '@/types/entities/user/IUserRoleData';
import { DatabaseMapper } from '@/utils';

export class PostgresUserRolesRepository implements IUserRolesRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(userRolesData: CreateUserRoleData): Promise<IUserRole> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO user-roles (role_name, description)
          VALUES ($1, $2) RETURNING id`,
          [userRolesData.role_name, userRolesData.description]
        );

        const userUserRoles: IUserRoleData = await t.one(
          /*sql*/ `SELECT * FROM v_user_UserRoles WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IUserRoleData =
          DatabaseMapper.snakeToCamel<IUserRoleData>(userUserRoles);

        return new UserRole(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }
  public async findById(id: string): Promise<IUserRole> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IUserRole[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IUserRoleData>): Promise<IUserRole> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
