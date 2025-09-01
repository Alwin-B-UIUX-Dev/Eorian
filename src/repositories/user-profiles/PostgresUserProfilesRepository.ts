import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { UserProfiles } from '@/entities';
import type { IUserProfiles, IUserProfilesRepository } from '@/interfaces';
import type { CreateUserProfilesData, IUserProfilesData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresUserProfilesRepository implements IUserProfilesRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(userProfilesData: CreateUserProfilesData): Promise<IUserProfiles> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO UserProfiles (order_number, user_id, shipping_address_id, billing_address_id, status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents, payment_status, payment_method, payment_reference, shipping_method, tracking_number, customer_notes, admin_notes, shipped_at, delivered_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING id`,
          [
            userProfilesData.order_number,
            userProfilesData.user_id,
            userProfilesData.shipping_address_id,
            userProfilesData.billing_address_id,
            userProfilesData.status,
            userProfilesData.subtotal_cents,
            userProfilesData.tax_amount_cents,
            userProfilesData.shipping_cents,
            userProfilesData.total_cents,
            userProfilesData.payment_status,
            userProfilesData.payment_method,
            userProfilesData.payment_reference,
            userProfilesData.shipping_method,
            userProfilesData.tracking_number,
            userProfilesData.customer_notes,
            userProfilesData.admin_notes,
            userProfilesData.shipped_at,
            userProfilesData.delivered_at
          ]
        );

        const userUserProfiles: IUserProfilesData = await t.one(
          /*sql*/ `SELECT * FROM v_user_profiles_complete WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IUserProfilesData =
          DatabaseMapper.snakeToCamel<IUserProfilesData>(userUserProfiles);

        return new UserProfiles(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }
  public async findById(id: string): Promise<IUserProfiles> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IUserProfiles[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IUserProfilesData>): Promise<IUserProfiles> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
