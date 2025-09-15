// src/interfaces/entities/products/IProduct.ts
import type { IEntity } from '@/interfaces';

export interface IProduct extends IEntity {
  getName(): string;
  getSlug(): string;
  getSku(): string | undefined;
  getShortDescription(): string | undefined;
  getDescription(): string | undefined;
  getPriceCents(): number;
  getTaxRateId(): string;
  getStockQuantity(): number;
  getLowStockThreshold(): number;
  getManageStock(): boolean;
  getMetaTitle(): string | undefined;
  getMetaDescription(): string | undefined;
  getIsActive(): boolean;
  getCreatedBy(): string;

  // Méthodes métier
  isInStock(): boolean;
  isLowStock(): boolean;
  getPriceInEuros(): number;
  updateStock(quantity: number): void;
  activate(): void;
  deactivate(): void;
}
