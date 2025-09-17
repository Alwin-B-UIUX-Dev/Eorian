import type { IDatabase } from 'pg-promise';
import { database, logger } from '@/configs';
import { OrderOperationsConstants, OrderQueriesConstants } from '@/constants';
import { Order } from '@/entities';
import { DatabaseError } from '@/exceptions';
import type { IOrder, IOrderRepository } from '@/interfaces';
import type { CreateOrderData, IOrderData, UpdateOrderData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresOrderRepository implements IOrderRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();
  private readonly logger = logger;

  public async create(data: CreateOrderData): Promise<IOrder> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Creating order', {
          operation: OrderOperationsConstants.CREATE_ORDER,
          orderNumber: data.orderNumber
        });
        const result: { id: string } = await t.one(OrderQueriesConstants.INSERT_ORDER, [
          data.orderNumber,
          data.userId,
          data.shippingAddressId,
          data.billingAddressId,
          data.status,
          data.subtotalCents,
          data.taxAmountCents,
          data.shippingCents,
          data.totalCents,
          data.paymentStatus,
          data.paymentMethod,
          data.paymentReference,
          data.shippingMethod,
          data.trackingNumber,
          data.customerNotes,
          data.adminNotes
        ]);
        const row = await t.one(OrderQueriesConstants.SELECT_ORDER_BY_ID, [result.id]);
        const mapped: IOrderData = DatabaseMapper.snakeToCamel<IOrderData>(row);
        return new Order(mapped);
      } catch (error) {
        this.logger.error('Failed to create order', {
          operation: OrderOperationsConstants.CREATE_ORDER,
          error
        });
        throw DatabaseError.transactionFailed(OrderOperationsConstants.CREATE_ORDER);
      }
    });
  }

  public async update(id: string, data: UpdateOrderData): Promise<IOrder> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Updating order', {
          operation: OrderOperationsConstants.UPDATE_ORDER,
          id
        });
        const row = await t.one(OrderQueriesConstants.UPDATE_ORDER, [
          Number(id),
          data.orderNumber,
          data.userId,
          data.shippingAddressId,
          data.billingAddressId,
          data.status,
          data.subtotalCents,
          data.taxAmountCents,
          data.shippingCents,
          data.totalCents,
          data.paymentStatus,
          data.paymentMethod,
          data.paymentReference,
          data.shippingMethod,
          data.trackingNumber,
          data.customerNotes,
          data.adminNotes,
          data.shippedAt,
          data.deliveredAt
        ]);
        const mapped: IOrderData = DatabaseMapper.snakeToCamel<IOrderData>(row);
        return new Order(mapped);
      } catch (error) {
        this.logger.error('Failed to update order', {
          operation: OrderOperationsConstants.UPDATE_ORDER,
          id,
          error
        });
        throw DatabaseError.transactionFailed(OrderOperationsConstants.UPDATE_ORDER);
      }
    });
  }

  public async delete(id: string): Promise<boolean> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Deleting order', {
          operation: OrderOperationsConstants.DELETE_ORDER_BY_ID,
          id
        });
        const result: { rowCount: number } = await t.result(
          OrderQueriesConstants.DELETE_ORDER_BY_ID,
          [Number(id)]
        );
        return result.rowCount > 0;
      } catch (error) {
        this.logger.error('Failed to delete order', {
          operation: OrderOperationsConstants.DELETE_ORDER_BY_ID,
          id,
          error
        });
        throw DatabaseError.transactionFailed(OrderOperationsConstants.DELETE_ORDER_BY_ID);
      }
    });
  }

  public async findById(id: string): Promise<IOrder | null> {
    try {
      this.logger.info('Finding order by id', {
        operation: OrderOperationsConstants.FIND_ORDER_BY_ID,
        id
      });
      const row: IOrderData | null = await this.db.oneOrNone(
        OrderQueriesConstants.SELECT_ORDER_BY_ID,
        [Number(id)]
      );
      return row ? new Order(DatabaseMapper.snakeToCamel<IOrderData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find order by id', {
        operation: OrderOperationsConstants.FIND_ORDER_BY_ID,
        id,
        error
      });
      throw DatabaseError.transactionFailed(OrderOperationsConstants.FIND_ORDER_BY_ID);
    }
  }

  public async findByOrderNumber(orderNumber: string): Promise<IOrder | null> {
    try {
      this.logger.info('Finding order by number', {
        operation: OrderOperationsConstants.FIND_ORDER_BY_NUMBER,
        orderNumber
      });
      const row: IOrderData | null = await this.db.oneOrNone(
        OrderQueriesConstants.SELECT_ORDER_BY_NUMBER,
        [orderNumber]
      );
      return row ? new Order(DatabaseMapper.snakeToCamel<IOrderData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find order by number', {
        operation: OrderOperationsConstants.FIND_ORDER_BY_NUMBER,
        orderNumber,
        error
      });
      throw DatabaseError.transactionFailed(OrderOperationsConstants.FIND_ORDER_BY_NUMBER);
    }
  }

  public async findByUserId(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<IOrder[]> {
    try {
      this.logger.info('Finding orders by user id', {
        operation: OrderOperationsConstants.FIND_ORDERS_BY_USER_ID,
        userId,
        limit,
        offset
      });
      const rows: IOrderData[] = await this.db.manyOrNone(
        OrderQueriesConstants.SELECT_ORDERS_BY_USER_ID,
        [Number(userId), limit, offset]
      );
      const mapped: IOrderData[] = DatabaseMapper.snakeToCamelArray<IOrderData>(rows);
      return mapped.map(r => new Order(r));
    } catch (error) {
      this.logger.error('Failed to find orders by user id', {
        operation: OrderOperationsConstants.FIND_ORDERS_BY_USER_ID,
        userId,
        error
      });
      throw DatabaseError.transactionFailed(OrderOperationsConstants.FIND_ORDERS_BY_USER_ID);
    }
  }

  public async findByStatus(
    status: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<IOrder[]> {
    try {
      this.logger.info('Finding orders by status', {
        operation: OrderOperationsConstants.FIND_ORDERS_BY_STATUS,
        status,
        limit,
        offset
      });
      const rows: IOrderData[] = await this.db.manyOrNone(
        OrderQueriesConstants.SELECT_ORDERS_BY_STATUS,
        [status, limit, offset]
      );
      const mapped: IOrderData[] = DatabaseMapper.snakeToCamelArray<IOrderData>(rows);
      return mapped.map(r => new Order(r));
    } catch (error) {
      this.logger.error('Failed to find orders by status', {
        operation: OrderOperationsConstants.FIND_ORDERS_BY_STATUS,
        status,
        error
      });
      throw DatabaseError.transactionFailed(OrderOperationsConstants.FIND_ORDERS_BY_STATUS);
    }
  }

  public async findByPaymentStatus(
    paymentStatus: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<IOrder[]> {
    try {
      this.logger.info('Finding orders by payment status', {
        operation: OrderOperationsConstants.FIND_ORDERS_BY_PAYMENT_STATUS,
        paymentStatus,
        limit,
        offset
      });
      const rows: IOrderData[] = await this.db.manyOrNone(
        OrderQueriesConstants.SELECT_ORDERS_BY_PAYMENT_STATUS,
        [paymentStatus, limit, offset]
      );
      const mapped: IOrderData[] = DatabaseMapper.snakeToCamelArray<IOrderData>(rows);
      return mapped.map(r => new Order(r));
    } catch (error) {
      this.logger.error('Failed to find orders by payment status', {
        operation: OrderOperationsConstants.FIND_ORDERS_BY_PAYMENT_STATUS,
        paymentStatus,
        error
      });
      throw DatabaseError.transactionFailed(OrderOperationsConstants.FIND_ORDERS_BY_PAYMENT_STATUS);
    }
  }

  public async findAll(limit: number = 50, offset: number = 0): Promise<IOrder[]> {
    try {
      this.logger.info('Finding all orders', {
        operation: OrderOperationsConstants.FIND_ALL_ORDERS,
        limit,
        offset
      });
      const rows: IOrderData[] = await this.db.manyOrNone(OrderQueriesConstants.SELECT_ALL_ORDERS, [
        limit,
        offset
      ]);
      const mapped: IOrderData[] = DatabaseMapper.snakeToCamelArray<IOrderData>(rows);
      return mapped.map(r => new Order(r));
    } catch (error) {
      this.logger.error('Failed to find all orders', {
        operation: OrderOperationsConstants.FIND_ALL_ORDERS,
        error
      });
      throw DatabaseError.transactionFailed(OrderOperationsConstants.FIND_ALL_ORDERS);
    }
  }
}
