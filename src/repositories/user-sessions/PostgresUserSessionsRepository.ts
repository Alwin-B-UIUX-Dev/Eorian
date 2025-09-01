import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { UserSessions } from '@/entities';
import type { IUserSessions, IUserSessionsRepository } from '@/interfaces';
import type { CreateUserSessionsData, IUserSessionsData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresUserSessionsRepository implements IUserSessionsRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(userSessionsData: CreateUserSessionsData): Promise<IUserSessions> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO UserSessions (order_number, user_id, shipping_address_id, billing_address_id, status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents, payment_status, payment_method, payment_reference, shipping_method, tracking_number, customer_notes, admin_notes, shipped_at, delivered_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING id`,
          [
            userSessionsData.order_number,
            userSessionsData.user_id,
            userSessionsData.shipping_address_id,
            userSessionsData.billing_address_id,
            userSessionsData.status,
            userSessionsData.subtotal_cents,
            userSessionsData.tax_amount_cents,
            userSessionsData.shipping_cents,
            userSessionsData.total_cents,
            userSessionsData.payment_status,
            userSessionsData.payment_method,
            userSessionsData.payment_reference,
            userSessionsData.shipping_method,
            userSessionsData.tracking_number,
            userSessionsData.customer_notes,
            userSessionsData.admin_notes,
            userSessionsData.shipped_at,
            userSessionsData.delivered_at
          ]
        );

        const userUserSessions: IUserSessionsData = await t.one(
          /*sql*/ `SELECT * FROM v_user_UserSessions WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IUserSessionsData =
          DatabaseMapper.snakeToCamel<IUserSessionsData>(userUserSessions);

        return new UserSessions(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }
  public async findById(id: string): Promise<IUserSessions> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IUserSessions[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IUserSessionsData>): Promise<IUserSessions> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
