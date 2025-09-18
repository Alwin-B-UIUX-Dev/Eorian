import type { IOrderData } from '@/types';

export class ResponseOrderDto {
  public readonly id: string;
  public readonly orderNumber: string;
  public readonly userId: number;
  public readonly shippingAddressId: number | null;
  public readonly billingAddressId: number | null;
  public readonly status: string;
  public readonly subtotalCents: number;
  public readonly taxAmountCents: number;
  public readonly shippingCents: number;
  public readonly totalCents: number;
  public readonly paymentStatus: string;
  public readonly paymentMethod: string | null;
  public readonly paymentReference: string | null;
  public readonly shippingMethod: string | null;
  public readonly trackingNumber: string | null;
  public readonly customerNotes: string | null;
  public readonly adminNotes: string | null;
  public readonly shippedAt: Date | null;
  public readonly deliveredAt: Date | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(data: IOrderData) {
    this.id = data.id;
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
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
