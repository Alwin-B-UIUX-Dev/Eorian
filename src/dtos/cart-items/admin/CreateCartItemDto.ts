import { CartItemConstants, type CreateCartItemSchemaType } from '@/constants';

export class CreateCartItemDto {
  public readonly userId: number;
  public readonly productId: number;
  public readonly quantity: number;

  constructor(data: unknown) {
    const validated: CreateCartItemSchemaType = CartItemConstants.validateCreateCartItem(data);
    this.userId = validated.userId;
    this.productId = validated.productId;
    this.quantity = validated.quantity;
  }
}
