import type { IOrder } from '@/interfaces';
import type { CreateOrderData, UpdateOrderData } from '@/types';

export interface IOrderRepository {
  create(data: CreateOrderData): Promise<IOrder>;
  findById(id: string): Promise<IOrder | null>;
  findByOrderNumber(orderNumber: string): Promise<IOrder | null>;
  findByUserId(userId: string, limit?: number, offset?: number): Promise<IOrder[]>;
  findByStatus(status: string, limit?: number, offset?: number): Promise<IOrder[]>;
  findByPaymentStatus(paymentStatus: string, limit?: number, offset?: number): Promise<IOrder[]>;
  findAll(limit?: number, offset?: number): Promise<IOrder[]>;
  update(id: string, data: UpdateOrderData): Promise<IOrder>;
  delete(id: string): Promise<boolean>;
}
