import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface IOrderItemsData extends IBaseEntityData {
  productId: number | null;
  orderId: number;
  productName: string;
  productSku: string | null;
  unitPriceCents: number;
  taxRate: number;
  quantity: number;
  lineSubtotalCents: number;
  lineTaxCents: number;
  lineTotalCents: number;
}

export type CreateOrderItemsData = WithoutSystemFieldsType<IOrderItemsData>;
export type UpdateOrderItemsData = PartialWithoutSystemFieldsType<IOrderItemsData>;
