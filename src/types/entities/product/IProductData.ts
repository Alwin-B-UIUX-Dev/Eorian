import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface IProductData extends IBaseEntityData {
  name: string;
  slug: string;
  sku: string;
  short_description: string;
  description: string;
  price_cents: number;
  tax_rate_id: number;
  stock_quantity: number;
  low_stock_threshold: number;
  manage_stock: boolean;
  meta_title: string;
  meta_description: string;
  is_active: boolean;
  created_by: number;
}

export type CreateProductData = WithoutSystemFieldsType<IProductData>;
export type UpdateProductData = PartialWithoutSystemFieldsType<IProductData>;
