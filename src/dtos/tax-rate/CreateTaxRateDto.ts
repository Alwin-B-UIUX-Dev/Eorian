import { type CreateTaxRateSchemaType, TaxRateConstants } from '@/constants';

export class CreateTaxRateDto {
  public readonly name: string;
  public readonly rate: string;
  public readonly description: string;
  public readonly isActive: boolean;

  constructor(data: unknown) {
    const validated: CreateTaxRateSchemaType = TaxRateConstants.validateCreateTaxRate(data);
    this.name = validated.name;
    this.rate = validated.rate;
    this.description = validated.description;
    this.isActive = validated.isActive;
  }
}
