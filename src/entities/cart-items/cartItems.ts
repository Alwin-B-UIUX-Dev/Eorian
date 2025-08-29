import type { ICartItems } from '@/interfaces';
import type { ICartItemsData } from '@/types';
import { BaseEntity } from '../BaseEntity';

export class CartItems extends BaseEntity implements ICartItems {
  private userId: number;
  private productId: number;
  private quantity: number;
  private addedAt: Date;

  constructor(data: ICartItemsData) {
    super(data, 'cartItemsId');
    this.userId = data.userId;
    this.productId = data.productId;
    this.quantity = data.quantity;
    this.addedAt = data.addedAt;
  }

  // === GETTERS ===
  public getUserId(): number {
    return this.userId;
  }
  public getProductId(): number {
    return this.productId;
  }
  public getQuantity(): number {
    return this.quantity;
  }
  public getAddedAt(): Date {
    return this.addedAt;
  }

  // === SETTERS ===
  public setUserId(userId: number): this {
    this.userId = userId;
    this.updateTimestamp();
    return this;
  }
  public setProductId(productId: number): this {
    this.productId = productId;
    this.updateTimestamp();
    return this;
  }
  public setQuantity(quantity: number): this {
    this.quantity = quantity;
    this.updateTimestamp();
    return this;
  }
  public setAddedAt(addedAt: Date): this {
    this.addedAt = addedAt;
    this.updateTimestamp();
    return this;
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      userId: this.userId,
      productId: this.productId,
      quantity: this.quantity,
      addedAt: this.addedAt
    };
  }
}
