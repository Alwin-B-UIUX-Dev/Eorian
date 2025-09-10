import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface IOrderData extends IBaseEntityData {
  orderNumber: string;
  userId: string;
  shippingAddressId: string;
  billingAddressId: string;
  status: string;
  subtotalCents: string;
  taxAmountCents: string;
  shippingCents: string;
  totalCents: string;
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

export type CreateOrderData = WithoutSystemFieldsType<IOrderData>;
export type UpdateOrderData = PartialWithoutSystemFieldsType<IOrderData>;
