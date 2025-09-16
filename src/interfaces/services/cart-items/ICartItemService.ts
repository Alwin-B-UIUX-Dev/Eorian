import type { ICartItem } from '@/interfaces';
import type { CreateCartItemData, UpdateCartItemData } from '@/types';

export interface ICartItemService {
  create(data: CreateCartItemData): Promise<ICartItem>;
  findAll(limit?: number, offset?: number): Promise<ICartItem[]>;
  findOne(id: string): Promise<ICartItem | null>;
  findByUserId(userId: number): Promise<ICartItem[]>;
  update(id: string, data: UpdateCartItemData): Promise<ICartItem>;
  remove(id: string): Promise<void>;
  removeByUserId(userId: number): Promise<void>;
  addOrUpdateProduct(userId: number, productId: number, quantity: number): Promise<ICartItem>;
  removeProduct(userId: number, productId: number): Promise<void>;
}
