import type { IEntity } from '@/interfaces';
import type { IOrderData } from '@/types';

export interface IOrder extends IEntity {
  getOrderNumber(): string;
  getUserId(): number;
  getShippingAddressId(): number | null;
  getBillingAddressId(): number | null;
  getStatus(): string;
  getSubtotalCents(): number;
  getTaxAmountCents(): number;
  getShippingCents(): number;
  getTotalCents(): number;
  getPaymentStatus(): string;
  getPaymentMethod(): string | null;
  getPaymentReference(): string | null;
  getShippingMethod(): string | null;
  getTrackingNumber(): string | null;
  getCustomerNotes(): string | null;
  getAdminNotes(): string | null;
  getShippedAt(): Date | null;
  getDeliveredAt(): Date | null;
  setStatus(status: string): this;
  setPaymentStatus(paymentStatus: string): this;
  setPaymentMethod(paymentMethod: string | null): this;
  setPaymentReference(paymentReference: string | null): this;
  setShippingMethod(shippingMethod: string | null): this;
  setTrackingNumber(trackingNumber: string | null): this;
  setCustomerNotes(customerNotes: string | null): this;
  setAdminNotes(adminNotes: string | null): this;
  setShippedAt(shippedAt: Date | null): this;
  setDeliveredAt(deliveredAt: Date | null): this;
  toData(): IOrderData;
}
