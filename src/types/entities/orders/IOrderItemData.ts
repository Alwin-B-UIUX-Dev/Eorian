import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface IOrderItemData extends IBaseEntityData {
  orderId: number;
  productId: number | null;
  productName: string;
  productSku: string | null;
  unitPriceCents: number;
  taxRate: number;
  quantity: number;
  lineSubtotalCents: number;
  lineTaxCents: number;
  lineTotalCents: number;
}

export type CreateOrderItemData = WithoutSystemFieldsType<IOrderItemData>;
export type UpdateOrderItemData = PartialWithoutSystemFieldsType<IOrderItemData>;
