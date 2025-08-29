import { BaseEntity } from '@/entities/BaseEntity';
import type { IProduct } from '@/interfaces';
import type { IProductData } from '@/types';

export class Product extends BaseEntity implements IProduct {
  private name: string;
  private slug: string;
  private sku: string;
  private shortDescription: string;
  private description: string;
  private priceCents: number;
  private taxRateId: number;
  private stockQuantity: number;
  private lowStockThreshold: number;
  private manageStock: boolean;
  private metaTitle: string;
  private metaDescription: string;
  private isActive: boolean;
  private createdBy: number;

  constructor(data: IProductData) {
    super(data, 'productId');
    this.name = data.name;
    this.slug = data.slug;
    this.sku = data.sku;
    this.shortDescription = data.short_description;
    this.description = data.description;
    this.priceCents = data.price_cents;
    this.taxRateId = data.tax_rate_id;
    this.stockQuantity = data.stock_quantity;
    this.lowStockThreshold = data.low_stock_threshold;
    this.manageStock = data.manage_stock;
    this.metaTitle = data.meta_title;
    this.metaDescription = data.meta_description;
    this.isActive = data.is_active;
    this.createdBy = data.created_by;
  }

  // === GETTERS ===
  public getName(): string {
    return this.name;
  }
  public getSlug(): string {
    return this.slug;
  }
  public getSku(): string {
    return this.sku;
  }
  public getShortDescription(): string {
    return this.shortDescription;
  }
  public getDescription(): string {
    return this.description;
  }
  public getPriceCents(): number {
    return this.priceCents;
  }
  public getTaxRateId(): number {
    return this.taxRateId;
  }
  public getStockQuantity(): number {
    return this.stockQuantity;
  }
  public getLowStockThreshold(): number {
    return this.lowStockThreshold;
  }
  public getManageStock(): boolean {
    return this.manageStock;
  }
  public getMetaTitle(): string {
    return this.metaTitle;
  }
  public getMetaDescription(): string {
    return this.metaDescription;
  }
  public getIsActive(): boolean {
    return this.isActive;
  }
  public getCreatedBy(): number {
    return this.createdBy;
  }

  // === SETTERS ===
  public setName(name: string): this {
    this.name = name;
    this.updateTimestamp();
    return this;
  }
  public setSlug(slug: string): this {
    this.slug = slug;
    this.updateTimestamp();
    return this;
  }
  public setSku(sku: string): this {
    this.sku = sku;
    this.updateTimestamp();
    return this;
  }
  public setShortDescription(shortDescription: string): this {
    this.shortDescription = shortDescription;
    this.updateTimestamp();
    return this;
  }
  public setDescription(description: string): this {
    this.description = description;
    this.updateTimestamp();
    return this;
  }
  public setPriceCents(priceCents: number): this {
    this.priceCents = priceCents;
    this.updateTimestamp();
    return this;
  }
  public setTaxRateId(taxRateId: number): this {
    this.taxRateId = taxRateId;
    this.updateTimestamp();
    return this;
  }
  public setStockQuantity(stockQuantity: number): this {
    this.stockQuantity = stockQuantity;
    this.updateTimestamp();
    return this;
  }
  public setLowStockThreshold(lowStockThreshold: number): this {
    this.lowStockThreshold = lowStockThreshold;
    this.updateTimestamp();
    return this;
  }
  public setManageStock(manageStock: boolean): this {
    this.manageStock = manageStock;
    this.updateTimestamp();
    return this;
  }
  public setMetaTitle(metaTitle: string): this {
    this.metaTitle = metaTitle;
    this.updateTimestamp();
    return this;
  }
  public setMetaDescription(metaDescription: string): this {
    this.metaDescription = metaDescription;
    this.updateTimestamp();
    return this;
  }
  public setIsActive(isActive: boolean): this {
    this.isActive = isActive;
    this.updateTimestamp();
    return this;
  }
  public setCreatedBy(createdBy: number): this {
    this.createdBy = createdBy;
    this.updateTimestamp();
    return this;
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      name: this.name,
      slug: this.slug,
      sku: this.sku,
      short_description: this.shortDescription,
      description: this.description,
      price_cents: this.priceCents,
      tax_rate_id: this.taxRateId,
      stock_quantity: this.stockQuantity,
      low_stock_threshold: this.lowStockThreshold,
      manage_stock: this.manageStock,
      meta_title: this.metaTitle,
      meta_description: this.metaDescription,
      is_active: this.isActive,
      created_by: this.createdBy
    };
  }
}
