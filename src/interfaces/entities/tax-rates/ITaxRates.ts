import type { IEntity } from '@/interfaces';

export interface ITaxRates extends IEntity {
  // === GETTERS COMPLETS ===
  getName(): string;
  getRate(): number;
  getDescription(): string | null;
  getIsActive(): boolean;
  // === SETTERS COMPLETS ===
  setName(name: string): this;
  setRate(rate: number): this;
  setDescription(description: string | null): this;
  setIsActive(is_active: boolean): this;
}
