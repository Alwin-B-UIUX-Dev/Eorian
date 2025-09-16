import type { IBaseRepository, ICartItem } from '@/interfaces';
import type { ICartItemData } from '@/types';

export interface ICartItemRepository extends IBaseRepository<ICartItem, ICartItemData> {
  findByUserId(userId: number): Promise<ICartItem[]>;
  findByUserAndProduct(userId: number, productId: number): Promise<ICartItem | null>;
  deleteByUserId(userId: number): Promise<void>;
  deleteByUserAndProduct(userId: number, productId: number): Promise<void>;
}
