import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { UserProfile } from '@/entities';
import type { IUserProfile, IUserProfileRepository } from '@/interfaces';
import type { CreateUserProfileData, IUserProfileData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresUserProfileRepository implements IUserProfileRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(userProfileData: CreateUserProfileData): Promise<IUserProfile> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO user-profiles (user_id, first_name, last_name, phone, birth_date, avatar_url)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
          [
            userProfileData.user_id,
            userProfileData.first_name,
            userProfileData.last_name,
            userProfileData.phone,
            userProfileData.birth_date,
            userProfileData.avatar_url
          ]
        );

        const userUserProfile: IUserProfileData = await t.one(
          /*sql*/ `SELECT * FROM v_user_profiles_complete WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IUserProfileData =
          DatabaseMapper.snakeToCamel<IUserProfileData>(userUserProfile);

        return new UserProfile(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }
  public async findById(id: string): Promise<IUserProfile> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IUserProfile[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IUserProfileData>): Promise<IUserProfile> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
