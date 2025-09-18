import type { IEntity } from '@/interfaces';
import type { ICartItemData } from '@/types';

export interface ICartItem extends IEntity {
  getUserId(): number;
  getProductId(): number;
  getQuantity(): number;
  getAddedAt(): Date;
  setUserId(userId: number): this;
  setProductId(productId: number): this;
  setQuantity(quantity: number): this;
  setAddedAt(addedAt: Date): this;
  toData(): ICartItemData;
}
