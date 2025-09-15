import { z } from 'zod';

export class TaxeRateConstants {
  public static readonly NAME = z
    .string()
    .min(3, 'Le nom du taux doit contenir au moins 3 caractères')
    .max(50, 'Le nom du taux doit contenir au maximum 50 caractères');

  public static readonly RATE = z
    .number()
    .min(0, 'La valeur du taux doit être positive')
    .max(1, 'La valeur du taux ne peut pas dépasser 1 (100%)');

  public static readonly DESCRIPTION = z
    .string()
    .max(255, 'La description doit contenir au maximum 255 caractères')
    .optional();

  public static readonly IS_ACTIVE = z.boolean().optional().default(true);

  public static readonly CREATE_TAXE_RATE_SCHEMA = z.object({
    name: TaxeRateConstants.NAME,
    rate: TaxeRateConstants.RATE,
    description: TaxeRateConstants.DESCRIPTION,
    isActive: TaxeRateConstants.IS_ACTIVE
  });

  public static readonly UPDATE_TAXE_RATE_SCHEMA = z
    .object({
      name: TaxeRateConstants.NAME.optional(),
      rate: TaxeRateConstants.RATE.optional(),
      description: TaxeRateConstants.DESCRIPTION,
      isActive: TaxeRateConstants.IS_ACTIVE
    })
    .refine(obj => Object.keys(obj).length > 0, {
      message: 'Aucune donnée fournie pour la mise à jour'
    });

  public static validateCreateTaxeRate(data: unknown): CreateTaxeRateSchemaType {
    return TaxeRateConstants.CREATE_TAXE_RATE_SCHEMA.parse(data);
  }

  public static validateUpdateTaxeRate(data: unknown): UpdateTaxeRateSchemaType {
    return TaxeRateConstants.UPDATE_TAXE_RATE_SCHEMA.parse(data);
  }
}

export type CreateTaxeRateSchemaType = z.infer<typeof TaxeRateConstants.CREATE_TAXE_RATE_SCHEMA>;
export type UpdateTaxeRateSchemaType = z.infer<typeof TaxeRateConstants.UPDATE_TAXE_RATE_SCHEMA>;
