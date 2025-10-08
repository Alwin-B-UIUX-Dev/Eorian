import type { IEntity } from '@/interfaces';
import type { IProductImageData } from '@/types';

export interface IProductImage extends IEntity {
  getProductId(): number;
  getImageUrl(): string;
  getAltText(): string | null;
  isPrimary(): boolean;
  getSortOrder(): number;
  getUploadedBy(): number;
  
  setProductId(productId: number): this;
  setImageUrl(imageUrl: string): this;
  setAltText(altText: string | null): this;
  setPrimary(isPrimary: boolean): this;
  setSortOrder(sortOrder: number): this;
  setUploadedBy(uploadedBy: number): this;
  
  toData(): IProductImageData;
}
