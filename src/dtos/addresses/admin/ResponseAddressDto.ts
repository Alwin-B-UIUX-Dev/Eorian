import type { IAddressData } from '@/types';

export class ResponseAddressDto {
  public readonly addressId: string;
  public readonly userId: string;
  public readonly type: 'shipping' | 'billing' | 'both';
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly company: string | undefined;
  public readonly phone: string;
  public readonly addressLine1: string;
  public readonly addressLine2: string | undefined;
  public readonly city: string;
  public readonly postalCode: string;
  public readonly stateRegion: string | undefined;
  public readonly country: string;
  public readonly isDefault: boolean;
  public readonly fullName: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(data: IAddressData) {
    this.addressId = data.id;
    this.userId = data.userId;
    this.type = data.type;
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
    this.fullName = `${data.firstName} ${data.lastName}`;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
