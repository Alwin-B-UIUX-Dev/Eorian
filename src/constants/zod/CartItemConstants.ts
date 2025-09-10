import { z } from 'zod';

export class CartItemConstants {
  // ID AUTO_INCREMENT
  public static readonly ID_SCHEMA = z.string().min(1);

  // SCHEMAS DE BASE

  public static readonly USER_ID_SCHEMA = z.string().min(1);

  public static readonly PRODUCT_ID_SCHEMA = z.string().min(1);

  public static readonly QUANTITY_SCHEMA = z.string().min(1).max(999);

  public static readonly ADDED_AT_SCHEMA = z.date().min(1);

  // Schémas complets
  public static readonly CREATE_CART_ITEM_SCHEMA = z.object({
    userId: CartItemConstants.USER_ID_SCHEMA,
    productId: CartItemConstants.PRODUCT_ID_SCHEMA,
    quantity: CartItemConstants.QUANTITY_SCHEMA,
    addedAt: CartItemConstants.ADDED_AT_SCHEMA
  });

  public static readonly RESPONSE_CART_ITEM_SCHEMA = z.object({
    id: CartItemConstants.ID_SCHEMA,
    userId: CartItemConstants.USER_ID_SCHEMA,
    productId: CartItemConstants.PRODUCT_ID_SCHEMA,
    quantity: CartItemConstants.QUANTITY_SCHEMA,
    addedAt: CartItemConstants.ADDED_AT_SCHEMA
  });

  // Méthodes de validation
  public static validateCreateCartItem(data: unknown) {
    return CartItemConstants.CREATE_CART_ITEM_SCHEMA.parse(data);
  }

  public static validateResponseCartItem(data: unknown) {
    return CartItemConstants.RESPONSE_CART_ITEM_SCHEMA.parse(data);
  }
}

// Types
export type CreateCartItemSchemaType = z.infer<typeof CartItemConstants.CREATE_CART_ITEM_SCHEMA>;
export type ResponseCartItemSchemaType = z.infer<
  typeof CartItemConstants.RESPONSE_CART_ITEM_SCHEMA
>;
