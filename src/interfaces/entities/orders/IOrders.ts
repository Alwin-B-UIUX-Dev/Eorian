import type { IEntity } from '@/interfaces';

export interface IOrders extends IEntity {
  // === GETTERS COMPLETS ===
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
  // === SETTERS COMPLETS ===
  setOrderNumber(orderNumber: string): this;
  setUserId(userId: number): this;
  setShippingAddressId(shippingAddressId: number | null): this;
  setBillingAddressId(billingAddressId: number | null): this;
  setStatus(status: string): this;
  setSubtotalCents(subtotalCents: number): this;
  setTaxAmountCents(taxAmountCents: number): this;
  setShippingCents(shippingCents: number): this;
  setTotalCents(totalCents: number): this;
  setPaymentStatus(paymentStatus: string): this;
  setPaymentMethod(paymentMethod: string | null): this;
  setPaymentReference(paymentReference: string | null): this;
  setShippingMethod(shippingMethod: string | null): this;
  setTrackingNumber(trackingNumber: string | null): this;
  setCustomerNotes(customerNotes: string | null): this;
  setAdminNotes(adminNotes: string | null): this;
  setShippedAt(shippedAt: Date | null): this;
  setDeliveredAt(deliveredAt: Date | null): this;
}
