import { BaseEntity } from '@/entities/BaseEntity';
import type { IProduct } from '@/interfaces';
import type { IProductData } from '@/types';

export class Product extends BaseEntity implements IProduct {
  private name: string;
  private slug: string;
  private sku: string;
  private shortDescription: string;
  private description: string;
  private priceCents: string;
  private taxRateId: string;
  private stockQuantity: string;
  private lowStockThreshold: string;
  private manageStock: boolean;
  private metaTitle: string;
  private metaDescription: string;
  private isActive: boolean;
  private createdBy: string;

  constructor(data: IProductData) {
    super(data, 'productId');
    this.name = data.name;
    this.slug = data.slug;
    this.sku = data.sku;
    this.shortDescription = data.shortDescription;
    this.description = data.description;
    this.priceCents = data.priceCents;
    this.taxRateId = data.taxRateId;
    this.stockQuantity = data.stockQuantity;
    this.lowStockThreshold = data.lowStockThreshold;
    this.manageStock = data.manageStock;
    this.metaTitle = data.metaTitle;
    this.metaDescription = data.metaDescription;
    this.isActive = data.isActive;
    this.createdBy = data.createdBy;
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
  public getPriceCents(): string {
    return this.priceCents;
  }
  public getTaxRateId(): string {
    return this.taxRateId;
  }
  public getStockQuantity(): string {
    return this.stockQuantity;
  }
  public getLowStockThreshold(): string {
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
  public getCreatedBy(): string {
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

  public setPriceCents(priceCents: string): this {
    this.priceCents = priceCents;
    this.updateTimestamp();
    return this;
  }

  public setTaxRateId(taxRateId: string): this {
    this.taxRateId = taxRateId;
    this.updateTimestamp();
    return this;
  }

  public setStockQuantity(stockQuantity: string): this {
    this.stockQuantity = stockQuantity;
    this.updateTimestamp();
    return this;
  }
  public setLowStockThreshold(lowStockThreshold: string): this {
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

  public setCreatedBy(createBy: string): this {
    this.createdBy = createBy;
    this.updateTimestamp();
    return this;
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      productId: this.id,
      name: this.name,
      slug: this.slug,
      sku: this.sku,
      shortDescription: this.shortDescription,
      description: this.description,
      priceCents: this.priceCents,
      taxRateId: this.taxRateId,
      stockQuantity: this.stockQuantity,
      lowStockThreshold: this.lowStockThreshold,
      manageStock: this.manageStock,
      metaTitle: this.metaTitle,
      metaDescription: this.metaDescription,
      isActive: this.isActive,
      createdBy: this.createdBy
    };
  }
}
