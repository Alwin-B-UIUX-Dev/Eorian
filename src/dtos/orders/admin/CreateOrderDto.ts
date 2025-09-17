import { type CreateOrderSchemaType, OrderConstants } from '@/constants';

export class CreateOrderDto {
  public readonly orderNumber: string;
  public readonly userId: number;
  public readonly shippingAddressId?: number | undefined;
  public readonly billingAddressId?: number | undefined;
  public readonly status: string;
  public readonly subtotalCents: number;
  public readonly taxAmountCents: number;
  public readonly shippingCents: number;
  public readonly totalCents: number;
  public readonly paymentStatus: string;
  public readonly paymentMethod?: string | undefined;
  public readonly paymentReference?: string | undefined;
  public readonly shippingMethod?: string | undefined;
  public readonly trackingNumber?: string | undefined;
  public readonly customerNotes?: string | undefined;
  public readonly adminNotes?: string | undefined;

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
  }
}
