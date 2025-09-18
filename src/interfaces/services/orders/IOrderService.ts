import type { IOrder } from '@/interfaces';
import type { CreateOrderData, UpdateOrderData } from '@/types';

export interface IOrderService {
  create(data: CreateOrderData): Promise<IOrder>;
  findAll(limit?: number, offset?: number): Promise<IOrder[]>;
  findOne(id: string): Promise<IOrder | null>;
  findByUserId(userId: string, limit?: number, offset?: number): Promise<IOrder[]>;
  findByStatus(status: string, limit?: number, offset?: number): Promise<IOrder[]>;
  findByPaymentStatus(paymentStatus: string, limit?: number, offset?: number): Promise<IOrder[]>;
  update(id: string, data: UpdateOrderData): Promise<IOrder>;
  remove(id: string): Promise<void>;
}
