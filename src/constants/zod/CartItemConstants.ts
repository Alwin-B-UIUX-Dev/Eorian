import { z } from 'zod';

export const createCartItemSchema = z.object({
  userId: z.number().int().positive('User ID must be a positive integer'),
  productId: z.number().int().positive('Product ID must be a positive integer'),
  quantity: z
    .number()
    .int()
    .min(1, 'Quantity must be at least 1')
    .max(999, 'Quantity cannot exceed 999')
});

export const updateCartItemSchema = z.object({
  userId: z.number().int().positive('User ID must be a positive integer').optional(),
  productId: z.number().int().positive('Product ID must be a positive integer').optional(),
  quantity: z
    .number()
    .int()
    .min(1, 'Quantity must be at least 1')
    .max(999, 'Quantity cannot exceed 999')
    .optional()
});

export const addToCartSchema = z.object({
  productId: z.number().int().positive('Product ID must be a positive integer'),
  quantity: z
    .number()
    .int()
    .min(1, 'Quantity must be at least 1')
    .max(999, 'Quantity cannot exceed 999')
});

export type CreateCartItemSchemaType = z.infer<typeof createCartItemSchema>;
export type UpdateCartItemSchemaType = z.infer<typeof updateCartItemSchema>;
export type AddToCartSchemaType = z.infer<typeof addToCartSchema>;

export class CartItemConstants {
  public static validateCreateCartItem(data: unknown): CreateCartItemSchemaType {
    return createCartItemSchema.parse(data);
  }

  public static validateUpdateCartItem(data: unknown): UpdateCartItemSchemaType {
    return updateCartItemSchema.parse(data);
  }

  public static validateAddToCart(data: unknown): AddToCartSchemaType {
    return addToCartSchema.parse(data);
  }
}
