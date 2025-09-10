import type { IEntity } from '@/interfaces';

export interface IProductImage extends IEntity {
  // === GETTERS COMPLETS ===
  getProductId(): string;
  getImageUrl(): string;
  getAltText(): string;
  getIsPrimary(): boolean;
  getSortOrder(): string;
  getUploadedBy(): string;
  // === SETTERS COMPLETS ===
  setProductId(productId: string): this;
  setImageUrl(imageUrl: string): this;
  setAltText(altText: string): this;
  setIsPrimary(isPrimary: boolean): this;
  setSortOrder(sortOrder: string): this;
  setUploadedBy(uploadedBy: string): this;
}
