import { AdressesConstants } from '@/constants';
import type { ResponseAdressesSchemaType } from '@/constants/zod/AdressesConstants';
import type { IAddresses } from '@/interfaces';

/**
contenus copier depuis entities
ne pas oublier d'ajouter la ligne ID qui n'existe pas dans Create
DTO pour la création des données d'adresse utilisateur (livraison/facture)

 */
export class ResponseAddressesDto {
  static fromAddresses(addresses: IAddresses): ResponseAddressesDto {
    throw new Error('Method not implemented.');
  }
  public readonly id: string; // celle ci
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
    const validated: ResponseAdressesSchemaType =
      AdressesConstants.validationResponseAdresses(data);
    this.id = validated.id; // ici aussi
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
  public getId(): string {
    return this.id; // et ici
  }
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

  public static from(addresses: IAddresses): ResponseAddressesDto {
    return new ResponseAddressesDto({
      id: addresses.getId().toString(),
      userId: addresses.getUserId(),
      type: addresses.getType(),
      firstName: addresses.getFirstName(),
      lastName: addresses.getLastName(),
      company: addresses.getCompany(),
      phone: addresses.getPhone(),
      addressLine1: addresses.getAddressLine1(),
      addressLine2: addresses.getAddressLine2(),
      city: addresses.getCity(),
      postalCode: addresses.getPostalCode(),
      stateRegion: addresses.getStateRegion(),
      country: addresses.getCountry(),
      isDefault: addresses.getIsDefault()
    });
  }
}
