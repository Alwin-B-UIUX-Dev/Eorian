import type { IEntity } from '@/interfaces';

export interface IProductImages extends IEntity {
  // === GETTERS COMPLETS ===
  getProductId(): number;
  getImageUrl(): string;
  getAltText(): string | null;
  getIsPrimary(): boolean;
  getSortOrder(): number;
  getUploadedBy(): number;
  getUpdatedAt(): Date;
  // === SETTERS COMPLETS ===
  setProductId(productId: number): this;
  setImageUrl(imageUrl: string): this;
  setAltText(altText: string | null): this;
  setIsPrimary(isPrimary: boolean): this;
  setSortOrder(sortOrder: number): this;
  setUploadedBy(uploadedBy: number): this;
  setUpdatedAt(updatedAt: Date): this;
}
