// src/types/entities/IUserProfile.ts
import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface IUserProfileData extends IBaseEntityData {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: Date;
  newsletterConsent: boolean;
  newsletterConsentDate: Date;
  avatarUrl: string;
}

export type CreateUserProfileData = WithoutSystemFieldsType<IUserProfileData>;
export type UpdateUserProfileData = PartialWithoutSystemFieldsType<IUserProfileData>;
