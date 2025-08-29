import type { IEntity } from '@/interfaces';

export interface IOrders extends IEntity {
  // === GETTERS COMPLETS ===
  getOrderNumber(): string;
  getUserId(): number;
  getShippingAddressId(): number;
  getBillingAddressId(): number;
  getStatus(): string;
  getSubtotalCents(): number;
  getTaxAmountCents(): number;
  getShippingCents(): number;
  getTotalCents(): number;
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
  setUserId(userId: number): this;
  setShippingAddressId(shippingAddressId: number): this;
  setBillingAddressId(billingAddressId: number): this;
  setStatus(status: string): this;
  setSubtotalCents(subtotalCents: number): this;
  setTaxAmountCents(taxAmountCents: number): this;
  setShippingCents(shippingCents: number): this;
  setTotalCents(totalCents: number): this;
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
