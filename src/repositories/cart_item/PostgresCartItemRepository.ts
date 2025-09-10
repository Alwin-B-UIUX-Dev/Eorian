import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { CartItem } from '@/entities';
import type { ICartItem, ICartItemRepository } from '@/interfaces';
import type { CreateCartItemData, ICartItemData } from '@/types/entities/cart_item/ICartItemData';
import { DatabaseMapper } from '@/utils';

export class PostgresCartItemRepository implements ICartItemRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(cartItemData: CreateCartItemData): Promise<ICartItem> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO cart_item (user_id, product_id, quantity, added_at) VALUES ($1, $2, $3, $4) RETURNING id`,
          [
            cartItemData.user_id,
            cartItemData.product_id,
            cartItemData.quantity,
            cartItemData.added_at
          ]
        );

        const userCartItem: ICartItemData = await t.one(
          /*sql*/ `SELECT * FROM v_cart_items_summary WHERE user_id = $1`,
          [result.id]
        );

        const mappedEntity: ICartItemData =
          DatabaseMapper.snakeToCamel<ICartItemData>(userCartItem);

        return new CartItem(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }

  public async findById(id: string): Promise<ICartItem> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<ICartItem[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<ICartItemData>): Promise<ICartItem> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
