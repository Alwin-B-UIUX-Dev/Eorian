import {
  TaxeRateConstants,
  type UpdateTaxeRateSchemaType
} from '@/constants/zod/TaxeRateConstants';

export class UpdateTaxeRateDto {
  public readonly name?: string | undefined;
  public readonly rate?: number | undefined;
  public readonly description?: string | undefined;
  public readonly isActive?: boolean | undefined;

  constructor(data: unknown) {
    const validated: UpdateTaxeRateSchemaType = TaxeRateConstants.validateUpdateTaxeRate(data);
    this.name = validated.name;
    this.rate = validated.rate;
    this.description = validated.description;
    this.isActive = validated.isActive;
  }
}
