import {
  AdressesConstants,
  type CreateAdressesSchemaType
} from '@/constants/zod/AdressesConstants';

/**
contenus copier depuis entities
DTO pour la création des données d'adresse utilisateur (livraison/facture)

 */
export class CreateAdressesDto {
  public readonly userId: string;
  public readonly type: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly company: string;
  public readonly phone: string;
  public readonly addressLine1: string;
  public readonly addressLine2: string;
  public readonly city: string;
  public readonly postalCode: string;
  public readonly stateRegion: string;
  public readonly country: string;
  public readonly isDefault: boolean;

  constructor(data: unknown) {
    const validated: CreateAdressesSchemaType = AdressesConstants.validationCreateAdresses(data);
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

  // === GETTERS COMPLETS ===
  public getUserId(): string {
    return this.userId;
  }

  public getType(): string {
    return this.type;
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
}
