import type { IEntity } from '@/interfaces';
import type { IAddressData } from '@/types';

export interface IAddress extends IEntity {
  getUserId(): string;
  getType(): 'shipping' | 'billing' | 'both';
  getFirstName(): string;
  getLastName(): string;
  getCompany(): string | undefined;
  getPhone(): string;
  getAddressLine1(): string;
  getAddressLine2(): string | undefined;
  getCity(): string;
  getPostalCode(): string;
  getStateRegion(): string | undefined;
  getCountry(): string;
  getIsDefault(): boolean;
  getFullName(): string;

  setUserId(userId: string): this;
  setType(type: 'shipping' | 'billing' | 'both'): this;
  setFirstName(firstName: string): this;
  setLastName(lastName: string): this;
  setCompany(company: string | undefined): this;
  setPhone(phone: string): this;
  setAddressLine1(addressLine1: string): this;
  setAddressLine2(addressLine2: string | undefined): this;
  setCity(city: string): this;
  setPostalCode(postalCode: string): this;
  setStateRegion(stateRegion: string | undefined): this;
  setCountry(country: string): this;
  setIsDefault(isDefault: boolean): this;

  toData(): IAddressData;
}
