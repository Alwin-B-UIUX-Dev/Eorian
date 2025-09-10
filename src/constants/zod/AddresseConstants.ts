import { z } from 'zod';
/**
Class qui permet de créer la validation des données via ZOD

Exemple: types(string, boolean, string), longueur(min, max), message pour le front
 */
export class AddresseConstants {
  // ID AUTO_INCREMENT
  public static readonly ID_SCHEMA = z.string().min(1);

  // SCHEMAS DE BASE
  public static readonly USER_ID_SCHEMA = z.string().min(1);

  public static readonly TYPE_SCHEMA = z.string().max(20).toLowerCase().trim();

  public static readonly FIRST_NAME_SCHEMA = z
    .string()
    .min(2, 'Votre prénom doit contenir au moins 2 caractères')
    .max(100, 'Votre prénom ne doit pas dépasser les 100 caractères')
    .toLowerCase()
    .trim();

  public static readonly LAST_NAME_SCHEMA = z
    .string()
    .min(2, 'Votre nom doit contenir au moins 2 caractères')
    .max(100, 'Votre nom ne doit pas dépasser les 100 caractères')
    .toLowerCase()
    .trim();

  public static readonly COMPANY_SCHEMA = z
    .string()
    .max(150, "Le nom de l'entreprise ne doit pas dépasser 150 caractères");

  public static readonly PHONE_SCHEMA = z
    .string()
    .min(10, 'Le numéro de téléphone est requis')
    .max(20, 'Le numéro de téléphone ne doit pas dépasser 20 caractères')
    .trim();

  public static readonly ADDRESS_LINE_1_SCHEMA = z
    .string()
    .min(1, "L'adresse est requise")
    .max(200, "L'adresse ne doit pas dépasser 200 caractères");

  public static readonly ADDRESS_LINE_2_SCHEMA = z
    .string()
    .max(200, "La ligne d'adresse complémentaire ne doit pas dépasser 20 caractères");

  public static readonly CITY_SCHEMA = z
    .string()
    .min(1, 'La ville est requise')
    .max(100, 'La ville ne doit pas dépasser 20 caractères');

  public static readonly POSTAL_CODE_SCHEMA = z
    .string()
    .min(1, 'Le code postal est requis')
    .max(10, 'Le code postal ne doit pas dépasser 20 caractères')
    .trim();

  public static readonly STATE_REGION_SCHEMA = z
    .string()
    .max(100, 'La région ne doit pas dépasser 20 caractères');

  public static readonly COUNTRY_SCHEMA = z
    .string()
    .max(2, 'Le pays ne doit pas dépasser 20 caractères')
    .trim();

  public static readonly IS_DEFAULT_SCHEMA = z.boolean().default(true);

  // SCHEMAS COMPLETS

  public static readonly CREATE_ADDRESSES_SCHEMA = z.object({
    userId: AddresseConstants.USER_ID_SCHEMA,
    firstName: AddresseConstants.FIRST_NAME_SCHEMA,
    lastName: AddresseConstants.LAST_NAME_SCHEMA,
    company: AddresseConstants.COMPANY_SCHEMA,
    phone: AddresseConstants.PHONE_SCHEMA,
    addressLine1: AddresseConstants.ADDRESS_LINE_1_SCHEMA,
    addressLine2: AddresseConstants.ADDRESS_LINE_2_SCHEMA,
    city: AddresseConstants.CITY_SCHEMA,
    postalCode: AddresseConstants.POSTAL_CODE_SCHEMA,
    stateRegion: AddresseConstants.STATE_REGION_SCHEMA,
    country: AddresseConstants.COUNTRY_SCHEMA,
    isDefault: AddresseConstants.IS_DEFAULT_SCHEMA
  });

  public static readonly RESPONSE_ADDRESSES_SCHEMA = z.object({
    id: AddresseConstants.ID_SCHEMA,
    userId: AddresseConstants.USER_ID_SCHEMA,
    firstName: AddresseConstants.FIRST_NAME_SCHEMA,
    lastName: AddresseConstants.LAST_NAME_SCHEMA,
    company: AddresseConstants.COMPANY_SCHEMA,
    phone: AddresseConstants.PHONE_SCHEMA,
    addressLine1: AddresseConstants.ADDRESS_LINE_1_SCHEMA,
    addressLine2: AddresseConstants.ADDRESS_LINE_2_SCHEMA,
    city: AddresseConstants.CITY_SCHEMA,
    postalCode: AddresseConstants.POSTAL_CODE_SCHEMA,
    stateRegion: AddresseConstants.STATE_REGION_SCHEMA,
    country: AddresseConstants.COUNTRY_SCHEMA,
    isDefault: AddresseConstants.IS_DEFAULT_SCHEMA
  });

  // VALIDATION
  public static validateCreateAddresse(data: unknown): CreateAddresseSchemaType {
    return AddresseConstants.CREATE_ADDRESSES_SCHEMA.parse(data);
  }

  //REPONSE
  public static validateResponseAddresse(data: unknown): ResponseAddresseSchemaType {
    return AddresseConstants.RESPONSE_ADDRESSES_SCHEMA.parse(data);
  }
}

// TYPES
export type CreateAddresseSchemaType = z.infer<typeof AddresseConstants.CREATE_ADDRESSES_SCHEMA>;
export type ResponseAddresseSchemaType = z.infer<
  typeof AddresseConstants.RESPONSE_ADDRESSES_SCHEMA
>;
