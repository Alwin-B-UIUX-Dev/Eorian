import type { IEntity } from '@/interfaces';

export interface ICartItems extends IEntity {
  // === GETTERS COMPLETS ===
  getUserId(): number;
  getProductId(): number;
  getQuantity(): number;
  getAddedAt(): Date;
  // === SETTERS COMPLETS ===
  setUserId(userId: number): this;
  setProductId(productId: number): this;
  setQuantity(quantity: number): this;
  setAddedAt(addedAt: Date): this;
}
