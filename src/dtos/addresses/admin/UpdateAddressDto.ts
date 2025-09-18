import { AddressConstants, type UpdateAddressSchemaType } from '@/constants';

export class UpdateAddressDto {
  public readonly type: 'shipping' | 'billing' | 'both' | undefined;
  public readonly firstName: string | undefined;
  public readonly lastName: string | undefined;
  public readonly company: string | undefined;
  public readonly phone: string | undefined;
  public readonly addressLine1: string | undefined;
  public readonly addressLine2: string | undefined;
  public readonly city: string | undefined;
  public readonly postalCode: string | undefined;
  public readonly stateRegion: string | undefined;
  public readonly country: string | undefined;
  public readonly isDefault: boolean | undefined;

  constructor(data: unknown) {
    const validated: UpdateAddressSchemaType = AddressConstants.validateUpdateAddress(data);
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
