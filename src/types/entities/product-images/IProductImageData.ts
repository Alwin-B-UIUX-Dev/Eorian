import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface IProductImageData extends IBaseEntityData {
  productId: number;
  imageUrl: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
  uploadedBy: number;
  uploadedAt: Date;
}

export type CreateProductImageData = WithoutSystemFieldsType<IProductImageData>;
export type UpdateProductImageData = PartialWithoutSystemFieldsType<IProductImageData>;
