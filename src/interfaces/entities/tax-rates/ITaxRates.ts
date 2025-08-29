import type { IEntity } from '@/interfaces';

export interface ITaxRates extends IEntity {
  // === GETTERS COMPLETS ===
  getName(): string;
  getRate(): number;
  getDescription(): string;
  getIsActive(): boolean;
  // === SETTERS COMPLETS ===
  setName(name: string): this;
  setRate(rate: number): this;
  setDescription(description: string): this;
  setIsActive(is_active: boolean): this;
}
