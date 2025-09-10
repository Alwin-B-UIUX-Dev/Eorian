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
  setShortDescription(short_description: string): this;
  setDescription(description: string): this;
  setPriceCents(price_cents: string): this;
  setTaxRateId(tax_rate_id: string): this;
  setStockQuantity(stock_quantity: string): this;
  setLowStockThreshold(low_stock_threshold: string): this;
  setManageStock(manage_stock: boolean): this;
  setMetaTitle(meta_title: string): this;
  setMetaDescription(meta_description: string): this;
  setIsActive(is_active: boolean): this;
  setCreatedBy(created_by: string): this;
}
