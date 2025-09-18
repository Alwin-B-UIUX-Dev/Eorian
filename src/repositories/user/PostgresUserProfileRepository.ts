// src/repositories/user/PostgresUserProfileRepository.ts

import type { IDatabase } from 'pg-promise';
import { database, logger } from '@/configs';
import {
  UserProfileErrorMessages,
  UserProfileLogOperations,
  UserProfileQueries
} from '@/constants';
import { UserProfile } from '@/entities';
import { DatabaseError } from '@/exceptions';
import type { IUserProfile, IUserProfileRepository } from '@/interfaces';
import type { CreateUserProfileData, IUserProfileData, UpdateUserProfileData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresUserProfileRepository implements IUserProfileRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();
  private readonly logger = logger;

  // =============================================
  // OPÉRATIONS CREATE-UPDATE-DELETE (sur tables)
  // =============================================
  public async create(profileData: CreateUserProfileData): Promise<IUserProfile> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Attempting to create new user profile', {
          operation: UserProfileLogOperations.CREATE_USER_PROFILE,
          userId: profileData.userId
        });

        const result: IUserProfileData = await t.one(UserProfileQueries.INSERT_USER_PROFILE, [
          profileData.userId,
          profileData.firstName,
          profileData.lastName,
          profileData.phone,
          profileData.birthDate,
          profileData.avatarUrl || null
        ]);

        // Mapping automatique snake_case → camelCase
        const mappedProfile: IUserProfileData =
          DatabaseMapper.snakeToCamel<IUserProfileData>(result);

        this.logger.info('User profile created successfully', {
          operation: UserProfileLogOperations.CREATE_USER_PROFILE,
          profileId: mappedProfile.id,
          userId: profileData.userId
        });

        return new UserProfile(mappedProfile);
      } catch (err: unknown) {
        this.logger.error('Failed to create user profile', {
          operation: UserProfileLogOperations.CREATE_USER_PROFILE,
          error: err instanceof Error ? err.message : 'unknown',
          stack: err instanceof Error ? err.stack : undefined
        });

        if (err instanceof Error) {
          if (err.message.includes(UserProfileErrorMessages.DUPLICATE_KEY)) {
            throw DatabaseError.transactionFailed(
              UserProfileErrorMessages.CREATE_USER_PROFILE_DUPLICATE
            );
          }
        }
        throw DatabaseError.transactionFailed(UserProfileErrorMessages.CREATE_USER_PROFILE_FAILED);
      }
    });
  }

  public async update(id: string, profileData: UpdateUserProfileData): Promise<IUserProfile> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Attempting to update user profile', {
          operation: UserProfileLogOperations.UPDATE_USER_PROFILE,
          profileId: id
        });

        const updatedProfileData: IUserProfileData = await t.one(
          UserProfileQueries.UPDATE_USER_PROFILE,
          [
            id,
            profileData.firstName,
            profileData.lastName,
            profileData.phone,
            profileData.birthDate,
            profileData.avatarUrl
          ]
        );

        const mappedProfileData: IUserProfileData =
          DatabaseMapper.snakeToCamel<IUserProfileData>(updatedProfileData);

        this.logger.info('User profile updated successfully', {
          operation: UserProfileLogOperations.UPDATE_USER_PROFILE,
          profileId: id
        });

        return new UserProfile(mappedProfileData);
      } catch (err: unknown) {
        this.logger.error('Failed to update user profile', {
          operation: UserProfileLogOperations.UPDATE_USER_PROFILE,
          profileId: id,
          error: err instanceof Error ? err.message : 'unknown'
        });
        throw DatabaseError.transactionFailed(UserProfileErrorMessages.UPDATE_USER_PROFILE_FAILED);
      }
    });
  }

  public async delete(id: string): Promise<boolean> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Attempting to delete user profile by id', {
          operation: UserProfileLogOperations.DELETE_USER_PROFILE_BY_ID,
          profileId: id
        });

        const result: { rowCount: number } = await t.result(
          UserProfileQueries.DELETE_USER_PROFILE_BY_ID,
          [id]
        );

        this.logger.info('User profile deleted', {
          operation: UserProfileLogOperations.DELETE_USER_PROFILE_BY_ID,
          deletedCount: result.rowCount,
          profileId: id
        });

        return result.rowCount > 0;
      } catch (error) {
        this.logger.error('Failed to delete user profile by id', {
          operation: UserProfileLogOperations.DELETE_USER_PROFILE_BY_ID,
          profileId: id,
          error: error instanceof Error ? error.message : 'unknown',
          stack: error instanceof Error ? error.stack : undefined
        });

        throw DatabaseError.transactionFailed(UserProfileErrorMessages.DELETE_USER_PROFILE_FAILED);
      }
    });
  }

  // ========================
  // READ (depuis tables)
  // ========================
  public async findById(id: string): Promise<IUserProfile | null> {
    try {
      this.logger.info('Attempting to find user profile by id', {
        operation: UserProfileLogOperations.FIND_USER_PROFILE_BY_ID,
        profileId: id
      });

      const result: IUserProfileData | null = await this.db.oneOrNone(
        UserProfileQueries.SELECT_USER_PROFILE_BY_ID,
        [id]
      );

      const found: boolean = result !== null;
      this.logger.info(`User profile search by id completed`, {
        operation: UserProfileLogOperations.FIND_USER_PROFILE_BY_ID,
        found,
        profileId: found ? result?.id : null
      });

      return result ? new UserProfile(DatabaseMapper.snakeToCamel<IUserProfileData>(result)) : null;
    } catch (error) {
      this.logger.error('Failed to find user profile by id', {
        operation: UserProfileLogOperations.FIND_USER_PROFILE_BY_ID,
        profileId: id,
        error: error instanceof Error ? error.message : 'unknown',
        stack: error instanceof Error ? error.stack : undefined
      });

      throw DatabaseError.transactionFailed(UserProfileErrorMessages.FIND_USER_PROFILE_FAILED);
    }
  }

  public async findAll(limit: number = 10, offset: number = 0): Promise<IUserProfile[]> {
    try {
      this.logger.info('Attempting to find all user profiles', {
        operation: UserProfileLogOperations.FIND_ALL_USER_PROFILES,
        limit,
        offset
      });

      const profilesData: IUserProfileData[] = await this.db.manyOrNone(
        UserProfileQueries.SELECT_ALL_USER_PROFILES,
        [limit, offset]
      );

      if (!profilesData || profilesData.length === 0) {
        this.logger.info('No user profiles found', {
          operation: UserProfileLogOperations.FIND_ALL_USER_PROFILES,
          limit,
          offset
        });
        return [];
      }

      // Mapping avec DatabaseMapper
      const mappedProfilesData: IUserProfileData[] =
        DatabaseMapper.snakeToCamelArray<IUserProfileData>(profilesData);

      // Conversion en objets UserProfile
      const profiles: IUserProfile[] = mappedProfilesData.map(
        profileData => new UserProfile(profileData)
      );

      this.logger.info('User profiles found successfully', {
        operation: UserProfileLogOperations.FIND_ALL_USER_PROFILES,
        count: profiles.length,
        limit,
        offset
      });

      return profiles;
    } catch (err: unknown) {
      this.logger.error('Failed to find all user profiles', {
        operation: UserProfileLogOperations.FIND_ALL_USER_PROFILES,
        limit,
        offset,
        error: err instanceof Error ? err.message : 'unknown',
        stack: err instanceof Error ? err.stack : undefined
      });

      throw DatabaseError.transactionFailed(UserProfileErrorMessages.FIND_ALL_USER_PROFILES_FAILED);
    }
  }

  public async phoneExists(phone: string, excludeUserId?: string): Promise<boolean> {
    try {
      this.logger.info('Checking if phone exists', {
        operation: UserProfileLogOperations.CHECK_PHONE_EXISTS,
        phone: phone.replace(/(\d{2})\d{6}(\d{2})/, '$1******$2'), // Masquer le numéro
        excludeUserId
      });

      const result: { count: string } = await this.db.one(UserProfileQueries.CHECK_PHONE_EXISTS, [
        phone,
        excludeUserId || null
      ]);

      const exists: boolean = parseInt(result.count) > 0;

      this.logger.info('Phone existence check completed', {
        operation: UserProfileLogOperations.CHECK_PHONE_EXISTS,
        exists,
        excludeUserId
      });

      return exists;
    } catch (error) {
      this.logger.error('Failed to check phone existence', {
        operation: UserProfileLogOperations.CHECK_PHONE_EXISTS,
        error: error instanceof Error ? error.message : 'unknown',
        stack: error instanceof Error ? error.stack : undefined
      });

      throw DatabaseError.transactionFailed(UserProfileErrorMessages.FIND_USER_PROFILE_FAILED);
    }
  }

  public async findByUserId(userId: string): Promise<IUserProfile | null> {
    try {
      this.logger.info('Attempting to find user profile by user id', {
        operation: UserProfileLogOperations.FIND_USER_PROFILE_BY_USER_ID,
        userId
      });

      const result: IUserProfileData | null = await this.db.oneOrNone(
        UserProfileQueries.SELECT_USER_PROFILE_BY_USER_ID,
        [userId]
      );

      const found: boolean = result !== null;
      this.logger.info(`User profile search by user id completed`, {
        operation: UserProfileLogOperations.FIND_USER_PROFILE_BY_USER_ID,
        found,
        userId: found ? result?.id : null
      });

      return result ? new UserProfile(DatabaseMapper.snakeToCamel<IUserProfileData>(result)) : null;
    } catch (error) {
      this.logger.error('Failed to find user profile by user id', {
        operation: UserProfileLogOperations.FIND_USER_PROFILE_BY_USER_ID,
        userId,
        error: error instanceof Error ? error.message : 'unknown',
        stack: error instanceof Error ? error.stack : undefined
      });

      throw DatabaseError.transactionFailed(UserProfileErrorMessages.FIND_USER_PROFILE_FAILED);
    }
  }
}
