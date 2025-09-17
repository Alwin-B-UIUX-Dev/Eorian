import { z } from 'zod';

export class OrderItemConstants {
  public static readonly ORDER_ID = z
    .number()
    .int("L'ID de commande doit être un entier")
    .positive("L'ID de commande doit être positif");

  public static readonly PRODUCT_ID = z
    .number()
    .int("L'ID produit doit être un entier")
    .positive("L'ID produit doit être positif")
    .optional();

  public static readonly PRODUCT_NAME = z
    .string()
    .min(1, 'Le nom du produit est requis')
    .max(200, 'Le nom du produit doit contenir au maximum 200 caractères');

  public static readonly PRODUCT_SKU = z
    .string()
    .max(100, 'Le SKU doit contenir au maximum 100 caractères')
    .optional();

  public static readonly UNIT_PRICE_CENTS = z
    .number()
    .int('Le prix unitaire doit être un entier (en centimes)')
    .positive('Le prix unitaire doit être positif');

  public static readonly TAX_RATE = z
    .number()
    .min(0, 'Le taux de taxe doit être positif ou nul')
    .max(1, 'Le taux de taxe ne peut pas dépasser 1 (100%)')
    .default(0.2);

  public static readonly QUANTITY = z
    .number()
    .int('La quantité doit être un entier')
    .min(1, 'La quantité doit être au moins 1')
    .max(999, 'La quantité ne peut pas dépasser 999');

  public static readonly LINE_SUBTOTAL_CENTS = z
    .number()
    .int('Le sous-total de ligne doit être un entier (en centimes)')
    .min(0, 'Le sous-total de ligne doit être positif ou nul');

  public static readonly LINE_TAX_CENTS = z
    .number()
    .int('La taxe de ligne doit être un entier (en centimes)')
    .min(0, 'La taxe de ligne doit être positive ou nulle');

  public static readonly LINE_TOTAL_CENTS = z
    .number()
    .int('Le total de ligne doit être un entier (en centimes)')
    .positive('Le total de ligne doit être positif');

  public static readonly CREATE_ORDER_ITEM_SCHEMA = z.object({
    orderId: OrderItemConstants.ORDER_ID,
    productId: OrderItemConstants.PRODUCT_ID,
    productName: OrderItemConstants.PRODUCT_NAME,
    productSku: OrderItemConstants.PRODUCT_SKU,
    unitPriceCents: OrderItemConstants.UNIT_PRICE_CENTS,
    taxRate: OrderItemConstants.TAX_RATE,
    quantity: OrderItemConstants.QUANTITY,
    lineSubtotalCents: OrderItemConstants.LINE_SUBTOTAL_CENTS,
    lineTaxCents: OrderItemConstants.LINE_TAX_CENTS,
    lineTotalCents: OrderItemConstants.LINE_TOTAL_CENTS
  });

  public static readonly UPDATE_ORDER_ITEM_SCHEMA = z
    .object({
      orderId: OrderItemConstants.ORDER_ID.optional(),
      productId: OrderItemConstants.PRODUCT_ID,
      productName: OrderItemConstants.PRODUCT_NAME.optional(),
      productSku: OrderItemConstants.PRODUCT_SKU,
      unitPriceCents: OrderItemConstants.UNIT_PRICE_CENTS.optional(),
      taxRate: OrderItemConstants.TAX_RATE.optional(),
      quantity: OrderItemConstants.QUANTITY.optional(),
      lineSubtotalCents: OrderItemConstants.LINE_SUBTOTAL_CENTS.optional(),
      lineTaxCents: OrderItemConstants.LINE_TAX_CENTS.optional(),
      lineTotalCents: OrderItemConstants.LINE_TOTAL_CENTS.optional()
    })
    .refine(obj => Object.keys(obj).length > 0, {
      message: 'Aucune donnée fournie pour la mise à jour'
    });

  public static validateCreateOrderItem(data: unknown): CreateOrderItemSchemaType {
    return OrderItemConstants.CREATE_ORDER_ITEM_SCHEMA.parse(data);
  }

  public static validateUpdateOrderItem(data: unknown): UpdateOrderItemSchemaType {
    return OrderItemConstants.UPDATE_ORDER_ITEM_SCHEMA.parse(data);
  }
}

export type CreateOrderItemSchemaType = z.infer<typeof OrderItemConstants.CREATE_ORDER_ITEM_SCHEMA>;
export type UpdateOrderItemSchemaType = z.infer<typeof OrderItemConstants.UPDATE_ORDER_ITEM_SCHEMA>;
