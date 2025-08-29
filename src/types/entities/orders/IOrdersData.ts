import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface IOrdersData extends IBaseEntityData {
  orderNumber: string;
  userId: number;
  shippingAddressId: number;
  billingAddressId: number;
  status: string;
  subtotalCents: number;
  taxAmountCents: number;
  shippingCents: number;
  totalCents: number;
  paymentStatus: string;
  paymentMethod: string;
  paymentReference: string;
  shippingMethod: string;
  trackingNumber: string;
  customerNotes: string;
  adminNotes: string;
  shippedAt: Date;
  deliveredAt: Date;
}

export type CreateOrdersData = WithoutSystemFieldsType<IOrdersData>;
export type UpdateOrdersData = PartialWithoutSystemFieldsType<IOrdersData>;
