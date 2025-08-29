import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface IUsersData extends IBaseEntityData {
  username: string;
  email: string;
  password_hash: string;
  role_id: number;
  is_active: boolean;
  is_connected: boolean;
  email_verified: boolean;
  gdpr_consent: boolean;
  gdpr_consent_date: Date | null;
  last_login_at: Date | null;
}

export type CreateUsersData = WithoutSystemFieldsType<IUsersData>;
export type UpdateUsersData = PartialWithoutSystemFieldsType<IUsersData>;
