import { BaseEntity } from '@/entities';
import type { IProductImage } from '@/interfaces';
import type { IProductImageData } from '@/types';

export class ProductImage extends BaseEntity implements IProductImage {
  private productId: string;
  private imageUrl: string;
  private altText: string;
  private isPrimary: boolean;
  private sortOrder: string;
  private uploadedBy: string;

  constructor(data: IProductImageData) {
    super(data, 'productImageId');
    this.productId = data.productId;
    this.imageUrl = data.imageUrl;
    this.altText = data.altText;
    this.isPrimary = data.isPrimary;
    this.sortOrder = data.sortOrder;
    this.uploadedBy = data.uploadedBy;
  }

  // === GETTERS ===
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

  // === SETTERS ===
  public setProductId(productId: string): this {
    this.productId = productId;
    this.updateTimestamp();
    return this;
  }
  public setImageUrl(imageUrl: string): this {
    this.imageUrl = imageUrl;
    this.updateTimestamp();
    return this;
  }
  public setAltText(altText: string): this {
    this.altText = altText;
    this.updateTimestamp();
    return this;
  }
  public setIsPrimary(isPrimary: boolean): this {
    this.isPrimary = isPrimary;
    this.updateTimestamp();
    return this;
  }
  public setSortOrder(sortOrder: string): this {
    this.sortOrder = sortOrder;
    this.updateTimestamp();
    return this;
  }
  public setUploadedBy(uploadedBy: string): this {
    this.uploadedBy = uploadedBy;
    this.updateTimestamp();
    return this;
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      productId: this.productId,
      imageUrl: this.imageUrl,
      altText: this.altText,
      isPrimary: this.isPrimary,
      sortOrder: this.sortOrder,
      uploadedBy: this.uploadedBy
    };
  }
}
