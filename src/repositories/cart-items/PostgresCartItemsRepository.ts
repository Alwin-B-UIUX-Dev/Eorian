import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { CartItems } from '@/entities';
import type { ICartItems, IcartItemsRepository } from '@/interfaces';
import type {
  CreateCartItemsData,
  ICartItemsData
} from '@/types/entities/cart-items/ICartItemsData';
import { DatabaseMapper } from '@/utils';

export class PostgresCartItemsRepository implements IcartItemsRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();
  public async create(CartItemsData: CreateCartItemsData): Promise<ICartItems> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `insert INTO CartItems (userId, productId, quantity)
                    VALUES ($1, $2, $3) RETURNING id
                    `,
          [CartItemsData.userId, CartItemsData.productId, CartItemsData.quantity]
        );
        const CartItemsCatalog: ICartItemsData = await t.one(
          /*sql*/ `SELECT * FROM v_CartItemss_catalog WHERE CartItems_id = 1$`,
          [result.id]
        );

        // Mapping automatique snake_case → camelCase
        const mappedEntity: ICartItemsData =
          DatabaseMapper.snakeToCamel<ICartItemsData>(CartItemsCatalog);
        return new CartItems(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }

  public async findById(id: string): Promise<ICartItems | null> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<ICartItems []> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<ICartItemsData>): Promise<ICartItems > {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
