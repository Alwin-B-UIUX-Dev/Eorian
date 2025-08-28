import {
  CartItemsConstants,
  type CreateCartItemSchemaType
} from '@/constants/zod/CartItemsConstants';
import type { ICartItems } from '@/interfaces';

export class ResponseCartItemsDto {
  static fromCartItems(cartItems: ICartItems): ResponseCartItemsDto {
    throw new Error('Method not implemented.');
  }
  public readonly userId: string;
  public readonly productId: string;
  public readonly quantity: string;

  constructor(data: unknown) {
    const validated: CreateCartItemSchemaType = CartItemsConstants.validateCreateCartItems(data);
    this.userId = validated.userId;
    this.productId = validated.productId;
    this.quantity = validated.quantity;
  }
  // === GETTERS COMPLETS ===
  public getUserId(): string {
    return this.userId;
  }
  public getProductId(): string {
    return this.productId;
  }
  public getQuantity(): string {
    return this.quantity;
  }

  public static from(cartItems: ICartItems): ResponseCartItemsDto {
    return new ResponseCartItemsDto({
      id: cartItems.getId().toString(),
      userId: cartItems.getUserId(),
      quantity: cartItems.getQuantity()
    });
  }
}
