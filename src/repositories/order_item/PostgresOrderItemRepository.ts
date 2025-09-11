import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { OrderItem } from '@/entities';
import type { IOrderItem, IOrderItemRepository } from '@/interfaces';
import type { CreateOrderItemData, IOrderItemData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresOrderItemRepository implements IOrderItemRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(orderItemData: CreateOrderItemData): Promise<IOrderItem> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO order_item (order_id, product_id, product_name, product_sku, unit_price_cents, tax_rate, quantity, line_subtotal_cents, line_tax_cents, line_total_cents)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
          [
            orderItemData.order_id,
            orderItemData.product_id,
            orderItemData.product_name,
            orderItemData.product_sku,
            orderItemData.unit_price_cents,
            orderItemData.tax_rate,
            orderItemData.quantity,
            orderItemData.line_subtotal_cents,
            orderItemData.line_tax_cents,
            orderItemData.line_total_cents
          ]
        );

        const userOrderItem: IOrderItemData = await t.one(
          /*sql*/ `SELECT * FROM v_order_items_detailed WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IOrderItemData =
          DatabaseMapper.snakeToCamel<IOrderItemData>(userOrderItem);

        return new OrderItem(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }

  public async findById(id: string): Promise<IOrderItem> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IOrderItem[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IOrderItemData>): Promise<IOrderItem> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
