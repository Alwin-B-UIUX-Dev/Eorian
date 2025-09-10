import type { IEntity } from '@/interfaces';

export interface IOrder extends IEntity {
  // === GETTERS COMPLETS ===
  getOrderNumber(): string;
  getUserId(): string;
  getShippingAddressId(): string;
  getBillingAddressId(): string;
  getStatus(): string;
  getSubtotalCents(): string;
  getTaxAmountCents(): string;
  getShippingCents(): string;
  getTotalCents(): string;
  getPaymentStatus(): string;
  getPaymentMethod(): string;
  getPaymentReference(): string;
  getShippingMethod(): string;
  getTrackingNumber(): string;
  getCustomerNotes(): string;
  getAdminNotes(): string;
  getShippedAt(): Date;
  getDeliveredAt(): Date;
  // === SETTERS COMPLETS ===
  setOrderNumber(orderNumber: string): this;
  setUserId(userId: string): this;
  setShippingAddressId(shippingAddressId: string): this;
  setBillingAddressId(billingAddressId: string): this;
  setStatus(status: string): this;
  setSubtotalCents(subtotalCents: string): this;
  setTaxAmountCents(taxAmountCents: string): this;
  setShippingCents(shippingCents: string): this;
  setTotalCents(totalCents: string): this;
  setPaymentStatus(paymentStatus: string): this;
  setPaymentMethod(paymentMethod: string): this;
  setPaymentReference(paymentReference: string): this;
  setShippingMethod(shippingMethod: string): this;
  setTrackingNumber(trackingNumber: string): this;
  setCustomerNotes(customerNotes: string): this;
  setAdminNotes(adminNotes: string): this;
  setShippedAt(shippedAt: Date): this;
  setDeliveredAt(deliveredAt: Date): this;
}
