import { BaseEntity } from '@/entities';
import type { ICartItem } from '@/interfaces';
import type { ICartItemData } from '@/types';

export class CartItem extends BaseEntity implements ICartItem {
  private userId: string;
  private productId: string;
  private quantity: string;
  private addedAt: Date;

  constructor(data: ICartItemData) {
    super(data, 'cartItemId');
    this.userId = data.userId;
    this.productId = data.productId;
    this.quantity = data.quantity;
    this.addedAt = data.addedAt;
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
  public getAddedAt(): Date {
    return this.addedAt;
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
