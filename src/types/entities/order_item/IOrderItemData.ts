import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface IOrderItemData extends IBaseEntityData {
  productId: string;
  orderId: string;
  productName: string;
  productSku: string;
  unitPriceCents: string;
  taxRate: string;
  quantity: string;
  lineSubtotalCents: string;
  lineTaxCents: string;
  lineTotalCents: string;
}

export type CreateOrderItemData = WithoutSystemFieldsType<IOrderItemData>;
export type UpdateOrderItemData = PartialWithoutSystemFieldsType<IOrderItemData>;
