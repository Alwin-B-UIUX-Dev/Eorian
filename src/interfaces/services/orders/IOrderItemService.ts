import type { IOrderItem } from '@/interfaces';
import type { CreateOrderItemData, UpdateOrderItemData } from '@/types';

export interface IOrderItemService {
  create(data: CreateOrderItemData): Promise<IOrderItem>;
  findAll(limit?: number, offset?: number): Promise<IOrderItem[]>;
  findOne(id: string): Promise<IOrderItem | null>;
  findByOrderId(orderId: string): Promise<IOrderItem[]>;
  findByProductId(productId: string, limit?: number, offset?: number): Promise<IOrderItem[]>;
  update(id: string, data: UpdateOrderItemData): Promise<IOrderItem>;
  remove(id: string): Promise<void>;
  removeByOrderId(orderId: string): Promise<void>;
}
