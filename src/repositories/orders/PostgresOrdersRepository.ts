import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { Orders } from '@/entities';
import type { IOrders, IOrdersRepository } from '@/interfaces';
import type { CreateOrdersData, IOrdersData } from '@/types/entities/orders/IOrdersData';
import { DatabaseMapper } from '@/utils';

export class PostgresOrdersRepository implements IOrdersRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(ordersData: CreateOrdersData): Promise<IOrders> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO orders (order_number, user_id, shipping_address_id, billing_address_id, status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents, payment_status, payment_method, payment_reference, shipping_method, tracking_number, customer_notes, admin_notes, shipped_at, delivered_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING id`,
          [
            ordersData.order_number,
            ordersData.user_id,
            ordersData.shipping_address_id,
            ordersData.billing_address_id,
            ordersData.status,
            ordersData.subtotal_cents,
            ordersData.tax_amount_cents,
            ordersData.shipping_cents,
            ordersData.total_cents,
            ordersData.payment_status,
            ordersData.payment_method,
            ordersData.payment_reference,
            ordersData.shipping_method,
            ordersData.tracking_number,
            ordersData.customer_notes,
            ordersData.admin_notes,
            ordersData.shipped_at,
            ordersData.delivered_at
          ]
        );

        const userOrders: IOrdersData = await t.one(
          /*sql*/ `SELECT * FROM v_user_orders WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IOrdersData = DatabaseMapper.snakeToCamel<IOrdersData>(userOrders);

        return new Orders(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }
  public async findById(id: string): Promise<IOrders> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IOrders[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IOrdersData>): Promise<IOrders> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
