import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface IUserSessionsData extends IBaseEntityData {
  user_id: number;
  refresh_token: string;
  device_type: string;
  ip_address: string;
  expires_at: Date;
  is_active: boolean;
  revoked_at: Date;
}

export type CreateUserSessionsData = WithoutSystemFieldsType<IUserSessionsData>;
export type UpdateUserSessionsData = PartialWithoutSystemFieldsType<IUserSessionsData>;
