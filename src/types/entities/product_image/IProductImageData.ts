import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface IProductImageData extends IBaseEntityData {
  productId: string;
  imageUrl: string;
  altText: string;
  isPrimary: boolean;
  sortOrder: string;
  uploadedBy: string;
}

export type CreateProductImageData = WithoutSystemFieldsType<IProductImageData>;
export type UpdateProductImageData = PartialWithoutSystemFieldsType<IProductImageData>;
