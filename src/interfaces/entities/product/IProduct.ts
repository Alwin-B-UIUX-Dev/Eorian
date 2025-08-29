import type { IEntity } from '@/interfaces';

export interface IProduct extends IEntity {
  // === GETTERS COMPLETS ===
  getName(): string;
  getSlug(): string;
  getSku(): string | null;
  getShortDescription(): string | null;
  getDescription(): string | null;
  getPriceCents(): number;
  getTaxRateId(): number;
  getStockQuantity(): number;
  getLowStockThreshold(): number;
  getManageStock(): boolean;
  getMetaTitle(): string | null;
  getMetaDescription(): string | null;
  getIsActive(): boolean;
  getCreatedBy(): number;
  // === SETTERS COMPLETS ===
  setName(name: string): this;
  setSlug(slug: string): this;
  setSku(sku: string | null): this;
  setShortDescription(short_description: string | null): this;
  setDescription(description: string | null): this;
  setPriceCents(price_cents: number): this;
  setTaxRateId(tax_rate_id: number): this;
  setStockQuantity(stock_quantity: number): this;
  setLowStockThreshold(low_stock_threshold: number): this;
  setManageStock(manage_stock: boolean): this;
  setMetaTitle(meta_title: string | null): this;
  setMetaDescription(meta_description: string | null): this;
  setIsActive(is_active: boolean): this;
  setCreatedBy(created_by: number): this;
}
