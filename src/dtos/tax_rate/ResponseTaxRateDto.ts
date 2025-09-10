import { type ResponseTaxRateSchemaType, TaxRateConstants } from '@/constants';
import type { ITaxRate } from '@/interfaces';

export class ResponseTaxRateDto {
  static fromTaxRate(TaxRate: ITaxRate): ResponseTaxRateDto {
    throw new Error('Method not implemented.');
  }
  public readonly id: string;
  public readonly name: string;
  public readonly rate: string;
  public readonly description: string;
  public readonly isActive: boolean;

  constructor(data: unknown) {
    const validated: ResponseTaxRateSchemaType = TaxRateConstants.validateResponseTaxRate(data);
    this.id = validated.id;
    this.name = validated.name;
    this.rate = validated.rate;
    this.description = validated.description;
    this.isActive = validated.isActive;
  }

  // Getters
  public getId(): string {
    return this.id;
  }

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

  public static from(taxRate: ITaxRate): ResponseTaxRateDto {
    return new ResponseTaxRateDto({
      id: taxRate.getId(),
      name: taxRate.getName(),
      rate: taxRate.getRate(),
      description: taxRate.getDescription(),
      isActive: taxRate.getIsActive()
    });
  }
}
