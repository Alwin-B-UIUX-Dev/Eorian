import type { ICartItemData } from '@/types/entities/cart-items';

export class ResponseCartItemDto {
  public readonly cartItemId: string;
  public readonly userId: number;
  public readonly productId: number;
  public readonly quantity: number;
  public readonly addedAt: Date;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(data: ICartItemData) {
    this.cartItemId = data.id;
    this.userId = data.userId;
    this.productId = data.productId;
    this.quantity = data.quantity;
    this.addedAt = data.addedAt;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
