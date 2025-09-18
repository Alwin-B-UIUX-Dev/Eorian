import { CartItemConstants, type UpdateCartItemSchemaType } from '@/constants';

export class UpdateCartItemDto {
  public readonly userId?: number | undefined;
  public readonly productId?: number | undefined;
  public readonly quantity?: number | undefined;

  constructor(data: unknown) {
    const validated: UpdateCartItemSchemaType = CartItemConstants.validateUpdateCartItem(data);
    this.userId = validated.userId;
    this.productId = validated.productId;
    this.quantity = validated.quantity;
  }
}
