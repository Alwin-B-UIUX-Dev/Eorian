import type { ITaxeRateData } from '@/types/entities/tax-rates';

export class ResponseTaxeRateDto {
  public readonly taxeRateId: string;
  public readonly name: string;
  public readonly rate: number;
  public readonly description: string;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(data: ITaxeRateData) {
    this.taxeRateId = data.id;
    this.name = data.name;
    this.rate = data.rate;
    this.description = data.description;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
