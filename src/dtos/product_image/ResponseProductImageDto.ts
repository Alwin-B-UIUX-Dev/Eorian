import { ProductImageConstants, type ResponseProductImageSchemaType } from '@/constants';
import type { IProductImage } from '@/interfaces';

export class ResponseProductImageDto {
  static fromProductImage(ProductImage: IProductImage): ResponseProductImageDto {
    throw new Error('Method not implemented.');
  }
  public readonly productId: string;
  public readonly imageUrl: string;
  public readonly altText: string;
  public readonly isPrimary: boolean;
  public readonly sortOrder: string;
  public readonly uploadedBy: string;

  constructor(data: unknown) {
    const validated: ResponseProductImageSchemaType =
      ProductImageConstants.validateResponseProductImage(data);
    this.productId = validated.productId;
    this.imageUrl = validated.imageUrl;
    this.altText = validated.altText;
    this.isPrimary = validated.isPrimary;
    this.sortOrder = validated.sortOrder;
    this.uploadedBy = validated.uploadedBy;
  }

  // Getters
  public getProductId(): string {
    return this.productId;
  }
  public getImageUrl(): string {
    return this.imageUrl;
  }
  public getAltText(): string {
    return this.altText;
  }
  public getIsPrimary(): boolean {
    return this.isPrimary;
  }
  public getSortOrder(): string {
    return this.sortOrder;
  }
  public getUploadedBy(): string {
    return this.uploadedBy;
  }
}
