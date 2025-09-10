import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface IAddresseData extends IBaseEntityData {
  userId: string;
  type: string;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  stateRegion: string;
  country: string;
  isDefault: boolean;
}

export type CreateAddresseData = WithoutSystemFieldsType<IAddresseData>;
export type UpdateAddresseData = PartialWithoutSystemFieldsType<IAddresseData>;
