import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { OrderItems } from '@/entities';
import type { IOrderItems, IOrderItemsRepository } from '@/interfaces';
import type { CreateOrderItemsData, IOrderItemsData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresCartItemsRepository implements IOrderItemsRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(orderItemsData: CreateOrderItemsData): Promise<IOrderItems> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO order-items (order_id, product_id, product_name, product_sku, unit_price_cents, tax_rate, quantity, line_subtotal_cents, line_tax_cents, line_total_cents)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
          [
            orderItemsData.order_id,
            orderItemsData.product_id,
            orderItemsData.product_name,
            orderItemsData.product_sku,
            orderItemsData.unit_price_cents,
            orderItemsData.tax_rate,
            orderItemsData.quantity,
            orderItemsData.line_subtotal_cents,
            orderItemsData.line_tax_cents,
            orderItemsData.line_total_cents
          ]
        );

        const userOrderItems: IOrderItemsData = await t.one(
          /*sql*/ `SELECT * FROM v_order_items_detailed WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IOrderItemsData =
          DatabaseMapper.snakeToCamel<IOrderItemsData>(userOrderItems);

        return new OrderItems(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }

  public async findById(id: string): Promise<IOrderItems> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IOrderItems[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IOrderItemsData>): Promise<IOrderItems> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
