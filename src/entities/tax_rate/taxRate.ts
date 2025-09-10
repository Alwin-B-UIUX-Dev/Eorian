import { BaseEntity } from '@/entities';
import type { ITaxRate } from '@/interfaces';
import type { ITaxRateData } from '@/types';

export class TaxRate extends BaseEntity implements ITaxRate {
  private name: string;
  private rate: string;
  private description: string;
  private isActive: boolean;

  constructor(data: ITaxRateData) {
    super(data, 'taxRateId');
    this.name = data.name;
    this.rate = data.rate;
    this.description = data.description;
    this.isActive = data.is_active;
  }

  // === GETTERS ===
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

  // === SETTERS ===
  public setName(name: string): this {
    this.name = name;
    this.updateTimestamp();
    return this;
  }

  public setRate(rate: string): this {
    this.rate = rate;
    this.updateTimestamp();
    return this;
  }

  public setDescription(description: string): this {
    this.description = description;
    this.updateTimestamp();
    return this;
  }

  public setIsActive(isActive: boolean): this {
    this.isActive = isActive;
    this.updateTimestamp();
    return this;
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      name: this.name,
      rate: this.rate,
      description: this.description,
      is_active: this.isActive
    };
  }
}
