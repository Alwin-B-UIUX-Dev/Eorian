import type { IEntity } from '@/interfaces';

export interface IProduct extends IEntity {
  // === GETTERS COMPLETS ===
  getName(): string;
  getSlug(): string;
  getSku(): string;
  getShortDescription(): string;
  getDescription(): string;
  getPriceCents(): number;
  getTaxRateId(): number;
  getStockQuantity(): number;
  getLowStockThreshold(): number;
  getManageStock(): boolean;
  getMetaTitle(): string;
  getMetaDescription(): string;
  getIsActive(): boolean;
  getCreatedBy(): number;
  // === SETTERS COMPLETS ===
  setName(name: string): this;
  setSlug(slug: string): this;
  setSku(sku: string): this;
  setShortDescription(short_description: string): this;
  setDescription(description: string): this;
  setPriceCents(price_cents: number): this;
  setTaxRateId(tax_rate_id: number): this;
  setStockQuantity(stock_quantity: number): this;
  setLowStockThreshold(low_stock_threshold: number): this;
  setManageStock(manage_stock: boolean): this;
  setMetaTitle(meta_title: string): this;
  setMetaDescription(meta_description: string): this;
  setIsActive(is_active: boolean): this;
  setCreatedBy(created_by: number): this;
}
