import { BaseEntity } from '@/entities';
import type { IOrder } from '@/interfaces';
import type { IOrderData } from '@/types';

export class Order extends BaseEntity implements IOrder {
  private orderNumber: string;
  private userId: number;
  private shippingAddressId: number | null;
  private billingAddressId: number | null;
  private status: string;
  private subtotalCents: number;
  private taxAmountCents: number;
  private shippingCents: number;
  private totalCents: number;
  private paymentStatus: string;
  private paymentMethod: string | null;
  private paymentReference: string | null;
  private shippingMethod: string | null;
  private trackingNumber: string | null;
  private customerNotes: string | null;
  private adminNotes: string | null;
  private shippedAt: Date | null;
  private deliveredAt: Date | null;

  constructor(data: IOrderData) {
    super(data);
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

  public getOrderNumber(): string {
    return this.orderNumber;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getShippingAddressId(): number | null {
    return this.shippingAddressId;
  }

  public getBillingAddressId(): number | null {
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

  public getPaymentMethod(): string | null {
    return this.paymentMethod;
  }

  public getPaymentReference(): string | null {
    return this.paymentReference;
  }

  public getShippingMethod(): string | null {
    return this.shippingMethod;
  }

  public getTrackingNumber(): string | null {
    return this.trackingNumber;
  }

  public getCustomerNotes(): string | null {
    return this.customerNotes;
  }

  public getAdminNotes(): string | null {
    return this.adminNotes;
  }

  public getShippedAt(): Date | null {
    return this.shippedAt;
  }

  public getDeliveredAt(): Date | null {
    return this.deliveredAt;
  }

  public setStatus(status: string): this {
    this.status = status;
    this.updateTimestamp();
    return this;
  }

  public setPaymentStatus(paymentStatus: string): this {
    this.paymentStatus = paymentStatus;
    this.updateTimestamp();
    return this;
  }

  public setPaymentMethod(paymentMethod: string | null): this {
    this.paymentMethod = paymentMethod;
    this.updateTimestamp();
    return this;
  }

  public setPaymentReference(paymentReference: string | null): this {
    this.paymentReference = paymentReference;
    this.updateTimestamp();
    return this;
  }

  public setShippingMethod(shippingMethod: string | null): this {
    this.shippingMethod = shippingMethod;
    this.updateTimestamp();
    return this;
  }

  public setTrackingNumber(trackingNumber: string | null): this {
    this.trackingNumber = trackingNumber;
    this.updateTimestamp();
    return this;
  }

  public setCustomerNotes(customerNotes: string | null): this {
    this.customerNotes = customerNotes;
    this.updateTimestamp();
    return this;
  }

  public setAdminNotes(adminNotes: string | null): this {
    this.adminNotes = adminNotes;
    this.updateTimestamp();
    return this;
  }

  public setShippedAt(shippedAt: Date | null): this {
    this.shippedAt = shippedAt;
    this.updateTimestamp();
    return this;
  }

  public setDeliveredAt(deliveredAt: Date | null): this {
    this.deliveredAt = deliveredAt;
    this.updateTimestamp();
    return this;
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      orderId: this.id,
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

  /**
   * Retourne les données de l'entité dans le format IOrderData
   * pour être utilisé par les DTOs
   */
  public toData(): IOrderData {
    return {
      id: this.id,
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
      deliveredAt: this.deliveredAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
