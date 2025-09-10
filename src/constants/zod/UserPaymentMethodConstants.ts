import { z } from 'zod';

export class UserPaymentMethodConstants {
  public static readonly ID_SCHEMA = z.string().min(1);
  public static readonly USER_ID_SCHEMA = z.string().min(1);
  public static readonly CARD_TOKEN_SCHEMA = z.string().min(1).max(255);
  public static readonly CARD_LAST4_SCHEMA = z.string().min(1).length(4);
  public static readonly CARD_BRAND_SCHEMA = z.string().min(1).max(20);
  public static readonly CARD_TYPE_SCHEMA = z.string().min(1).max(10).default('card');
  public static readonly CARDHOLDER_NAME_SCHEMA = z.string().max(100);
  public static readonly EXPIRES_MONTH_SCHEMA = z.string();
  public static readonly EXPIRES_YEAR_SCHEMA = z.string();
  public static readonly NICKNAME_SCHEMA = z.string().max(50);
  public static readonly IS_DEFAULT_SCHEMA = z.boolean().default(false);
  public static readonly IS_ACTIVE_SCHEMA = z.boolean().default(true);

  public static readonly CREATE_USER_PAYMENT_METHODS_SCHEMA = z.object({
    userId: UserPaymentMethodConstants.USER_ID_SCHEMA,
    cardToken: UserPaymentMethodConstants.CARD_TOKEN_SCHEMA,
    cardLast4: UserPaymentMethodConstants.CARD_LAST4_SCHEMA,
    cardBrand: UserPaymentMethodConstants.CARD_BRAND_SCHEMA,
    cardType: UserPaymentMethodConstants.CARD_TYPE_SCHEMA,
    cardholderName: UserPaymentMethodConstants.CARDHOLDER_NAME_SCHEMA,
    expiresMonth: UserPaymentMethodConstants.EXPIRES_MONTH_SCHEMA,
    expiresYear: UserPaymentMethodConstants.EXPIRES_YEAR_SCHEMA,
    nickname: UserPaymentMethodConstants.NICKNAME_SCHEMA,
    isDefault: UserPaymentMethodConstants.IS_DEFAULT_SCHEMA,
    isActive: UserPaymentMethodConstants.IS_ACTIVE_SCHEMA
  });

  public static readonly RESPONSE_USER_PAYMENT_METHODS_SCHEMA = z.object({
    id: UserPaymentMethodConstants.ID_SCHEMA,
    userId: UserPaymentMethodConstants.USER_ID_SCHEMA,
    cardToken: UserPaymentMethodConstants.CARD_TOKEN_SCHEMA,
    cardLast4: UserPaymentMethodConstants.CARD_LAST4_SCHEMA,
    cardBrand: UserPaymentMethodConstants.CARD_BRAND_SCHEMA,
    cardType: UserPaymentMethodConstants.CARD_TYPE_SCHEMA,
    cardholderName: UserPaymentMethodConstants.CARDHOLDER_NAME_SCHEMA,
    expiresMonth: UserPaymentMethodConstants.EXPIRES_MONTH_SCHEMA,
    expiresYear: UserPaymentMethodConstants.EXPIRES_YEAR_SCHEMA,
    nickname: UserPaymentMethodConstants.NICKNAME_SCHEMA,
    isDefault: UserPaymentMethodConstants.IS_DEFAULT_SCHEMA,
    isActive: UserPaymentMethodConstants.IS_ACTIVE_SCHEMA
  });

  public static validateCreateUserPaymentMethod(data: unknown) {
    return UserPaymentMethodConstants.CREATE_USER_PAYMENT_METHODS_SCHEMA.parse(data);
  }

  public static validateResponseUserPaymentMethod(data: unknown) {
    return UserPaymentMethodConstants.RESPONSE_USER_PAYMENT_METHODS_SCHEMA.parse(data);
  }
}

export type CreateUserPaymentMethodSchemaType = z.infer<
  typeof UserPaymentMethodConstants.CREATE_USER_PAYMENT_METHODS_SCHEMA
>;
export type ResponseUserPaymentMethodSchemaType = z.infer<
  typeof UserPaymentMethodConstants.RESPONSE_USER_PAYMENT_METHODS_SCHEMA
>;
