import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface IProductData extends IBaseEntityData {
  name: string;
  slug: string;
  sku: string | null;
  shortDescription: string | null;
  description: string | null;
  priceCents: number;
  taxRateId: number;
  stockQuantity: number;
  lowStockThreshold: number;
  manageStock: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  isActive: boolean;
  createdBy: number;
  primaryImageUrl?: string | null;
  primaryImageAlt?: string | null;
}

export type CreateProductData = WithoutSystemFieldsType<IProductData>;
export type UpdateProductData = PartialWithoutSystemFieldsType<IProductData>;
