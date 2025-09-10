import z from 'zod';

export class OrderItemConstants {
  // ID AUTO_INCREMENT
  public static readonly ID_SCHEMA = z.string().min(1);

  // SCHEMAS DE BASE
  public static readonly ORDER_ID_SCHEMA = z.string().min(1);
  public static readonly PRODUCT_ID_SCHEMA = z.string().min(1);
  public static readonly PRODUCT_NAME_SCHEMA = z.string().min(1).trim().max(200);
  public static readonly PRODUCT_SKU_SCHEMA = z.string().max(100);
  public static readonly UNIT_PRICE_CENTS_SCHEMA = z.string().min(1);
  public static readonly TAX_RATE_SCHEMA = z.string().min(1).default('0.2');
  public static readonly QUANTITY_SCHEMA = z.string().min(1);
  public static readonly LINE_SUBTOTAL_CENTS_SCHEMA = z.string().min(1);
  public static readonly LINE_TAX_CENTS_SCHEMA = z.string().min(1);
  public static readonly LINE_TOTAL_CENTS_SCHEMA = z.string().min(1);

  // SCHEMAS COMPLETS

  public static readonly CREATE_ORDER_ITEMS_SCHEMA = z.object({
    productId: OrderItemConstants.PRODUCT_ID_SCHEMA,
    orderId: OrderItemConstants.ORDER_ID_SCHEMA,
    productName: OrderItemConstants.PRODUCT_NAME_SCHEMA,
    productSku: OrderItemConstants.PRODUCT_SKU_SCHEMA,
    unitPriceCents: OrderItemConstants.UNIT_PRICE_CENTS_SCHEMA,
    taxRate: OrderItemConstants.TAX_RATE_SCHEMA,
    quantity: OrderItemConstants.QUANTITY_SCHEMA,
    lineSubtotalCents: OrderItemConstants.LINE_SUBTOTAL_CENTS_SCHEMA,
    lineTaxCents: OrderItemConstants.LINE_TAX_CENTS_SCHEMA,
    lineTotalCents: OrderItemConstants.LINE_TOTAL_CENTS_SCHEMA
  });

  public static readonly RESPONSE_ORDER_ITEMS_SCHEMA = z.object({
    id: OrderItemConstants.ID_SCHEMA,
    productId: OrderItemConstants.PRODUCT_ID_SCHEMA,
    orderId: OrderItemConstants.ORDER_ID_SCHEMA,
    productName: OrderItemConstants.PRODUCT_NAME_SCHEMA,
    productSku: OrderItemConstants.PRODUCT_SKU_SCHEMA,
    unitPriceCents: OrderItemConstants.UNIT_PRICE_CENTS_SCHEMA,
    taxRate: OrderItemConstants.TAX_RATE_SCHEMA,
    quantity: OrderItemConstants.QUANTITY_SCHEMA,
    lineSubtotalCents: OrderItemConstants.LINE_SUBTOTAL_CENTS_SCHEMA,
    lineTaxCents: OrderItemConstants.LINE_TAX_CENTS_SCHEMA,
    lineTotalCents: OrderItemConstants.LINE_TOTAL_CENTS_SCHEMA
  });

  // VALIDATION
  public static validateCreateOrderItem(data: unknown) {
    return OrderItemConstants.CREATE_ORDER_ITEMS_SCHEMA.parse(data);
  }

  //REPONSE
  public static validateResponseOrderItem(data: unknown) {
    return OrderItemConstants.RESPONSE_ORDER_ITEMS_SCHEMA.parse(data);
  }
}

// TYPES
export type CreateOrderItemSchemaType = z.infer<
  typeof OrderItemConstants.CREATE_ORDER_ITEMS_SCHEMA
>;
export type ResponseOrderItemSchemaType = z.infer<
  typeof OrderItemConstants.RESPONSE_ORDER_ITEMS_SCHEMA
>;
