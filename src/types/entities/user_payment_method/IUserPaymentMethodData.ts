import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface IUserPaymentMethodData extends IBaseEntityData {
  user_id: string;
  card_token: string;
  card_last4: string;
  card_brand: string;
  card_type: string;
  cardholder_name: string;
  expires_month: string;
  expires_year: string;
  nickname: string;
  is_default: boolean;
  is_active: boolean;
}

export type CreateUserPaymentMethodData = WithoutSystemFieldsType<IUserPaymentMethodData>;
export type UpdateUserPaymentMethodData = PartialWithoutSystemFieldsType<IUserPaymentMethodData>;
