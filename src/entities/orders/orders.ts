import type { IOrders } from '@/interfaces';
import type { IOrdersData } from '@/types';
import { BaseEntity } from '../BaseEntity';

export class Orders extends BaseEntity implements IOrders {
  private orderNumber: string;
  private userId: number;
  private shippingAddressId: number;
  private billingAddressId: number;
  private status: string;
  private subtotalCents: number;
  private taxAmountCents: number;
  private shippingCents: number;
  private totalCents: number;
  private paymentStatus: string;
  private paymentMethod: string;
  private paymentReference: string;
  private shippingMethod: string;
  private trackingNumber: string;
  private customerNotes: string;
  private adminNotes: string;
  private shippedAt: Date;
  private deliveredAt: Date;

  constructor(data: IOrdersData) {
    super(data, 'orderId');
    this.orderNumber = data.orderNumber;
    this.userId = data.userId;
    this.shippingAddressId = data.shippingAddressId;
    this.billingAddressId = data.billingAddressId;
    this.status = data.status;
    this.subtotalCents = data.subtotalCents;
    this.taxAmountCents = data.taxAmountCents;
    this.shippingCents = data.shippingCents;
    this.totalCents = data.totalCents;
    this.paymentStatus = data.paymentStatus;
    this.paymentMethod = data.paymentMethod;
    this.paymentReference = data.paymentReference;
    this.shippingMethod = data.shippingMethod;
    this.trackingNumber = data.trackingNumber;
    this.customerNotes = data.customerNotes;
    this.adminNotes = data.adminNotes;
    this.shippedAt = data.shippedAt;
    this.deliveredAt = data.deliveredAt;
  }

  // === GETTERS ===

  public getOrderNumber(): string {
    return this.orderNumber;
  }
  public getUserId(): number {
    return this.userId;
  }
  public getShippingAddressId(): number {
    return this.shippingAddressId;
  }
  public getBillingAddressId(): number {
    return this.billingAddressId;
  }
  public getStatus(): string {
    return this.status;
  }
  public getSubtotalCents(): number {
    return this.subtotalCents;
  }
  public getTaxAmountCents(): number {
    return this.taxAmountCents;
  }
  public getShippingCents(): number {
    return this.shippingCents;
  }
  public getTotalCents(): number {
    return this.totalCents;
  }
  public getPaymentStatus(): string {
    return this.paymentStatus;
  }
  public getPaymentMethod(): string {
    return this.paymentMethod;
  }
  public getPaymentReference(): string {
    return this.paymentReference;
  }
  public getShippingMethod(): string {
    return this.shippingMethod;
  }
  public getTrackingNumber(): string {
    return this.trackingNumber;
  }
  public getCustomerNotes(): string {
    return this.customerNotes;
  }
  public getAdminNotes(): string {
    return this.adminNotes;
  }
  public getShippedAt(): Date {
    return this.shippedAt;
  }
  public getDeliveredAt(): Date {
    return this.deliveredAt;
  }

  // === SETTERS ===

  public setOrderNumber(orderNumber: string): this {
    this.orderNumber = orderNumber;
    this.updateTimestamp();
    return this;
  }
  public setUserId(userId: number): this {
    this.userId = userId;
    this.updateTimestamp();
    return this;
  }
  public setShippingAddressId(shippingAddressId: number): this {
    this.shippingAddressId = shippingAddressId;
    this.updateTimestamp();
    return this;
  }
  public setBillingAddressId(billingAddressId: number): this {
    this.billingAddressId = billingAddressId;
    this.updateTimestamp();
    return this;
  }
  public setStatus(status: string): this {
    this.status = status;
    this.updateTimestamp();
    return this;
  }
  public setSubtotalCents(subtotalCents: number): this {
    this.subtotalCents = subtotalCents;
    this.updateTimestamp();
    return this;
  }
  public setTaxAmountCents(taxAmountCents: number): this {
    this.taxAmountCents = taxAmountCents;
    this.updateTimestamp();
    return this;
  }
  public setShippingCents(shippingCents: number): this {
    this.shippingCents = shippingCents;
    this.updateTimestamp();
    return this;
  }
  public setTotalCents(totalCents: number): this {
    this.totalCents = totalCents;
    this.updateTimestamp();
    return this;
  }
  public setPaymentStatus(paymentStatus: string): this {
    this.paymentStatus = paymentStatus;
    this.updateTimestamp();
    return this;
  }
  public setPaymentMethod(paymentMethod: string): this {
    this.paymentMethod = paymentMethod;
    this.updateTimestamp();
    return this;
  }
  public setPaymentReference(paymentReference: string): this {
    this.paymentReference = paymentReference;
    this.updateTimestamp();
    return this;
  }
  public setShippingMethod(shippingMethod: string): this {
    this.shippingMethod = shippingMethod;
    this.updateTimestamp();
    return this;
  }
  public setTrackingNumber(trackingNumber: string): this {
    this.trackingNumber = trackingNumber;
    this.updateTimestamp();
    return this;
  }
  public setCustomerNotes(customerNotes: string): this {
    this.customerNotes = customerNotes;
    this.updateTimestamp();
    return this;
  }
  public setAdminNotes(adminNotes: string): this {
    this.adminNotes = adminNotes;
    this.updateTimestamp();
    return this;
  }
  public setShippedAt(shippedAt: Date): this {
    this.shippedAt = shippedAt;
    this.updateTimestamp();
    return this;
  }
  public setDeliveredAt(deliveredAt: Date): this {
    this.deliveredAt = deliveredAt;
    this.updateTimestamp();
    return this;
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      orderNumber: this.orderNumber,
      userId: this.userId,
      shippingAddressId: this.shippingAddressId,
      billingAddressId: this.billingAddressId,
      status: this.status,
      subtotalCents: this.subtotalCents,
      taxAmountCents: this.taxAmountCents,
      shippingCents: this.shippingCents,
      totalCents: this.totalCents,
      paymentStatus: this.paymentStatus,
      paymentMethod: this.paymentMethod,
      paymentReference: this.paymentReference,
      shippingMethod: this.shippingMethod,
      trackingNumber: this.trackingNumber,
      customerNotes: this.customerNotes,
      adminNotes: this.adminNotes,
      shippedAt: this.shippedAt,
      deliveredAt: this.deliveredAt
    };
  }
}
