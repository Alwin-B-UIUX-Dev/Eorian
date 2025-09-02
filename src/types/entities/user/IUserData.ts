// src/interfaces/entities/user/IUserData.ts
import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface IUserData extends IBaseEntityData {
  username: string;
  email: string;
  passwordHash: string;
  roleId: string;
  isActive: boolean;
  isConnected: boolean;
  emailVerified: boolean;
  gdprConsent: boolean;
  gdprConsentDate: Date;
  lastLoginAt?: Date | undefined;
}

export type CreateUserData = WithoutSystemFieldsType<IUserData>;
export type UpdateUserData = PartialWithoutSystemFieldsType<IUserData>;
