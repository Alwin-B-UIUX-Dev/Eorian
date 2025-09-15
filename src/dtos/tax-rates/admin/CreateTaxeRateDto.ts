import {
  type CreateTaxeRateSchemaType,
  TaxeRateConstants
} from '@/constants/zod/TaxeRateConstants';

export class CreateTaxeRateDto {
  public readonly name: string;
  public readonly rate: number;
  public readonly description?: string | undefined;
  public readonly isActive: boolean;

  constructor(data: unknown) {
    const validated: CreateTaxeRateSchemaType = TaxeRateConstants.validateCreateTaxeRate(data);
    this.name = validated.name;
    this.rate = validated.rate;
    this.description = validated.description;
    this.isActive = validated.isActive;
  }
}
