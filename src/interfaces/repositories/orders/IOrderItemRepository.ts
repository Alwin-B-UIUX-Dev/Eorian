import type { IOrderItem } from '@/interfaces';
import type { CreateOrderItemData, UpdateOrderItemData } from '@/types';

export interface IOrderItemRepository {
  create(data: CreateOrderItemData): Promise<IOrderItem>;
  findById(id: string): Promise<IOrderItem | null>;
  findByOrderId(orderId: string): Promise<IOrderItem[]>;
  findByProductId(productId: string, limit?: number, offset?: number): Promise<IOrderItem[]>;
  findAll(limit?: number, offset?: number): Promise<IOrderItem[]>;
  update(id: string, data: UpdateOrderItemData): Promise<IOrderItem>;
  delete(id: string): Promise<boolean>;
  deleteByOrderId(orderId: string): Promise<boolean>;
}
