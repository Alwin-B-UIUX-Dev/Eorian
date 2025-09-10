import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { Order } from '@/entities';
import type { IOrder, IOrderRepository } from '@/interfaces';
import type { CreateOrderData, IOrderData } from '@/types/entities/order/IOrderData';
import { DatabaseMapper } from '@/utils';

export class PostgresOrderRepository implements IOrderRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(orderData: CreateOrderData): Promise<IOrder> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO order (order_number, user_id, shipping_address_id, billing_address_id, status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents, payment_status, payment_method, payment_reference, shipping_method, tracking_number, customer_notes, admin_notes, shipped_at, delivered_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING id`,
          [
            orderData.order_number,
            orderData.user_id,
            orderData.shipping_address_id,
            orderData.billing_address_id,
            orderData.status,
            orderData.subtotal_cents,
            orderData.tax_amount_cents,
            orderData.shipping_cents,
            orderData.total_cents,
            orderData.payment_status,
            orderData.payment_method,
            orderData.payment_reference,
            orderData.shipping_method,
            orderData.tracking_number,
            orderData.customer_notes,
            orderData.admin_notes,
            orderData.shipped_at,
            orderData.delivered_at
          ]
        );

        const userOrder: IOrderData = await t.one(
          /*sql*/ `SELECT * FROM v_user_order WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IOrderData = DatabaseMapper.snakeToCamel<IOrderData>(userOrder);

        return new Order(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }
  public async findById(id: string): Promise<IOrder> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IOrder[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IOrderData>): Promise<IOrder> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
