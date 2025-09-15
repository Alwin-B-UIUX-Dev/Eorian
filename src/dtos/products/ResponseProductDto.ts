// src/dtos/products/ResponseProductDto.ts
import { ProductConstants, type ResponseProductSchemaType } from '@/constants';
import type { IProduct } from '@/interfaces';

export class ResponseProductDto {
  public readonly id: string;
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
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(data: ResponseProductSchemaType) {
    this.id = data.id;
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
  }

  public static fromEntity(product: IProduct): ResponseProductDto {
    const data: ResponseProductSchemaType = {
      id: product.getId(),
      name: product.getName(),
      slug: product.getSlug(),
      sku: product.getSku(),
      shortDescription: product.getShortDescription(),
      description: product.getDescription(),
      priceCents: product.getPriceCents(),
      taxRateId: product.getTaxRateId(),
      stockQuantity: product.getStockQuantity(),
      lowStockThreshold: product.getLowStockThreshold(),
      manageStock: product.getManageStock(),
      metaTitle: product.getMetaTitle(),
      metaDescription: product.getMetaDescription(),
      isActive: product.getIsActive(),
      createdBy: product.getCreatedBy(),
      createdAt: product.getCreatedAt(),
      updatedAt: product.getUpdatedAt()
    };

    return new ResponseProductDto(data);
  }

  public static fromRequest(data: unknown): ResponseProductDto {
    const validatedData = ProductConstants.validateResponseProduct(data);
    return new ResponseProductDto(validatedData);
  }

  public toObject(): Record<string, unknown> {
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
      isActive: this.isActive,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
