import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface IOrderData extends IBaseEntityData {
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

export type CreateOrderData = WithoutSystemFieldsType<IOrderData>;
export type UpdateOrderData = PartialWithoutSystemFieldsType<IOrderData>;
