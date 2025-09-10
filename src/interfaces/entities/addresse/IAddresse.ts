import type { IEntity } from '@/interfaces';

export interface IAddresse extends IEntity {
  // === GETTERS COMPLETS ===
  getUserId(): string;
  getFirstName(): string;
  getLastName(): string;
  getCompany(): string;
  getPhone(): string;
  getAddressLine1(): string;
  getAddressLine2(): string;
  getCity(): string;
  getPostalCode(): string;
  getStateRegion(): string;
  getCountry(): string;
  getIsDefault(): boolean;

  // === SETTERS COMPLETS ===
  setUserId(userId: string): this;
  setFirstName(firstName: string): this;
  setLastName(lastName: string): this;
  setCompany(company: string): this;
  setPhone(phone: string): this;
  setAddressLine1(addressLine1: string): this;
  setAddressLine2(addressLine2: string): this;
  setCity(city: string): this;
  setPostalCode(postalCode: string): this;
  setStateRegion(stateRegion: string): this;
  setCountry(country: string): this;
  setIsDefault(isDefault: boolean): this;
  // === MÉTHODES MÉTIER ===
}
