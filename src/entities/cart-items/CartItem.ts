import { BaseEntity } from '@/entities';
import type { ICartItem } from '@/interfaces/entities/cart-items';
import type { ICartItemData } from '@/types/entities/cart-items';

export class CartItem extends BaseEntity implements ICartItem {
  private userId: number;
  private productId: number;
  private quantity: number;
  private addedAt: Date;

  constructor(data: ICartItemData) {
    super(data);
    this.userId = data.userId;
    this.productId = data.productId;
    this.quantity = data.quantity;
    this.addedAt = data.addedAt || new Date();
  }

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
      cartItemId: this.id,
      userId: this.userId,
      productId: this.productId,
      quantity: this.quantity,
      addedAt: this.addedAt
    };
  }

  /**
   * Retourne les données de l'entité dans le format ICartItemData
   * pour être utilisé par les DTOs
   */
  public toData(): ICartItemData {
    return {
      id: this.id,
      userId: this.userId,
      productId: this.productId,
      quantity: this.quantity,
      addedAt: this.addedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
