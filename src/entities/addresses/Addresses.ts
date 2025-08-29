import type { IAddresses } from '@/interfaces';
import type { IAddressesData } from '@/types';
import { BaseEntity } from '../BaseEntity';

export class Addresses extends BaseEntity implements IAddresses {
  private userId: number;
  private firstName: string;
  private lastName: string;
  private company: string;
  private phone: string;
  private addressLine1: string;
  private addressLine2: string;
  private city: string;
  private postalCode: string;
  private stateRegion: string;
  private country: string;
  private isDefault: boolean;

  constructor(data: IAddressesData) {
    super(data, 'addressId');
    this.userId = data.userId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.company = data.company;
    this.phone = data.phone;
    this.addressLine1 = data.addressLine1;
    this.addressLine2 = data.addressLine2;
    this.city = data.city;
    this.postalCode = data.postalCode;
    this.stateRegion = data.stateRegion;
    this.country = data.country;
    this.isDefault = data.isDefault;
  }

  // === GETTERS ===
  public getUserId(): number {
    return this.userId;
  }
  public getFirstName(): string {
    return this.firstName;
  }
  public getLastName(): string {
    return this.lastName;
  }
  public getCompany(): string {
    return this.company;
  }
  public getPhone(): string {
    return this.phone;
  }
  public getAddressLine1(): string {
    return this.addressLine1;
  }
  public getAddressLine2(): string {
    return this.addressLine2;
  }
  public getCity(): string {
    return this.city;
  }
  public getPostalCode(): string {
    return this.postalCode;
  }
  public getStateRegion(): string {
    return this.stateRegion;
  }
  public getCountry(): string {
    return this.country;
  }
  public getIsDefault(): boolean {
    return this.isDefault;
  }

  // === SETTERS ===
  public setUserId(userId: number): this {
    this.userId = userId;
    this.updateTimestamp();
    return this;
  }
  public setFirstName(firstName: string): this {
    this.firstName = firstName;
    this.updateTimestamp();
    return this;
  }
  public setLastName(lastName: string): this {
    this.lastName = lastName;
    this.updateTimestamp();
    return this;
  }
  public setCompany(company: string): this {
    this.company = company;
    this.updateTimestamp();
    return this;
  }
  public setPhone(phone: string): this {
    this.phone = phone;
    this.updateTimestamp();
    return this;
  }
  public setAddressLine1(addressLine1: string): this {
    this.addressLine1 = addressLine1;
    this.updateTimestamp();
    return this;
  }
  public setAddressLine2(addressLine2: string): this {
    this.addressLine2 = addressLine2;
    this.updateTimestamp();
    return this;
  }
  public setCity(city: string): this {
    this.city = city;
    this.updateTimestamp();
    return this;
  }
  public setPostalCode(postalCode: string): this {
    this.postalCode = postalCode;
    this.updateTimestamp();
    return this;
  }
  public setStateRegion(stateRegion: string): this {
    this.stateRegion = stateRegion;
    this.updateTimestamp();
    return this;
  }
  public setCountry(country: string): this {
    this.country = country;
    this.updateTimestamp();
    return this;
  }
  public setIsDefault(isDefault: boolean): this {
    this.isDefault = isDefault;
    this.updateTimestamp();
    return this;
  }
  protected getEntityData(): Record<string, unknown> {
    return {
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      company: this.company,
      phone: this.phone,
      addressLine1: this.addressLine1,
      addressLine2: this.addressLine2,
      city: this.city,
      postalCode: this.postalCode,
      stateRegion: this.stateRegion,
      country: this.country,
      isDefault: this.isDefault
    };
  }
}
