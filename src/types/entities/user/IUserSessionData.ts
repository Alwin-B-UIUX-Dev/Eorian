// src/types/entities/user/IUserSession.ts
import type {
  IBaseEntityData,
  IDeviceInfoData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface IUserSessionData extends IBaseEntityData {
  userId: string;
  refreshToken: string;
  deviceInfo: IDeviceInfoData;
  expiresAt: Date;
  isActive: boolean;
}

export type CreateUserSessionData = WithoutSystemFieldsType<IUserSessionData>;
export type UpdateUserSessionData = PartialWithoutSystemFieldsType<IUserSessionData>;
