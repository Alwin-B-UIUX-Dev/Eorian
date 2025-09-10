import { CartItemConstants, type CreateCartItemSchemaType } from '@/constants';

export class CreateCartItemDto {
  public readonly userId: string;
  public readonly productId: string;
  public readonly quantity: string;
  public readonly addedAt: Date;

  constructor(data: unknown) {
    const validated: CreateCartItemSchemaType = CartItemConstants.validateCreateCartItem(data);
    this.userId = validated.userId;
    this.productId = validated.productId;
    this.quantity = validated.quantity;
    this.addedAt = validated.addedAt;
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
  public getAddedA(): Date {
    return this.addedAt;
  }
}
