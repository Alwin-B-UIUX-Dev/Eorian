import { type AddToCartSchemaType, CartItemConstants } from '@/constants';

export class AddToCartDto {
  public readonly productId: number;
  public readonly quantity: number;

  constructor(data: unknown) {
    const validated: AddToCartSchemaType = CartItemConstants.validateAddToCart(data);
    this.productId = validated.productId;
    this.quantity = validated.quantity;
  }
}
