import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType,
} from "@/types";

export interface IProductData extends IBaseEntityData {
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  priceCents: string;
  taxRateId: string;
  stockQuantity: string;
  lowStockThreshold: string;
  manageStock: boolean;
  metaTitle: string;
  metaDescription: string;
  isActive: boolean;
  createdBy: string;
}

export type CreateProductData = WithoutSystemFieldsType<IProductData>;
export type UpdateProductData = PartialWithoutSystemFieldsType<IProductData>;
