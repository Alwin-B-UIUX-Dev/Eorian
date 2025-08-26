import type { IEntity } from '@/interfaces';

export interface IProduct extends IEntity {
  // === GETTERS COMPLETS ===
  getName(): string;
  getSlug(): string;
  getSku(): string;
  getShortDescription(): string;
  getDescription(): string;
  getPriceCents(): string;
  getTaxRateId(): string;
  getStockQuantity(): string;
  getLowStockThreshold(): string;
  getManageStock(): boolean;
  getMetaTitle(): string;
  getMetaDescription(): string;
  getIsActive(): boolean;
  getCreatedBy(): string;
  // === SETTERS COMPLETS ===
  setName(name: string): this;
  setSlug(slug: string): this;
  setSku(sku: string): this;
  setShortDescription(shortDescription: string): this;
  setDescription(description: string): this;
  setPriceCents(priceCents: string): this;
  setTaxRateId(taxRateId: string): this;
  setStockQuantity(stockQuantity: string): this;
  setLowStockThreshold(lowStockThreshold: string): this;
  setManageStock(manageStock: boolean): this;
  setMetaTitle(metaTitle: string): this;
  setMetaDescription(metaDescription: string): this;
  setIsActive(isActive: boolean): this;
  setCreatedBy(createBy: string): this;
}
