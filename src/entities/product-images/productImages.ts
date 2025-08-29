import type { IProductImages } from '@/interfaces';
import type { IProductImagesData } from '@/types';
import { BaseEntity } from '../BaseEntity';

export class ProductImages extends BaseEntity implements IProductImages {
  private productId: number;
  private imageUrl: string;
  private altText: string;
  private isPrimary: boolean;
  private sortOrder: number;
  private uploadedBy: number;

  constructor(data: IProductImagesData) {
    super(data, 'productImageId');
    this.productId = data.productId;
    this.imageUrl = data.imageUrl;
    this.altText = data.altText;
    this.isPrimary = data.isPrimary;
    this.sortOrder = data.sortOrder;
    this.uploadedBy = data.uploadedBy;
  }

  // === GETTERS ===
  public getProductId(): number {
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
  public getSortOrder(): number {
    return this.sortOrder;
  }
  public getUploadedBy(): number {
    return this.uploadedBy;
  }

  // === SETTERS ===
  public setProductId(productId: number): this {
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
  public setSortOrder(sortOrder: number): this {
    this.sortOrder = sortOrder;
    this.updateTimestamp();
    return this;
  }
  public setUploadedBy(uploadedBy: number): this {
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
