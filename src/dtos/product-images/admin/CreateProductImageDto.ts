import { type CreateProductImageSchemaType, ProductImageConstants } from '@/constants/zod/ProductImageConstants';

export class CreateProductImageDto {
  public readonly productId: number;
  public readonly imageUrl: string;
  public readonly altText: string | null;
  public readonly isPrimary: boolean;
  public readonly sortOrder: number;
  public readonly uploadedBy: number;

  constructor(data: unknown) {
    const validated: CreateProductImageSchemaType = ProductImageConstants.validateCreateProductImage(data);
    this.productId = validated.productId;
    this.imageUrl = validated.imageUrl;
    this.altText = validated.altText ?? null;
    this.isPrimary = validated.isPrimary;
    this.sortOrder = validated.sortOrder;
    this.uploadedBy = validated.uploadedBy;
  }
}
