import type { IDatabase } from 'pg-promise';
import { database, logger } from '@/configs';
import { OrderItemOperationsConstants, OrderItemQueriesConstants } from '@/constants';
import { OrderItem } from '@/entities';
import { DatabaseError } from '@/exceptions';
import type { IOrderItem, IOrderItemRepository } from '@/interfaces';
import type { CreateOrderItemData, IOrderItemData, UpdateOrderItemData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresOrderItemRepository implements IOrderItemRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();
  private readonly logger = logger;

  public async create(data: CreateOrderItemData): Promise<IOrderItem> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Creating order item', {
          operation: OrderItemOperationsConstants.CREATE_ORDER_ITEM,
          orderId: data.orderId,
          productName: data.productName
        });
        const result: { id: string } = await t.one(OrderItemQueriesConstants.INSERT_ORDER_ITEM, [
          data.orderId,
          data.productId,
          data.productName,
          data.productSku,
          data.unitPriceCents,
          data.taxRate,
          data.quantity,
          data.lineSubtotalCents,
          data.lineTaxCents,
          data.lineTotalCents
        ]);
        const row = await t.one(OrderItemQueriesConstants.SELECT_ORDER_ITEM_BY_ID, [result.id]);
        const mapped: IOrderItemData = DatabaseMapper.snakeToCamel<IOrderItemData>(row);
        return new OrderItem(mapped);
      } catch (error) {
        this.logger.error('Failed to create order item', {
          operation: OrderItemOperationsConstants.CREATE_ORDER_ITEM,
          error
        });
        throw DatabaseError.transactionFailed(OrderItemOperationsConstants.CREATE_ORDER_ITEM);
      }
    });
  }

  public async update(id: string, data: UpdateOrderItemData): Promise<IOrderItem> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Updating order item', {
          operation: OrderItemOperationsConstants.UPDATE_ORDER_ITEM,
          id
        });
        const row = await t.one(OrderItemQueriesConstants.UPDATE_ORDER_ITEM, [
          Number(id),
          data.orderId,
          data.productId,
          data.productName,
          data.productSku,
          data.unitPriceCents,
          data.taxRate,
          data.quantity,
          data.lineSubtotalCents,
          data.lineTaxCents,
          data.lineTotalCents
        ]);
        const mapped: IOrderItemData = DatabaseMapper.snakeToCamel<IOrderItemData>(row);
        return new OrderItem(mapped);
      } catch (error) {
        this.logger.error('Failed to update order item', {
          operation: OrderItemOperationsConstants.UPDATE_ORDER_ITEM,
          id,
          error
        });
        throw DatabaseError.transactionFailed(OrderItemOperationsConstants.UPDATE_ORDER_ITEM);
      }
    });
  }

  public async delete(id: string): Promise<boolean> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Deleting order item', {
          operation: OrderItemOperationsConstants.DELETE_ORDER_ITEM_BY_ID,
          id
        });
        const result: { rowCount: number } = await t.result(
          OrderItemQueriesConstants.DELETE_ORDER_ITEM_BY_ID,
          [Number(id)]
        );
        return result.rowCount > 0;
      } catch (error) {
        this.logger.error('Failed to delete order item', {
          operation: OrderItemOperationsConstants.DELETE_ORDER_ITEM_BY_ID,
          id,
          error
        });
        throw DatabaseError.transactionFailed(OrderItemOperationsConstants.DELETE_ORDER_ITEM_BY_ID);
      }
    });
  }

  public async deleteByOrderId(orderId: string): Promise<boolean> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Deleting order items by order id', {
          operation: OrderItemOperationsConstants.DELETE_ORDER_ITEMS_BY_ORDER_ID,
          orderId
        });
        const result: { rowCount: number } = await t.result(
          OrderItemQueriesConstants.DELETE_ORDER_ITEMS_BY_ORDER_ID,
          [Number(orderId)]
        );
        return result.rowCount > 0;
      } catch (error) {
        this.logger.error('Failed to delete order items by order id', {
          operation: OrderItemOperationsConstants.DELETE_ORDER_ITEMS_BY_ORDER_ID,
          orderId,
          error
        });
        throw DatabaseError.transactionFailed(
          OrderItemOperationsConstants.DELETE_ORDER_ITEMS_BY_ORDER_ID
        );
      }
    });
  }

  public async findById(id: string): Promise<IOrderItem | null> {
    try {
      this.logger.info('Finding order item by id', {
        operation: OrderItemOperationsConstants.FIND_ORDER_ITEM_BY_ID,
        id
      });
      const row: IOrderItemData | null = await this.db.oneOrNone(
        OrderItemQueriesConstants.SELECT_ORDER_ITEM_BY_ID,
        [Number(id)]
      );
      return row ? new OrderItem(DatabaseMapper.snakeToCamel<IOrderItemData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find order item by id', {
        operation: OrderItemOperationsConstants.FIND_ORDER_ITEM_BY_ID,
        id,
        error
      });
      throw DatabaseError.transactionFailed(OrderItemOperationsConstants.FIND_ORDER_ITEM_BY_ID);
    }
  }

  public async findByOrderId(orderId: string): Promise<IOrderItem[]> {
    try {
      this.logger.info('Finding order items by order id', {
        operation: OrderItemOperationsConstants.FIND_ORDER_ITEMS_BY_ORDER_ID,
        orderId
      });
      const rows: IOrderItemData[] = await this.db.manyOrNone(
        OrderItemQueriesConstants.SELECT_ORDER_ITEMS_BY_ORDER_ID,
        [Number(orderId)]
      );
      const mapped: IOrderItemData[] = DatabaseMapper.snakeToCamelArray<IOrderItemData>(rows);
      return mapped.map(r => new OrderItem(r));
    } catch (error) {
      this.logger.error('Failed to find order items by order id', {
        operation: OrderItemOperationsConstants.FIND_ORDER_ITEMS_BY_ORDER_ID,
        orderId,
        error
      });
      throw DatabaseError.transactionFailed(
        OrderItemOperationsConstants.FIND_ORDER_ITEMS_BY_ORDER_ID
      );
    }
  }

  public async findByProductId(
    productId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<IOrderItem[]> {
    try {
      this.logger.info('Finding order items by product id', {
        operation: OrderItemOperationsConstants.FIND_ORDER_ITEMS_BY_PRODUCT_ID,
        productId,
        limit,
        offset
      });
      const rows: IOrderItemData[] = await this.db.manyOrNone(
        OrderItemQueriesConstants.SELECT_ORDER_ITEMS_BY_PRODUCT_ID,
        [Number(productId), limit, offset]
      );
      const mapped: IOrderItemData[] = DatabaseMapper.snakeToCamelArray<IOrderItemData>(rows);
      return mapped.map(r => new OrderItem(r));
    } catch (error) {
      this.logger.error('Failed to find order items by product id', {
        operation: OrderItemOperationsConstants.FIND_ORDER_ITEMS_BY_PRODUCT_ID,
        productId,
        error
      });
      throw DatabaseError.transactionFailed(
        OrderItemOperationsConstants.FIND_ORDER_ITEMS_BY_PRODUCT_ID
      );
    }
  }

  public async findAll(limit: number = 50, offset: number = 0): Promise<IOrderItem[]> {
    try {
      this.logger.info('Finding all order items', {
        operation: OrderItemOperationsConstants.FIND_ALL_ORDER_ITEMS,
        limit,
        offset
      });
      const rows: IOrderItemData[] = await this.db.manyOrNone(
        OrderItemQueriesConstants.SELECT_ALL_ORDER_ITEMS,
        [limit, offset]
      );
      const mapped: IOrderItemData[] = DatabaseMapper.snakeToCamelArray<IOrderItemData>(rows);
      return mapped.map(r => new OrderItem(r));
    } catch (error) {
      this.logger.error('Failed to find all order items', {
        operation: OrderItemOperationsConstants.FIND_ALL_ORDER_ITEMS,
        error
      });
      throw DatabaseError.transactionFailed(OrderItemOperationsConstants.FIND_ALL_ORDER_ITEMS);
    }
  }
}
