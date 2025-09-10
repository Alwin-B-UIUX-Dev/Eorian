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

  // Getters
  public getName(): string {
    return this.name;
  }
  public getRate(): string {
    return this.rate;
  }
  public getDescription(): string {
    return this.description;
  }
  public getIsActive(): boolean {
    return this.isActive;
  }
}
