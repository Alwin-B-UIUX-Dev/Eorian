import type { ICartItem } from '@/interfaces';
import type { ICartItemsData } from '@/types/entities/cart-items/ICartItemsData';
import { BaseEntity } from '../BaseEntity';

export class CartItems extends BaseEntity implements ICartItem {
  private userId: string;
  private productId: string;
  private quantity: string;

  constructor(data: ICartItemsData) {
    super(data, 'cartItemsId');
    this.userId = data.userId;
    this.productId = data.productId;
    this.quantity = data.quantity;
  }

  // === GETTERS ===

  public getUserId(): string {
    return this.userId;
  }
  public getProductId(): string {
    return this.productId;
  }
  public getQuantity(): string {
    return this.quantity;
  }

  // === SETTERS ===

  public setUserId(userId: string): this {
    this.userId = userId;
    this.updateTimestamp();
    return this;
  }
  public setProductId(productId: string): this {
    this.productId = productId;
    this.updateTimestamp();
    return this;
  }
  public setQuantity(quantity: string): this {
      this.quantity = quantity;
      this.updateTimestamp();
      return this;
  }

  protected getEntityData(): Record<string, unknown> {
      return {
        userId: this.userId,
        productId: this.productId,
        quantity: this.quantity
      }
  }
}
