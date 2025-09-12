import { TaxRateConstants } from '@/constants';
import type { UpdateTaxRateSchemaType } from '@/constants/zod/TaxRateConstants';
export class UpdateTaxRateDto {
  public readonly name?: string | undefined;
  public readonly rate?: string | undefined;
  public readonly description?: string | undefined;
  public readonly isActive?: boolean;

  constructor(data: unknown) {
    const validated: UpdateTaxRateSchemaType = TaxRateConstants.validateCreateTaxRate(data);
    this.name = validated.name;
    this.rate = validated.rate;
    this.description = validated.description;
    this.isActive = validated.isActive;
  }
}
