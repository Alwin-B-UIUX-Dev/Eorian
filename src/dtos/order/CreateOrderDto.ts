import { type CreateOrderSchemaType, OrderConstants } from '@/constants';

export class CreateOrderDto {
  public readonly orderNumber: string;
  public readonly userId: string;
  public readonly shippingAddressId: string;
  public readonly billingAddressId: string;
  public readonly status: string;
  public readonly subtotalCents: string;
  public readonly taxAmountCents: string;
  public readonly shippingCents: string;
  public readonly totalCents: string;
  public readonly paymentStatus: string;
  public readonly paymentMethod: string;
  public readonly paymentReference: string;
  public readonly shippingMethod: string;
  public readonly trackingNumber: string;
  public readonly customerNotes: string;
  public readonly adminNotes: string;
  public readonly shippedAt: Date;
  public readonly deliveredAt: Date;

  constructor(data: unknown) {
    const validated: CreateOrderSchemaType = OrderConstants.validateCreateOrder(data);
    this.orderNumber = validated.orderNumber;
    this.userId = validated.userId;
    this.shippingAddressId = validated.shippingAddressId;
    this.billingAddressId = validated.billingAddressId;
    this.status = validated.status;
    this.subtotalCents = validated.subtotalCents;
    this.taxAmountCents = validated.taxAmountCents;
    this.shippingCents = validated.shippingCents;
    this.totalCents = validated.totalCents;
    this.paymentStatus = validated.paymentStatus;
    this.paymentMethod = validated.paymentMethod;
    this.paymentReference = validated.paymentReference;
    this.shippingMethod = validated.shippingMethod;
    this.trackingNumber = validated.trackingNumber;
    this.customerNotes = validated.customerNotes;
    this.adminNotes = validated.adminNotes;
    this.shippedAt = validated.shippedAt;
    this.deliveredAt = validated.deliveredAt;
  }

  // Getters
  public getOrderNumber(): string {
    return this.orderNumber;
  }
  public getUserId(): string {
    return this.userId;
  }
  public getShippingAddressId(): string {
    return this.shippingAddressId;
  }
  public getBillingAddressId(): string {
    return this.billingAddressId;
  }
  public getStatus(): string {
    return this.status;
  }
  public getSubtotalCents(): string {
    return this.subtotalCents;
  }
  public getTaxAmountCents(): string {
    return this.taxAmountCents;
  }
  public getShippingCents(): string {
    return this.shippingCents;
  }
  public getTotalCents(): string {
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
}
