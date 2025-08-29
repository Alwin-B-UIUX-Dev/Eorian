import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface IOrdersData extends IBaseEntityData {
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

export type CreateOrdersData = WithoutSystemFieldsType<IOrdersData>;
export type UpdateOrdersData = PartialWithoutSystemFieldsType<IOrdersData>;
