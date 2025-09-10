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
  price_cents: string;
  tax_rate_id: string;
  stock_quantity: string;
  low_stock_threshold: string;
  manage_stock: boolean;
  meta_title: string;
  meta_description: string;
  is_active: boolean;
  created_by: string;
}

export type CreateProductData = WithoutSystemFieldsType<IProductData>;
export type UpdateProductData = PartialWithoutSystemFieldsType<IProductData>;
