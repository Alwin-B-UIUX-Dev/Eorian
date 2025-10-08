import type { IProductImageData } from '@/types';

export class ResponseProductImageDto {
  public readonly productImageId: string;
  public readonly productId: number;
  public readonly imageUrl: string;
  public readonly altText: string | null;
  public readonly isPrimary: boolean;
  public readonly sortOrder: number;
  public readonly uploadedBy: number;
  public readonly uploadedAt: Date;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(data: IProductImageData) {
    this.productImageId = data.id;
    this.productId = data.productId;
    this.imageUrl = data.imageUrl;
    this.altText = data.altText;
    this.isPrimary = data.isPrimary;
    this.sortOrder = data.sortOrder;
    this.uploadedBy = data.uploadedBy;
    this.uploadedAt = data.uploadedAt;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
