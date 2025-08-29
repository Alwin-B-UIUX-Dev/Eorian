import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface IProductImagesData extends IBaseEntityData {
  productId: number;
  imageUrl: string;
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
  uploadedBy: number;
  updatedAt: Date;
}

export type CreateProductImagesData = WithoutSystemFieldsType<IProductImagesData>;
export type UpdateProductImagesData = PartialWithoutSystemFieldsType<IProductImagesData>;
