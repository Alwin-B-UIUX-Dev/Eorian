import { AddressConstants, type CreateAddressSchemaType } from '@/constants';

export class CreateAddressDto {
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

  constructor(data: unknown) {
    const validated: CreateAddressSchemaType = AddressConstants.validateCreateAddress(data);
    this.userId = validated.userId;
    this.type = validated.type;
    this.firstName = validated.firstName;
    this.lastName = validated.lastName;
    this.company = validated.company;
    this.phone = validated.phone;
    this.addressLine1 = validated.addressLine1;
    this.addressLine2 = validated.addressLine2;
    this.city = validated.city;
    this.postalCode = validated.postalCode;
    this.stateRegion = validated.stateRegion;
    this.country = validated.country;
    this.isDefault = validated.isDefault;
  }
}
