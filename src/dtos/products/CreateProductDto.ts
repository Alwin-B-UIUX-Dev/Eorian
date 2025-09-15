// src/dtos/products/CreateProductDto.ts
import { type CreateProductSchemaType, ProductConstants } from '@/constants';

export class CreateProductDto {
  public readonly name: string;
  public readonly slug: string;
  public readonly sku?: string;
  public readonly shortDescription?: string;
  public readonly description?: string;
  public readonly priceCents: number;
  public readonly taxRateId: string;
  public readonly stockQuantity: number;
  public readonly lowStockThreshold: number;
  public readonly manageStock: boolean;
  public readonly metaTitle?: string;
  public readonly metaDescription?: string;
  public readonly isActive: boolean;
  public readonly createdBy: string;

  constructor(data: CreateProductSchemaType) {
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

  public static fromRequest(data: unknown): CreateProductDto {
    const validatedData = ProductConstants.validateCreateProduct(data);
    return new CreateProductDto(validatedData);
  }

  public toObject(): Record<string, unknown> {
    return {
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
