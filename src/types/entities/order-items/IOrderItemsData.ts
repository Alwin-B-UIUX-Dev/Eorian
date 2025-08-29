import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface IOrderItemsData extends IBaseEntityData {
  productId: number;
  orderId: number;
  productName: string;
  productSku: string;
  unitPriceCents: number;
  taxRate: number;
  quantity: number;
  lineSubtotalCents: number;
  lineTaxCents: number;
  lineTotalCents: number;
}

export type CreateOrderItemsData = WithoutSystemFieldsType<IOrderItemsData>;
export type UpdateOrderItemsData = PartialWithoutSystemFieldsType<IOrderItemsData>;
