import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { CartItems } from '@/entities';
import type { ICartItems, ICartItemsRepository } from '@/interfaces';
import type {
  CreateCartItemsData,
  ICartItemsData
} from '@/types/entities/cart-items/ICartItemsData';
import { DatabaseMapper } from '@/utils';

export class PostgresCartItemsRepository implements ICartItemsRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(cartItemsData: CreateCartItemsData): Promise<ICartItems> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO cart-items (user_id, product_id, quantity, added_at) VALUES ($1, $2, $3, $4) RETURNING id`,
          [
            cartItemsData.user_id,
            cartItemsData.product_id,
            cartItemsData.quantity,
            cartItemsData.added_at
          ]
        );

        const userCartItems: ICartItemsData = await t.one(
          /*sql*/ `SELECT * FROM v_user_cart_items WHERE user_id = $1`,
          [result.id]
        );

        const mappedEntity: ICartItemsData =
          DatabaseMapper.snakeToCamel<ICartItemsData>(userCartItems);

        return new CartItems(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }

  public async findById(id: string): Promise<ICartItems> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<ICartItems[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<ICartItemsData>): Promise<ICartItems> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
