import { z } from 'zod';

export class TaxRateConstants {
  public static readonly ID_SCHEMA = z.string().min(1);
  public static readonly NAME_SCHEMA = z.string().min(1, 'Nom est requis').max(50);
  public static readonly RATE_SCHEMA = z.string().min(1, 'Taux est requis');
  public static readonly DESCRIPTION_SCHEMA = z.string();
  public static readonly IS_ACTIVE_SCHEMA = z.boolean().default(true);

  public static readonly CREATE_TAX_RATES_SCHEMA = z.object({
    name: TaxRateConstants.NAME_SCHEMA,
    rate: TaxRateConstants.RATE_SCHEMA,
    description: TaxRateConstants.DESCRIPTION_SCHEMA,
    isActive: TaxRateConstants.IS_ACTIVE_SCHEMA
  });

  public static readonly UPDATE_TAX_RATES_SCHEMA = z.object({
    name: TaxRateConstants.NAME_SCHEMA,
    rate: TaxRateConstants.RATE_SCHEMA,
    description: TaxRateConstants.DESCRIPTION_SCHEMA,
    isActive: TaxRateConstants.IS_ACTIVE_SCHEMA
  });

  // ! le bug viens peut etre de la reponse
  public static readonly RESPONSE_TAX_RATES_SCHEMA = z.object({
    id: TaxRateConstants.ID_SCHEMA,
    name: TaxRateConstants.NAME_SCHEMA,
    rate: TaxRateConstants.RATE_SCHEMA,
    description: TaxRateConstants.DESCRIPTION_SCHEMA,
    isActive: TaxRateConstants.IS_ACTIVE_SCHEMA
  });

  public static validateCreateTaxRate(data: unknown) {
    return TaxRateConstants.CREATE_TAX_RATES_SCHEMA.parse(data);
  }

  public static validateUpdateRole(data: unknown): UpdateTaxRateSchemaType {
    return TaxRateConstants.UPDATE_TAX_RATES_SCHEMA.parse(data);
  }

  public static validateResponseTaxRate(data: unknown) {
    return TaxRateConstants.RESPONSE_TAX_RATES_SCHEMA.parse(data);
  }
}

export type CreateTaxRateSchemaType = z.infer<typeof TaxRateConstants.CREATE_TAX_RATES_SCHEMA>;
export type ResponseTaxRateSchemaType = z.infer<typeof TaxRateConstants.RESPONSE_TAX_RATES_SCHEMA>;
export type UpdateTaxRateSchemaType = z.infer<typeof TaxRateConstants.UPDATE_TAX_RATES_SCHEMA>;
