import type { IDatabase } from 'pg-promise';
import { database, logger } from '@/configs';
import { CartItemOperationsConstants, CartItemQueriesConstants } from '@/constants';
import { CartItem } from '@/entities/cart-items';
import { DatabaseError } from '@/exceptions';
import type { ICartItem } from '@/interfaces/entities/cart-items';
import type { ICartItemRepository } from '@/interfaces/repositories/cart-items';
import type {
  CreateCartItemData,
  ICartItemData,
  UpdateCartItemData
} from '@/types/entities/cart-items';
import { DatabaseMapper } from '@/utils';

export class PostgresCartItemRepository implements ICartItemRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();
  private readonly logger = logger;

  public async create(data: CreateCartItemData): Promise<ICartItem> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Creating cart item', {
          operation: CartItemOperationsConstants.CREATE_CART_ITEM,
          userId: data.userId,
          productId: data.productId,
          quantity: data.quantity
        });
        const result: { id: string } = await t.one(CartItemQueriesConstants.INSERT_CART_ITEM, [
          data.userId,
          data.productId,
          data.quantity,
          data.addedAt || new Date()
        ]);
        const row = await t.one(CartItemQueriesConstants.SELECT_CART_ITEM_BY_ID, [result.id]);
        const mapped: ICartItemData = DatabaseMapper.snakeToCamel<ICartItemData>(row);
        return new CartItem(mapped);
      } catch (error) {
        this.logger.error('Failed to create cart item', {
          operation: CartItemOperationsConstants.CREATE_CART_ITEM,
          error
        });
        throw DatabaseError.transactionFailed(CartItemOperationsConstants.CREATE_CART_ITEM);
      }
    });
  }

  public async update(id: string, data: UpdateCartItemData): Promise<ICartItem> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Updating cart item', {
          operation: CartItemOperationsConstants.UPDATE_CART_ITEM,
          id
        });
        const row = await t.one(CartItemQueriesConstants.UPDATE_CART_ITEM, [
          Number(id),
          data.userId,
          data.productId,
          data.quantity
        ]);
        const mapped: ICartItemData = DatabaseMapper.snakeToCamel<ICartItemData>(row);
        return new CartItem(mapped);
      } catch (error) {
        this.logger.error('Failed to update cart item', {
          operation: CartItemOperationsConstants.UPDATE_CART_ITEM,
          id,
          error
        });
        throw DatabaseError.transactionFailed(CartItemOperationsConstants.UPDATE_CART_ITEM);
      }
    });
  }

  public async delete(id: string): Promise<boolean> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Deleting cart item', {
          operation: CartItemOperationsConstants.DELETE_CART_ITEM_BY_ID,
          id
        });
        const result: { rowCount: number } = await t.result(
          CartItemQueriesConstants.DELETE_CART_ITEM_BY_ID,
          [Number(id)]
        );
        return result.rowCount > 0;
      } catch (error) {
        this.logger.error('Failed to delete cart item', {
          operation: CartItemOperationsConstants.DELETE_CART_ITEM_BY_ID,
          id,
          error
        });
        throw DatabaseError.transactionFailed(CartItemOperationsConstants.DELETE_CART_ITEM_BY_ID);
      }
    });
  }

  public async findById(id: string): Promise<ICartItem | null> {
    try {
      this.logger.info('Finding cart item by id', {
        operation: CartItemOperationsConstants.FIND_CART_ITEM_BY_ID,
        id
      });
      const row: ICartItemData | null = await this.db.oneOrNone(
        CartItemQueriesConstants.SELECT_CART_ITEM_BY_ID,
        [Number(id)]
      );
      return row ? new CartItem(DatabaseMapper.snakeToCamel<ICartItemData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find cart item by id', {
        operation: CartItemOperationsConstants.FIND_CART_ITEM_BY_ID,
        id,
        error
      });
      throw DatabaseError.transactionFailed(CartItemOperationsConstants.FIND_CART_ITEM_BY_ID);
    }
  }

  public async findAll(limit: number = 50, offset: number = 0): Promise<ICartItem[]> {
    try {
      this.logger.info('Finding all cart items', {
        operation: CartItemOperationsConstants.FIND_ALL_CART_ITEMS,
        limit,
        offset
      });
      const rows: ICartItemData[] = await this.db.manyOrNone(
        CartItemQueriesConstants.SELECT_ALL_CART_ITEMS,
        [limit, offset]
      );
      const mapped: ICartItemData[] = DatabaseMapper.snakeToCamelArray<ICartItemData>(rows);
      return mapped.map(r => new CartItem(r));
    } catch (error) {
      this.logger.error('Failed to find all cart items', {
        operation: CartItemOperationsConstants.FIND_ALL_CART_ITEMS,
        error
      });
      throw DatabaseError.transactionFailed(CartItemOperationsConstants.FIND_ALL_CART_ITEMS);
    }
  }

  public async findByUserId(userId: number): Promise<ICartItem[]> {
    try {
      this.logger.info('Finding cart items by user id', {
        operation: CartItemOperationsConstants.FIND_CART_ITEMS_BY_USER_ID,
        userId
      });
      const rows: ICartItemData[] = await this.db.manyOrNone(
        CartItemQueriesConstants.SELECT_CART_ITEMS_BY_USER_ID,
        [userId]
      );
      const mapped: ICartItemData[] = DatabaseMapper.snakeToCamelArray<ICartItemData>(rows);
      return mapped.map(r => new CartItem(r));
    } catch (error) {
      this.logger.error('Failed to find cart items by user id', {
        operation: CartItemOperationsConstants.FIND_CART_ITEMS_BY_USER_ID,
        userId,
        error
      });
      throw DatabaseError.transactionFailed(CartItemOperationsConstants.FIND_CART_ITEMS_BY_USER_ID);
    }
  }

  public async findByUserAndProduct(userId: number, productId: number): Promise<ICartItem | null> {
    try {
      this.logger.info('Finding cart item by user and product', {
        operation: CartItemOperationsConstants.FIND_CART_ITEM_BY_USER_AND_PRODUCT,
        userId,
        productId
      });
      const row: ICartItemData | null = await this.db.oneOrNone(
        CartItemQueriesConstants.SELECT_CART_ITEM_BY_USER_AND_PRODUCT,
        [userId, productId]
      );
      return row ? new CartItem(DatabaseMapper.snakeToCamel<ICartItemData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find cart item by user and product', {
        operation: CartItemOperationsConstants.FIND_CART_ITEM_BY_USER_AND_PRODUCT,
        userId,
        productId,
        error
      });
      throw DatabaseError.transactionFailed(
        CartItemOperationsConstants.FIND_CART_ITEM_BY_USER_AND_PRODUCT
      );
    }
  }

  public async deleteByUserId(userId: number): Promise<void> {
    try {
      this.logger.info('Deleting cart items by user id', {
        operation: CartItemOperationsConstants.DELETE_CART_ITEMS_BY_USER_ID,
        userId
      });
      await this.db.none(CartItemQueriesConstants.DELETE_CART_ITEMS_BY_USER_ID, [userId]);
    } catch (error) {
      this.logger.error('Failed to delete cart items by user id', {
        operation: CartItemOperationsConstants.DELETE_CART_ITEMS_BY_USER_ID,
        userId,
        error
      });
      throw DatabaseError.transactionFailed(
        CartItemOperationsConstants.DELETE_CART_ITEMS_BY_USER_ID
      );
    }
  }

  public async deleteByUserAndProduct(userId: number, productId: number): Promise<void> {
    try {
      this.logger.info('Deleting cart item by user and product', {
        operation: CartItemOperationsConstants.DELETE_CART_ITEM_BY_USER_AND_PRODUCT,
        userId,
        productId
      });
      await this.db.none(CartItemQueriesConstants.DELETE_CART_ITEM_BY_USER_AND_PRODUCT, [
        userId,
        productId
      ]);
    } catch (error) {
      this.logger.error('Failed to delete cart item by user and product', {
        operation: CartItemOperationsConstants.DELETE_CART_ITEM_BY_USER_AND_PRODUCT,
        userId,
        productId,
        error
      });
      throw DatabaseError.transactionFailed(
        CartItemOperationsConstants.DELETE_CART_ITEM_BY_USER_AND_PRODUCT
      );
    }
  }
}
