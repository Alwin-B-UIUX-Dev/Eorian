import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface IOrdersData extends IBaseEntityData {
  orderNumber: string;
  userId: number;
  shippingAddressId: number | null;
  billingAddressId: number | null;
  status: string;
  subtotalCents: number;
  taxAmountCents: number;
  shippingCents: number;
  totalCents: number;
  paymentStatus: string;
  paymentMethod: string | null;
  paymentReference: string | null;
  shippingMethod: string | null;
  trackingNumber: string | null;
  customerNotes: string | null;
  adminNotes: string | null;
  shippedAt: Date | null;
  deliveredAt: Date | null;
}

export type CreateOrdersData = WithoutSystemFieldsType<IOrdersData>;
export type UpdateOrdersData = PartialWithoutSystemFieldsType<IOrdersData>;
