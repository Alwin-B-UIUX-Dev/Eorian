// src/repositories/user/PostgresUserRoleRepository.ts

import type { IDatabase } from 'pg-promise';
import { database, logger } from '@/configs';
import { UserRoleLogOperations, UserRoleQueries } from '@/constants';
import { UserRole } from '@/entities/user/UserRole';
import { DatabaseError } from '@/exceptions';
import type { IUserRole } from '@/interfaces/entities/user/IUserRole';
import type { IUserRoleRepository } from '@/interfaces/repositories/user/IUserRoleRepository';
import type { CreateUserRoleData, IUserRoleData, UpdateUserRoleData } from '@/types/entities/user';
import { DatabaseMapper } from '@/utils/DatabaseMapper';

export class PostgresUserRoleRepository implements IUserRoleRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();
  private readonly logger = logger;

  public async create(data: CreateUserRoleData): Promise<IUserRole> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Creating user role', {
          operation: UserRoleLogOperations.CREATE_USER_ROLE,
          roleName: data.roleName
        });
        const result: { id: string } = await t.one(UserRoleQueries.INSERT_USER_ROLE, [
          data.roleName,
          data.description
        ]);
        const row = await t.one(UserRoleQueries.SELECT_USER_ROLE_BY_ID, [result.id]);
        const mapped: IUserRoleData = DatabaseMapper.snakeToCamel<IUserRoleData>(row);
        return new UserRole(mapped);
      } catch (error) {
        this.logger.error('Failed to create user role', {
          operation: UserRoleLogOperations.CREATE_USER_ROLE,
          error
        });
        throw DatabaseError.transactionFailed(UserRoleLogOperations.CREATE_USER_ROLE);
      }
    });
  }

  public async update(id: string, data: UpdateUserRoleData): Promise<IUserRole> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Updating user role', {
          operation: UserRoleLogOperations.UPDATE_USER_ROLE,
          id
        });
        const row = await t.one(UserRoleQueries.UPDATE_USER_ROLE, [
          Number(id),
          data.roleName,
          data.description
        ]);
        const mapped: IUserRoleData = DatabaseMapper.snakeToCamel<IUserRoleData>(row);
        return new UserRole(mapped);
      } catch (error) {
        this.logger.error('Failed to update user role', {
          operation: UserRoleLogOperations.UPDATE_USER_ROLE,
          id,
          error
        });
        throw DatabaseError.transactionFailed(UserRoleLogOperations.UPDATE_USER_ROLE);
      }
    });
  }

  public async delete(id: string): Promise<boolean> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Deleting user role', {
          operation: UserRoleLogOperations.DELETE_USER_ROLE_BY_ID,
          id
        });
        const result: { rowCount: number } = await t.result(
          UserRoleQueries.DELETE_USER_ROLE_BY_ID,
          [Number(id)]
        );
        return result.rowCount > 0;
      } catch (error) {
        this.logger.error('Failed to delete user role', {
          operation: UserRoleLogOperations.DELETE_USER_ROLE_BY_ID,
          id,
          error
        });
        throw DatabaseError.transactionFailed(UserRoleLogOperations.DELETE_USER_ROLE_BY_ID);
      }
    });
  }

  public async findById(id: string): Promise<IUserRole | null> {
    try {
      this.logger.info('Finding user role by id', {
        operation: UserRoleLogOperations.FIND_USER_ROLE_BY_ID,
        id
      });
      const row: IUserRoleData | null = await this.db.oneOrNone(
        UserRoleQueries.SELECT_USER_ROLE_BY_ID,
        [Number(id)]
      );
      return row ? new UserRole(DatabaseMapper.snakeToCamel<IUserRoleData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find user role by id', {
        operation: UserRoleLogOperations.FIND_USER_ROLE_BY_ID,
        id,
        error
      });
      throw DatabaseError.transactionFailed(UserRoleLogOperations.FIND_USER_ROLE_BY_ID);
    }
  }

  public async findAll(limit: number = 50, offset: number = 0): Promise<IUserRole[]> {
    try {
      this.logger.info('Finding all user roles', {
        operation: UserRoleLogOperations.FIND_ALL_USER_ROLES,
        limit,
        offset
      });
      const rows: IUserRoleData[] = await this.db.manyOrNone(
        UserRoleQueries.SELECT_ALL_USER_ROLES,
        [limit, offset]
      );
      const mapped: IUserRoleData[] = DatabaseMapper.snakeToCamelArray<IUserRoleData>(rows);
      return mapped.map(r => new UserRole(r));
    } catch (error) {
      this.logger.error('Failed to find all user roles', {
        operation: UserRoleLogOperations.FIND_ALL_USER_ROLES,
        error
      });
      throw DatabaseError.transactionFailed(UserRoleLogOperations.FIND_ALL_USER_ROLES);
    }
  }

  public async findByRoleName(roleName: string): Promise<IUserRole | null> {
    try {
      this.logger.info('Finding user role by name', {
        operation: UserRoleLogOperations.FIND_USER_ROLE_BY_NAME,
        roleName
      });
      const row: IUserRoleData | null = await this.db.oneOrNone(
        UserRoleQueries.SELECT_USER_ROLE_BY_NAME,
        [roleName]
      );
      return row ? new UserRole(DatabaseMapper.snakeToCamel<IUserRoleData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find user role by name', {
        operation: UserRoleLogOperations.FIND_USER_ROLE_BY_NAME,
        roleName,
        error
      });
      throw DatabaseError.transactionFailed(UserRoleLogOperations.FIND_USER_ROLE_BY_NAME);
    }
  }
}
