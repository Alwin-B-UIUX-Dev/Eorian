// src/repositories/PostgresUserRepository.ts

import type { IDatabase } from 'pg-promise';
import { database, logger } from '@/configs';
import {
  UserErrorMessagesConstants,
  UserOperationsConstants,
  UserQueriesConstants
} from '@/constants';
import { User } from '@/entities';
import { DatabaseError } from '@/exceptions';
import type { IUser, IUserRepository } from '@/interfaces';
import type { CreateUserData, IUserData, UpdateUserData } from '@/types';
import { DatabaseMapper, Masker } from '@/utils';

export class PostgresUserRepository implements IUserRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();
  private readonly logger = logger;

  // =============================================
  // OPÉRATIONS CREATE-UPDATE-DELETE (sur tables)
  // =============================================
  public async create(userData: CreateUserData): Promise<IUser> {
    return await this.db.tx(async t => {
      const email = userData.email as string;
      try {
        this.logger.info('Attempting to create new user', {
          operation: UserOperationsConstants.CREATE_USER,
          email: Masker.maskEmail(email)
        });

        const result: { id: string } = await t.one(UserQueriesConstants.INSERT_USER, [
          userData.email,
          userData.username,
          userData.passwordHash,
          userData.roleId,
          userData.isActive,
          userData.emailVerified,
          userData.gdprConsent,
          userData.gdprConsentDate
        ]);

        const userProfile: IUserData = await t.one(UserQueriesConstants.SELECT_USER_BY_ID, [
          result.id
        ]);

        // Mapping automatique snake_case → camelCase
        const mappedProfile: IUserData = DatabaseMapper.snakeToCamel<IUserData>(userProfile);

        this.logger.info('User created successfully', {
          operation: UserOperationsConstants.CREATE_USER,
          userId: result.id,
          email: Masker.maskEmail(email)
        });

        return new User(mappedProfile); // Toutes les données sont déjà mappées
      } catch (err: unknown) {
        this.logger.error('Failed to create user', {
          operation: UserOperationsConstants.CREATE_USER,
          error: err instanceof Error ? err.message : 'unknown',
          stack: err instanceof Error ? err.stack : undefined
        });

        if (err instanceof Error) {
          if (err.message.includes(UserErrorMessagesConstants.DUPLICATE_KEY)) {
            throw DatabaseError.transactionFailed(UserErrorMessagesConstants.CREATE_USER_DUPLICATE);
          }
        }
        throw DatabaseError.transactionFailed(UserErrorMessagesConstants.CREATE_USER_FAILED);
      }
    });
  }
  public async update(id: string, userData: UpdateUserData): Promise<IUser> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Attempting to update user', { userId: id });

        // UPSERT natif PostgreSQL !
        const updatedUserData: IUserData = await t.one(
          UserQueriesConstants.UPSERT_USER_WITHOUT_PASSWORD,
          [
            id,
            userData.username,
            userData.email,
            userData.roleId,
            userData.isActive,
            userData.emailVerified
          ]
        );

        const mappedUserData: IUserData = DatabaseMapper.snakeToCamel<IUserData>(updatedUserData);

        this.logger.info('User updated/created successfully', { userId: id });
        return new User(mappedUserData);
      } catch (err: unknown) {
        this.logger.error('Failed to update user', { userId: id, error: err });
        throw DatabaseError.transactionFailed(UserErrorMessagesConstants.UPDATE_USER_FAILED);
      }
    });
  }

  public async delete(id: string): Promise<boolean> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Attempting to delete user by id', {
          operation: UserOperationsConstants.DELETE_USER_BY_ID,
          id
        });

        const result: { rowCount: number } = await t.result(
          UserQueriesConstants.DELETE_USER_BY_ID,
          [id]
        );

        this.logger.info('User deleted', {
          operation: UserOperationsConstants.DELETE_USER_BY_ID,
          deletedCount: result.rowCount
        });

        return result.rowCount > 0;
      } catch (error) {
        this.logger.error('Failed to delete user by id', {
          operation: UserOperationsConstants.DELETE_USER_BY_ID,
          error: error instanceof Error ? error.message : 'unknown',
          stack: error instanceof Error ? error.stack : undefined
        });

        throw DatabaseError.transactionFailed(UserErrorMessagesConstants.DELETE_USER_FAILED);
      }
    });
  }

  // ========================
  // READ (depuis views)
  // ========================
  public async findById(id: string): Promise<IUser | null> {
    try {
      this.logger.info('Attempting to find user by id', {
        operation: UserOperationsConstants.FIND_USER_BY_ID,
        id
      });

      const result: IUserData | null = await this.db.oneOrNone(
        UserQueriesConstants.SELECT_USER_PROFILE_COMPLETE,
        [id]
      );

      const found: boolean = result !== null;
      this.logger.info(`User search by id completed`, {
        operation: UserOperationsConstants.FIND_USER_BY_ID,
        found,
        userId: found ? result?.id : null
      });

      return result ? new User(result) : null;
    } catch (error) {
      this.logger.error('Failed to find user by id', {
        operation: UserOperationsConstants.FIND_USER_BY_ID,
        error: error instanceof Error ? error.message : 'unknown',
        stack: error instanceof Error ? error.stack : undefined
      });

      throw DatabaseError.transactionFailed(UserOperationsConstants.FIND_USER_BY_ID);
    }
  }

  public async findAll(limit: number = 10, offset: number = 0): Promise<IUser[]> {
    try {
      this.logger.info('Attempting to find all users', {
        operation: UserOperationsConstants.FIND_ALL_USERS,
        limit,
        offset
      });

      const usersData: IUserData[] = await this.db.manyOrNone(
        UserQueriesConstants.SELECT_ALL_USERS,
        [limit, offset]
      );

      if (!usersData || usersData.length === 0) {
        this.logger.info('No users found', {
          operation: UserOperationsConstants.FIND_ALL_USERS,
          limit,
          offset
        });
        return [];
      }

      // Mapping avec ton DatabaseMapper
      const mappedUsersData: IUserData[] = DatabaseMapper.snakeToCamelArray<IUserData>(usersData);

      // Conversion en objets User
      const users: IUser[] = mappedUsersData.map(userData => new User(userData));

      this.logger.info('Users found successfully', {
        operation: UserOperationsConstants.FIND_ALL_USERS,
        count: users.length,
        limit,
        offset
      });

      return users;
    } catch (err: unknown) {
      this.logger.error('Failed to find all users', {
        operation: UserOperationsConstants.FIND_ALL_USERS,
        limit,
        offset,
        error: err instanceof Error ? err.message : 'unknown',
        stack: err instanceof Error ? err.stack : undefined
      });

      throw DatabaseError.transactionFailed(UserErrorMessagesConstants.FIND_ALL_USERS_FAILED);
    }
  }

  // ===================================
  // OPÉRATIONS DE RECHERCHE
  // ===================================
  public async findByEmailOrUsername(identifier: string): Promise<IUser | null> {
    try {
      this.logger.info('Attempting to find user by email or username', {
        operation: UserOperationsConstants.FIND_USER_BY_EMAIL_OR_USERNAME,
        identifier: Masker.maskIdentifier(identifier)
      });

      const result: IUserData | null = await this.db.oneOrNone(
        UserQueriesConstants.SELECT_USER_BY_EMAIL_OR_USERNAME,
        [identifier]
      );
      const found: boolean = result !== null;
      this.logger.info(`User search by email or username completed`, {
        operation: UserOperationsConstants.FIND_USER_BY_EMAIL_OR_USERNAME,
        found,
        userId: found ? result?.id : null
      });

      return result ? new User(DatabaseMapper.snakeToCamel<IUserData>(result)) : null;
    } catch (error) {
      this.logger.error('Failed to find user by email or username', {
        operation: UserOperationsConstants.FIND_USER_BY_EMAIL_OR_USERNAME,
        error: error instanceof Error ? error.message : 'unknown',
        stack: error instanceof Error ? error.stack : undefined
      });

      throw DatabaseError.transactionFailed(
        UserErrorMessagesConstants.FIND_USER_BY_EMAIL_OR_USERNAME_FAILED
      );
    }
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    try {
      this.logger.info('Attempting to find user by email', {
        operation: UserOperationsConstants.FIND_USER_BY_EMAIL,
        email: Masker.maskEmail(email)
      });

      const result: IUserData | null = await this.db.oneOrNone(
        UserQueriesConstants.SELECT_USER_BY_EMAIL,
        [email]
      );

      const found: boolean = result !== null;
      this.logger.info(`User search by email completed`, {
        operation: UserOperationsConstants.FIND_USER_BY_EMAIL,
        found,
        userId: found ? result?.id : null
      });

      return result ? new User(result) : null;
    } catch (error) {
      this.logger.error('Failed to find user by email', {
        operation: UserOperationsConstants.FIND_USER_BY_EMAIL,
        error: error instanceof Error ? error.message : 'unknown',
        stack: error instanceof Error ? error.stack : undefined
      });

      throw DatabaseError.transactionFailed(UserErrorMessagesConstants.FIND_USER_BY_EMAIL_FAILED);
    }
  }

  public async findByUsername(username: string): Promise<IUser | null> {
    try {
      this.logger.info('Attempting to find user by username', {
        operation: UserOperationsConstants.FIND_USER_BY_USERNAME,
        username: Masker.maskUsername(username)
      });

      const result: IUserData | null = await this.db.oneOrNone(
        UserQueriesConstants.SELECT_USER_BY_USERNAME,
        [username]
      );

      const found: boolean = result !== null;
      this.logger.info(`User search by username completed`, {
        operation: UserOperationsConstants.FIND_USER_BY_USERNAME,
        found,
        userId: found ? result?.id : null
      });

      return result ? new User(result) : null;
    } catch (error) {
      this.logger.error('Failed to find user by username', {
        operation: UserOperationsConstants.FIND_USER_BY_USERNAME,
        error: error instanceof Error ? error.message : 'unknown',
        stack: error instanceof Error ? error.stack : undefined
      });

      throw DatabaseError.transactionFailed(
        UserErrorMessagesConstants.FIND_USER_BY_USERNAME_FAILED
      );
    }
  }

  // ===================================
  // OPÉRATIONS TECHNIQUES
  // ===================================
  public async updateLoginStatus(
    userId: string,
    isConnected: boolean,
    lastLoginAt: Date
  ): Promise<void> {
    try {
      this.logger.info('Attempting to update login status', {
        operation: UserOperationsConstants.UPDATE_LOGIN_STATUS,
        userId,
        isConnected
      });

      await this.db.none(UserQueriesConstants.UPDATE_LOGIN_STATUS, [
        userId,
        isConnected,
        lastLoginAt
      ]);

      this.logger.info('Login status updated successfully', {
        operation: UserOperationsConstants.UPDATE_LOGIN_STATUS,
        userId,
        isConnected
      });
    } catch (error) {
      this.logger.error('Failed to update login status', {
        operation: UserOperationsConstants.UPDATE_LOGIN_STATUS,
        error: error instanceof Error ? error.message : 'unknown',
        stack: error instanceof Error ? error.stack : undefined
      });

      throw DatabaseError.transactionFailed(UserOperationsConstants.UPDATE_LOGIN_STATUS);
    }
  }
}
