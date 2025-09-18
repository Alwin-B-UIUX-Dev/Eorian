import { type CreateProductSchemaType, ProductConstants } from '@/constants/zod/ProductConstants';

export class CreateProductDto {
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

  constructor(data: unknown) {
    const validated: CreateProductSchemaType = ProductConstants.validateCreateProduct(data);
    this.name = validated.name;
    this.slug = validated.slug;
    this.sku = validated.sku ?? null;
    this.shortDescription = validated.shortDescription ?? null;
    this.description = validated.description ?? null;
    this.priceCents = validated.priceCents;
    this.taxRateId = validated.taxRateId;
    this.stockQuantity = validated.stockQuantity;
    this.lowStockThreshold = validated.lowStockThreshold;
    this.manageStock = validated.manageStock;
    this.metaTitle = validated.metaTitle ?? null;
    this.metaDescription = validated.metaDescription ?? null;
    this.isActive = validated.isActive;
    this.createdBy = validated.createdBy;
  }
}
