import {
  CartItemsConstants,
  type CreateCartItemSchemaType
} from '@/constants/zod/CartItemsConstants';

export class CreateCartItemsDto {
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
}
