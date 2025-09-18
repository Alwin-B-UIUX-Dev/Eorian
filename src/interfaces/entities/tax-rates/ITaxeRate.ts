import type { IEntity } from '@/interfaces';
import type { ITaxeRateData } from '@/types';

export interface ITaxeRate extends IEntity {
  getName(): string;
  getRate(): number;
  getDescription(): string;
  setName(name: string): this;
  setRate(rate: number): this;
  setDescription(description: string): this;
  isActive(): boolean;
  setActive(active: boolean): this;
  toData(): ITaxeRateData;
}
