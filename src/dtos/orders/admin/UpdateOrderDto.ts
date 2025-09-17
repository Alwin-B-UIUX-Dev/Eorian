import { OrderConstants, type UpdateOrderSchemaType } from '@/constants';

export class UpdateOrderDto {
  public readonly orderNumber?: string | undefined;
  public readonly userId?: number | undefined;
  public readonly shippingAddressId?: number | undefined;
  public readonly billingAddressId?: number | undefined;
  public readonly status?: string | undefined;
  public readonly subtotalCents?: number | undefined;
  public readonly taxAmountCents?: number | undefined;
  public readonly shippingCents?: number | undefined;
  public readonly totalCents?: number | undefined;
  public readonly paymentStatus?: string | undefined;
  public readonly paymentMethod?: string | undefined;
  public readonly paymentReference?: string | undefined;
  public readonly shippingMethod?: string | undefined;
  public readonly trackingNumber?: string | undefined;
  public readonly customerNotes?: string | undefined;
  public readonly adminNotes?: string | undefined;
  public readonly shippedAt?: Date | undefined;
  public readonly deliveredAt?: Date | undefined;

  constructor(data: unknown) {
    const validated: UpdateOrderSchemaType = OrderConstants.validateUpdateOrder(data);
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
}
