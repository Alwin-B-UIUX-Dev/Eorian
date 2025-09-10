import { z } from 'zod';

export class OrderConstants {
  // ID AUTO_INCREMENT
  public static readonly ID_SCHEMA = z.string().min(1);

  // SCHEMAS DE BASE
  public static readonly ORDER_NUMBER_SCHEMA = z.string().min(1).max(50);
  public static readonly USER_ID_SCHEMA = z.string().min(1);
  public static readonly SHIPPING_ADDRESS_ID_SCHEMA = z.string();
  public static readonly BILLING_ADDRESS_ID_SCHEMA = z.string();
  public static readonly STATUS_SCHEMA = z.string().max(20).default('pending');
  public static readonly SUBTOTAL_CENTS_SCHEMA = z.string().min(1);
  public static readonly TAX_AMOUNT_CENTS_SCHEMA = z.string().min(1);
  public static readonly SHIPPING_CENTS_SCHEMA = z.string().default('0');
  public static readonly TOTAL_CENTS_SCHEMA = z.string().min(1);
  public static readonly PAYMENT_STATUS_SCHEMA = z.string().max(20).default('pending');
  public static readonly PAYMENT_METHOD_SCHEMA = z.string().max(50);
  public static readonly PAYMENT_REFERENCE_SCHEMA = z.string().max(200);
  public static readonly SHIPPING_METHOD_SCHEMA = z.string().max(100);
  public static readonly TRACKING_NUMBER_SCHEMA = z.string().max(100);
  public static readonly CUSTOMER_NOTES_SCHEMA = z.string();
  public static readonly ADMIN_NOTES_SCHEMA = z.string();
  public static readonly SHIPPED_AT_SCHEMA = z.date();
  public static readonly DELIVERED_AT_SCHEMA = z.date();

  public static readonly CREATE_ORDERS_SCHEMA = z.object({
    orderNumber: OrderConstants.ORDER_NUMBER_SCHEMA,
    userId: OrderConstants.USER_ID_SCHEMA,
    shippingAddressId: OrderConstants.SHIPPING_ADDRESS_ID_SCHEMA,
    billingAddressId: OrderConstants.BILLING_ADDRESS_ID_SCHEMA,
    status: OrderConstants.STATUS_SCHEMA,
    subtotalCents: OrderConstants.SUBTOTAL_CENTS_SCHEMA,
    taxAmountCents: OrderConstants.TAX_AMOUNT_CENTS_SCHEMA,
    shippingCents: OrderConstants.SHIPPING_CENTS_SCHEMA,
    totalCents: OrderConstants.TOTAL_CENTS_SCHEMA,
    paymentStatus: OrderConstants.PAYMENT_STATUS_SCHEMA,
    paymentMethod: OrderConstants.PAYMENT_METHOD_SCHEMA,
    paymentReference: OrderConstants.PAYMENT_REFERENCE_SCHEMA,
    shippingMethod: OrderConstants.SHIPPING_METHOD_SCHEMA,
    trackingNumber: OrderConstants.TRACKING_NUMBER_SCHEMA,
    customerNotes: OrderConstants.CUSTOMER_NOTES_SCHEMA,
    adminNotes: OrderConstants.ADMIN_NOTES_SCHEMA,
    shippedAt: OrderConstants.SHIPPED_AT_SCHEMA,
    deliveredAt: OrderConstants.DELIVERED_AT_SCHEMA
  });

  public static readonly RESPONSE_ORDERS_SCHEMA = z.object({
    id: OrderConstants.ID_SCHEMA,
    orderNumber: OrderConstants.ORDER_NUMBER_SCHEMA,
    userId: OrderConstants.USER_ID_SCHEMA,
    shippingAddressId: OrderConstants.SHIPPING_ADDRESS_ID_SCHEMA,
    billingAddressId: OrderConstants.BILLING_ADDRESS_ID_SCHEMA,
    status: OrderConstants.STATUS_SCHEMA,
    subtotalCents: OrderConstants.SUBTOTAL_CENTS_SCHEMA,
    taxAmountCents: OrderConstants.TAX_AMOUNT_CENTS_SCHEMA,
    shippingCents: OrderConstants.SHIPPING_CENTS_SCHEMA,
    totalCents: OrderConstants.TOTAL_CENTS_SCHEMA,
    paymentStatus: OrderConstants.PAYMENT_STATUS_SCHEMA,
    paymentMethod: OrderConstants.PAYMENT_METHOD_SCHEMA,
    paymentReference: OrderConstants.PAYMENT_REFERENCE_SCHEMA,
    shippingMethod: OrderConstants.SHIPPING_METHOD_SCHEMA,
    trackingNumber: OrderConstants.TRACKING_NUMBER_SCHEMA,
    customerNotes: OrderConstants.CUSTOMER_NOTES_SCHEMA,
    adminNotes: OrderConstants.ADMIN_NOTES_SCHEMA,
    shippedAt: OrderConstants.SHIPPED_AT_SCHEMA,
    deliveredAt: OrderConstants.DELIVERED_AT_SCHEMA
  });

  public static validateCreateOrder(data: unknown) {
    return OrderConstants.CREATE_ORDERS_SCHEMA.parse(data);
  }

  public static validateResponseOrder(data: unknown) {
    return OrderConstants.RESPONSE_ORDERS_SCHEMA.parse(data);
  }
}

export type CreateOrderSchemaType = z.infer<typeof OrderConstants.CREATE_ORDERS_SCHEMA>;
export type ResponseOrderSchemaType = z.infer<typeof OrderConstants.RESPONSE_ORDERS_SCHEMA>;
