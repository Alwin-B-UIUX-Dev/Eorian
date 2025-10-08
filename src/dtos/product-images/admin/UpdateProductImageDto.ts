import { type UpdateProductImageSchemaType, ProductImageConstants } from '@/constants/zod/ProductImageConstants';

export class UpdateProductImageDto {
  public readonly productId?: number;
  public readonly imageUrl?: string;
  public readonly altText?: string | null;
  public readonly isPrimary?: boolean;
  public readonly sortOrder?: number;
  public readonly uploadedBy?: number;

  constructor(data: unknown) {
    const validated: UpdateProductImageSchemaType = ProductImageConstants.validateUpdateProductImage(data);
    if (validated.productId !== undefined) this.productId = validated.productId;
    if (validated.imageUrl !== undefined) this.imageUrl = validated.imageUrl;
    if (validated.altText !== undefined) this.altText = validated.altText;
    if (validated.isPrimary !== undefined) this.isPrimary = validated.isPrimary;
    if (validated.sortOrder !== undefined) this.sortOrder = validated.sortOrder;
    if (validated.uploadedBy !== undefined) this.uploadedBy = validated.uploadedBy;
  }
}
