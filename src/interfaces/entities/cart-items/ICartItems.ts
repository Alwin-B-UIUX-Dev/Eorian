import type { IEntity } from '@/interfaces';

export interface ICartItems extends IEntity {
    // === GETTERS COMPLETS ===
  getUserId(): string;
  getProductId(): string;
  getQuantity(): string;
    // === SETTERS COMPLETS ===
  setUserId(userId: string): this;
  setProductId(productId: string): this;
  setQuantity(quantity: string): this;
}
