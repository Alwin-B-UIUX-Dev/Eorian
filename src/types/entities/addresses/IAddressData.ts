import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface IAddressData extends IBaseEntityData {
  userId: string;
  type: 'shipping' | 'billing' | 'both';
  firstName: string;
  lastName: string;
  company?: string | undefined;
  phone: string;
  addressLine1: string;
  addressLine2?: string | undefined;
  city: string;
  postalCode: string;
  stateRegion?: string | undefined;
  country: string;
  isDefault: boolean;
}

export type CreateAddressData = WithoutSystemFieldsType<IAddressData>;
export type UpdateAddressData = PartialWithoutSystemFieldsType<IAddressData>;
