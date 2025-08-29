import type { IEntity } from '@/interfaces';

export interface IAddresses extends IEntity {
  // === GETTERS COMPLETS ===
  getUserId(): number;
  getFirstName(): string;
  getLastName(): string;
  getCompany(): string | null;
  getPhone(): string;
  getAddressLine1(): string;
  getAddressLine2(): string | null;
  getCity(): string;
  getPostalCode(): string;
  getStateRegion(): string | null;
  getCountry(): string;
  getIsDefault(): boolean;

  // === SETTERS COMPLETS ===
  setUserId(userId: number): this;
  setFirstName(firstName: string): this;
  setLastName(lastName: string): this;
  setCompany(company: string | null): this;
  setPhone(phone: string): this;
  setAddressLine1(addressLine1: string): this;
  setAddressLine2(addressLine2: string | null): this;
  setCity(city: string): this;
  setPostalCode(postalCode: string): this;
  setStateRegion(stateRegion: string | null): this;
  setCountry(country: string): this;
  setIsDefault(isDefault: boolean): this;
  // === MÉTHODES MÉTIER ===
}
