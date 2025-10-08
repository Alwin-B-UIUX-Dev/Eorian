import { BaseEntity } from '@/entities';
import type { IProductImage } from '@/interfaces';
import type { IProductImageData } from '@/types';

export class ProductImage extends BaseEntity implements IProductImage {
  private productId: number;
  private imageUrl: string;
  private altText: string | null;
  private primary: boolean;
  private sortOrder: number;
  private uploadedBy: number;

  constructor(data: IProductImageData) {
    super(data);
    this.productId = data.productId;
    this.imageUrl = data.imageUrl;
    this.altText = data.altText;
    this.primary = data.isPrimary;
    this.sortOrder = data.sortOrder;
    this.uploadedBy = data.uploadedBy;
  }

  public getProductId(): number {
    return this.productId;
  }

  public getImageUrl(): string {
    return this.imageUrl;
  }

  public getAltText(): string | null {
    return this.altText;
  }

  public isPrimary(): boolean {
    return this.primary;
  }

  public getSortOrder(): number {
    return this.sortOrder;
  }

  public getUploadedBy(): number {
    return this.uploadedBy;
  }

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

  public setAltText(altText: string | null): this {
    this.altText = altText;
    this.updateTimestamp();
    return this;
  }

  public setPrimary(isPrimary: boolean): this {
    this.primary = isPrimary;
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
      productImageId: this.id,
      productId: this.productId,
      imageUrl: this.imageUrl,
      altText: this.altText,
      isPrimary: this.primary,
      sortOrder: this.sortOrder,
      uploadedBy: this.uploadedBy
    };
  }

  /**
   * Retourne les données de l'entité dans le format IProductImageData
   * pour être utilisé par les DTOs
   */
  public toData(): IProductImageData {
    return {
      id: this.id,
      productId: this.productId,
      imageUrl: this.imageUrl,
      altText: this.altText,
      isPrimary: this.primary,
      sortOrder: this.sortOrder,
      uploadedBy: this.uploadedBy,
      uploadedAt: this.createdAt, // uploadedAt est mappé sur createdAt
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
