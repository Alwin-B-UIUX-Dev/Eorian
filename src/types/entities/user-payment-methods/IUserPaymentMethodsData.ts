import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface IUserPaymentMethodsData extends IBaseEntityData {
  user_id: number;
  card_token: string;
  card_last4: string;
  card_brand: string;
  card_type: string;
  cardholder_name: string | null;
  expires_month: number | null;
  expires_year: number | null;
  nickname: string | null;
  is_default: boolean;
  is_active: boolean;
}

export type CreateUserPaymentMethodsData = WithoutSystemFieldsType<IUserPaymentMethodsData>;
export type UpdateUserPaymentMethodsData = PartialWithoutSystemFieldsType<IUserPaymentMethodsData>;
