import { BaseEntity } from '@/entities';
import type { IProduct } from '@/interfaces';
import type { IProductData } from '@/types';

export class Product extends BaseEntity implements IProduct {
  private name: string;
  private slug: string;
  private sku: string | null;
  private shortDescription: string | null;
  private description: string | null;
  private priceCents: number;
  private taxRateId: number;
  private stockQuantity: number;
  private lowStockThreshold: number;
  private manageStock: boolean;
  private metaTitle: string | null;
  private metaDescription: string | null;
  private active: boolean;
  private createdBy: number;
  private primaryImageUrl: string | null;
  private primaryImageAlt: string | null;

  constructor(data: IProductData) {
    super(data);
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
    this.active = data.isActive;
    this.createdBy = data.createdBy;
    this.primaryImageUrl = data.primaryImageUrl || null;
    this.primaryImageAlt = data.primaryImageAlt || null;
  }

  public getName(): string {
    return this.name;
  }

  public getSlug(): string {
    return this.slug;
  }

  public getSku(): string | null {
    return this.sku;
  }

  public getShortDescription(): string | null {
    return this.shortDescription;
  }

  public getDescription(): string | null {
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

  public getMetaTitle(): string | null {
    return this.metaTitle;
  }

  public getMetaDescription(): string | null {
    return this.metaDescription;
  }

  public isActive(): boolean {
    return this.active;
  }

  public getCreatedBy(): number {
    return this.createdBy;
  }

  public getPrimaryImageUrl(): string | null {
    return this.primaryImageUrl;
  }

  public getPrimaryImageAlt(): string | null {
    return this.primaryImageAlt;
  }


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

  public setSku(sku: string | null): this {
    this.sku = sku;
    this.updateTimestamp();
    return this;
  }

  public setShortDescription(shortDescription: string | null): this {
    this.shortDescription = shortDescription;
    this.updateTimestamp();
    return this;
  }

  public setDescription(description: string | null): this {
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

  public setMetaTitle(metaTitle: string | null): this {
    this.metaTitle = metaTitle;
    this.updateTimestamp();
    return this;
  }

  public setMetaDescription(metaDescription: string | null): this {
    this.metaDescription = metaDescription;
    this.updateTimestamp();
    return this;
  }

  public setActive(isActive: boolean): this {
    this.active = isActive;
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
      isActive: this.active,
      createdBy: this.createdBy
    };
  }

  /**
   * Retourne les données de l'entité dans le format IProductData
   * pour être utilisé par les DTOs
   */
  public toData(): IProductData {
    return {
      id: this.id,
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
      isActive: this.active,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      // Ajout des images manquantes 
      primaryImageUrl: this.primaryImageUrl,
      primaryImageAlt: this.primaryImageAlt
    };
  }
}
