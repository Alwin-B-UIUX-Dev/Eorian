import { CartItemConstants, type ResponseCartItemSchemaType } from '@/constants';
import type { ICartItem } from '@/interfaces';

export class ResponseCartItemDto {
  static fromCartItem(CartItem: ICartItem): ResponseCartItemDto {
    throw new Error('Method not implemented.');
  }
  public readonly id: string;
  public readonly userId: string;
  public readonly productId: string;
  public readonly quantity: string;
  public readonly addedAt: Date;

  constructor(data: unknown) {
    const validated: ResponseCartItemSchemaType = CartItemConstants.validateResponseCartItem(data);
    this.id = validated.id;
    this.userId = validated.userId;
    this.productId = validated.productId;
    this.quantity = validated.quantity;
    this.addedAt = validated.addedAt;
  }
  // === GETTERS COMPLETS ===
  public getId(): string {
    return this.id;
  }
  public getUserId(): string {
    return this.userId;
  }
  public getProductId(): string {
    return this.productId;
  }
  public getQuantity(): string {
    return this.quantity;
  }
  public getAddedA(): Date {
    return this.addedAt;
  }
  public static from(cartItem: ICartItem): ResponseCartItemDto {
    return new ResponseCartItemDto({
      id: cartItem.getId(),
      userId: cartItem.getUserId(),
      productId: cartItem.getProductId(),
      quantity: cartItem.getQuantity(),
      addedAt: cartItem.getAddedAt()
    });
  }
}
