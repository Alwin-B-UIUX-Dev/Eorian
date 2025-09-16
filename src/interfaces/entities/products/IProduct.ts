import type { IEntity } from '@/interfaces';
import type { IProductData } from '@/types';

export interface IProduct extends IEntity {
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
  isActive(): boolean;
  getCreatedBy(): number;
  setName(name: string): this;
  setSlug(slug: string): this;
  setSku(sku: string | null): this;
  setShortDescription(shortDescription: string | null): this;
  setDescription(description: string | null): this;
  setPriceCents(priceCents: number): this;
  setTaxRateId(taxRateId: number): this;
  setStockQuantity(stockQuantity: number): this;
  setLowStockThreshold(lowStockThreshold: number): this;
  setManageStock(manageStock: boolean): this;
  setMetaTitle(metaTitle: string | null): this;
  setMetaDescription(metaDescription: string | null): this;
  setActive(isActive: boolean): this;
  toData(): IProductData;
}
