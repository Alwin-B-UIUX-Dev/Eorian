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
  ipAddress: string;
  expiresAt: Date;
  isActive: boolean;
  revokedAt: Date;
}

export type CreateUserSessionData = WithoutSystemFieldsType<IUserSessionData>;
export type UpdateUserSessionData = PartialWithoutSystemFieldsType<IUserSessionData>;
