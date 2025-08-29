import type { IEntity } from '@/interfaces';

export interface IProductImages extends IEntity {
  // === GETTERS COMPLETS ===
  getProductId(): number;
  getImageUrl(): string;
  getAltText(): string;
  getIsPrimary(): boolean;
  getSortOrder(): number;
  getUploadedBy(): number;
  // === SETTERS COMPLETS ===
  setProductId(productId: number): this;
  setImageUrl(imageUrl: string): this;
  setAltText(altText: string): this;
  setIsPrimary(isPrimary: boolean): this;
  setSortOrder(sortOrder: number): this;
  setUploadedBy(uploadedBy: number): this;
}
