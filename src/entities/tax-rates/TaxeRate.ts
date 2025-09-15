import { BaseEntity } from '@/entities';
import type { ITaxeRate } from '@/interfaces';
import type { ITaxeRateData } from '@/types';

export class TaxeRate extends BaseEntity implements ITaxeRate {
  private name: string;
  private rate: number;
  private description: string;
  private active: boolean;

  constructor(data: ITaxeRateData) {
    super(data);
    this.name = data.name;
    this.rate = data.rate;
    this.description = data.description;
    this.active = data.isActive;
  }

  public getName(): string {
    return this.name;
  }

  public getRate(): number {
    return this.rate;
  }

  public getDescription(): string {
    return this.description;
  }

  public isActive(): boolean {
    return this.active;
  }

  public setName(name: string): this {
    this.name = name;
    this.updateTimestamp();
    return this;
  }

  public setRate(rate: number): this {
    this.rate = rate;
    this.updateTimestamp();
    return this;
  }

  public setDescription(description: string): this {
    this.description = description;
    this.updateTimestamp();
    return this;
  }

  public setActive(active: boolean): this {
    this.active = active;
    this.updateTimestamp();
    return this;
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      taxeRateId: this.id,
      name: this.name,
      rate: this.rate,
      description: this.description,
      isActive: this.active
    };
  }
}
