// src/dtos/products/UpdateProductDto.ts
import { ProductConstants, type UpdateProductSchemaType } from '@/constants';

export class UpdateProductDto {
  public readonly name?: string;
  public readonly slug?: string;
  public readonly sku?: string;
  public readonly shortDescription?: string;
  public readonly description?: string;
  public readonly priceCents?: number;
  public readonly taxRateId?: string;
  public readonly stockQuantity?: number;
  public readonly lowStockThreshold?: number;
  public readonly manageStock?: boolean;
  public readonly metaTitle?: string;
  public readonly metaDescription?: string;
  public readonly isActive?: boolean;

  constructor(data: UpdateProductSchemaType) {
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
  }

  public static fromRequest(data: unknown): UpdateProductDto {
    const validatedData = ProductConstants.validateUpdateProduct(data);
    return new UpdateProductDto(validatedData);
  }

  public toObject(): Record<string, unknown> {
    const obj: Record<string, unknown> = {};

    if (this.name !== undefined) obj.name = this.name;
    if (this.slug !== undefined) obj.slug = this.slug;
    if (this.sku !== undefined) obj.sku = this.sku;
    if (this.shortDescription !== undefined) obj.shortDescription = this.shortDescription;
    if (this.description !== undefined) obj.description = this.description;
    if (this.priceCents !== undefined) obj.priceCents = this.priceCents;
    if (this.taxRateId !== undefined) obj.taxRateId = this.taxRateId;
    if (this.stockQuantity !== undefined) obj.stockQuantity = this.stockQuantity;
    if (this.lowStockThreshold !== undefined) obj.lowStockThreshold = this.lowStockThreshold;
    if (this.manageStock !== undefined) obj.manageStock = this.manageStock;
    if (this.metaTitle !== undefined) obj.metaTitle = this.metaTitle;
    if (this.metaDescription !== undefined) obj.metaDescription = this.metaDescription;
    if (this.isActive !== undefined) obj.isActive = this.isActive;

    return obj;
  }
}
