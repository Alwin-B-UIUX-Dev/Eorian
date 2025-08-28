import { z } from "zod";

export class CartItemsConstants {
  // Schémas de base
  public static readonly ID_SCHEMA = z
    .string()
    .min(1, "L'identifiant est requis");

  public static readonly USER_ID_SCHEMA = z
    .string()
    .min(1, "L'identifiant utilisateur est requis");

  public static readonly PRODUCT_ID_SCHEMA = z
    .string()
    .min(1, "L'identifiant du produit est requis");

  public static readonly QUANTITY_SCHEMA = z
    .string()
    .min(1, "La quantité minimale est 1")
    .max(999, "La quantité maximale est 999");

  // Schémas complets
  public static readonly CREATE_CART_ITEM_SCHEMA = z.object({
    userId: CartItemsConstants.USER_ID_SCHEMA,
    productId: CartItemsConstants.PRODUCT_ID_SCHEMA,
    quantity: CartItemsConstants.QUANTITY_SCHEMA,
  });

  public static readonly RESPONSE_CART_ITEM_SCHEMA = z.object({
    id: CartItemsConstants.ID_SCHEMA,
    userId: CartItemsConstants.USER_ID_SCHEMA,
    productId: CartItemsConstants.PRODUCT_ID_SCHEMA,
    quantity: CartItemsConstants.QUANTITY_SCHEMA,
  });

  // Méthodes de validation
  public static validateCreate(data: unknown) {
    return CartItemsConstants.CREATE_CART_ITEM_SCHEMA.parse(data);
  }

  public static validateResponse(data: unknown) {
    return CartItemsConstants.RESPONSE_CART_ITEM_SCHEMA.parse(data);
  }
}

// Types
export type CreateCartItemSchemaType = z.infer<typeof CartItemsConstants.CREATE_CART_ITEM_SCHEMA>;
export type ResponseCartItemSchemaType = z.infer<typeof CartItemsConstants.RESPONSE_CART_ITEM_SCHEMA>;
