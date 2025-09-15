// src/types/entities/products/IProductData.ts
import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface IProductData extends IBaseEntityData {
  name: string;
  slug: string;
  sku?: string;
  shortDescription?: string;
  description?: string;
  priceCents: number;
  taxRateId: string;
  stockQuantity: number;
  lowStockThreshold: number;
  manageStock: boolean;
  metaTitle?: string;
  metaDescription?: string;
  isActive: boolean;
  createdBy: string;
}

export type CreateProductData = WithoutSystemFieldsType<IProductData>;
export type UpdateProductData = PartialWithoutSystemFieldsType<IProductData>;
