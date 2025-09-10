import type { IEntity } from '@/interfaces';

export interface ITaxRate extends IEntity {
  // === GETTERS COMPLETS ===
  getName(): string;
  getRate(): string;
  getDescription(): string;
  getIsActive(): boolean;
  // === SETTERS COMPLETS ===
  setName(name: string): this;
  setRate(rate: string): this;
  setDescription(description: string): this;
  setIsActive(is_active: boolean): this;
}
