import type { IProductData } from '@/types/entities/products';

export class ResponseProductDto {
  public readonly productId: string;
  public readonly name: string;
  public readonly slug: string;
  public readonly sku: string | null;
  public readonly shortDescription: string | null;
  public readonly description: string | null;
  public readonly priceCents: number;
  public readonly taxRateId: number;
  public readonly stockQuantity: number;
  public readonly lowStockThreshold: number;
  public readonly manageStock: boolean;
  public readonly metaTitle: string | null;
  public readonly metaDescription: string | null;
  public readonly isActive: boolean;
  public readonly createdBy: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  // fix: Ajout des images manquantes
  public readonly imageUrl: string | null;
  public readonly imageAlt: string | null;

  constructor(data: IProductData) {
    this.productId = data.id;
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
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    // fix: Ajout des images manquantes
    this.imageUrl = data.primaryImageUrl || null;
    this.imageAlt = data.primaryImageAlt || null;
  }
}
