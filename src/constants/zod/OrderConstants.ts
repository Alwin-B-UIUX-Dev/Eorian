import { z } from 'zod';

export class OrderConstants {
  public static readonly ORDER_NUMBER = z
    .string()
    .regex(/^[0-9]+$/, 'Le numéro de commande doit être un nombre')
    .min(1, 'Le numéro de commande ne peut pas être vide');

  public static readonly USER_ID = z
    .number()
    .int("L'ID utilisateur doit être un entier")
    .positive("L'ID utilisateur doit être positif");

  public static readonly ADDRESS_ID = z
    .number()
    .int("L'ID d'adresse doit être un entier")
    .positive("L'ID d'adresse doit être positif")
    .optional();

  public static readonly STATUS = z.enum(
    ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    {
      message:
        'Le statut doit être: pending, processing, shipped, delivered, cancelled, ou refunded'
    }
  );

  public static readonly PAYMENT_STATUS = z.enum(['pending', 'paid', 'failed', 'refunded'], {
    message: 'Le statut de paiement doit être: pending, paid, failed, ou refunded'
  });

  public static readonly CENTS_AMOUNT = z
    .number()
    .int('Le montant doit être un entier (en centimes)')
    .min(0, 'Le montant doit être positif ou nul');

  public static readonly TOTAL_CENTS = z
    .number()
    .int('Le montant total doit être un entier (en centimes)')
    .positive('Le montant total doit être positif');

  public static readonly PAYMENT_METHOD = z
    .string()
    .max(50, 'La méthode de paiement doit contenir au maximum 50 caractères')
    .optional();

  public static readonly PAYMENT_REFERENCE = z
    .string()
    .max(200, 'La référence de paiement doit contenir au maximum 200 caractères')
    .optional();

  public static readonly SHIPPING_METHOD = z
    .string()
    .max(100, 'La méthode de livraison doit contenir au maximum 100 caractères')
    .optional();

  public static readonly TRACKING_NUMBER = z
    .string()
    .max(100, 'Le numéro de suivi doit contenir au maximum 100 caractères')
    .optional();

  public static readonly NOTES = z
    .string()
    .max(1000, 'Les notes doivent contenir au maximum 1000 caractères')
    .optional();

  public static readonly DATE = z.date().optional();

  public static readonly CREATE_ORDER_SCHEMA = z.object({
    orderNumber: OrderConstants.ORDER_NUMBER,
    userId: OrderConstants.USER_ID,
    shippingAddressId: OrderConstants.ADDRESS_ID,
    billingAddressId: OrderConstants.ADDRESS_ID,
    status: OrderConstants.STATUS.default('pending'),
    subtotalCents: OrderConstants.CENTS_AMOUNT,
    taxAmountCents: OrderConstants.CENTS_AMOUNT,
    shippingCents: OrderConstants.CENTS_AMOUNT.default(0),
    totalCents: OrderConstants.TOTAL_CENTS,
    paymentStatus: OrderConstants.PAYMENT_STATUS.default('pending'),
    paymentMethod: OrderConstants.PAYMENT_METHOD,
    paymentReference: OrderConstants.PAYMENT_REFERENCE,
    shippingMethod: OrderConstants.SHIPPING_METHOD,
    trackingNumber: OrderConstants.TRACKING_NUMBER,
    customerNotes: OrderConstants.NOTES,
    adminNotes: OrderConstants.NOTES
  });

  public static readonly UPDATE_ORDER_SCHEMA = z
    .object({
      orderNumber: OrderConstants.ORDER_NUMBER.optional(),
      userId: OrderConstants.USER_ID.optional(),
      shippingAddressId: OrderConstants.ADDRESS_ID,
      billingAddressId: OrderConstants.ADDRESS_ID,
      status: OrderConstants.STATUS.optional(),
      subtotalCents: OrderConstants.CENTS_AMOUNT.optional(),
      taxAmountCents: OrderConstants.CENTS_AMOUNT.optional(),
      shippingCents: OrderConstants.CENTS_AMOUNT.optional(),
      totalCents: OrderConstants.TOTAL_CENTS.optional(),
      paymentStatus: OrderConstants.PAYMENT_STATUS.optional(),
      paymentMethod: OrderConstants.PAYMENT_METHOD,
      paymentReference: OrderConstants.PAYMENT_REFERENCE,
      shippingMethod: OrderConstants.SHIPPING_METHOD,
      trackingNumber: OrderConstants.TRACKING_NUMBER,
      customerNotes: OrderConstants.NOTES,
      adminNotes: OrderConstants.NOTES,
      shippedAt: OrderConstants.DATE,
      deliveredAt: OrderConstants.DATE
    })
    .refine(obj => Object.keys(obj).length > 0, {
      message: 'Aucune donnée fournie pour la mise à jour'
    });

  public static validateCreateOrder(data: unknown): CreateOrderSchemaType {
    return OrderConstants.CREATE_ORDER_SCHEMA.parse(data);
  }

  public static validateUpdateOrder(data: unknown): UpdateOrderSchemaType {
    return OrderConstants.UPDATE_ORDER_SCHEMA.parse(data);
  }
}

export type CreateOrderSchemaType = z.infer<typeof OrderConstants.CREATE_ORDER_SCHEMA>;
export type UpdateOrderSchemaType = z.infer<typeof OrderConstants.UPDATE_ORDER_SCHEMA>;
