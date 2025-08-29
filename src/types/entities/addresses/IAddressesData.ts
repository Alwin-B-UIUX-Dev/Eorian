import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface IAddressesData extends IBaseEntityData {
  userId: number;
  firstName: string;
  lastName: string;
  company: string | null;
  phone: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  postalCode: string;
  stateRegion: string | null;
  country: string;
  isDefault: boolean;
}

export type CreateAddressesData = WithoutSystemFieldsType<IAddressesData>;
export type UpdateAddressesData = PartialWithoutSystemFieldsType<IAddressesData>;
