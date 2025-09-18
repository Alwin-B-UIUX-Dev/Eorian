import { OrderItemConstants, type UpdateOrderItemSchemaType } from '@/constants';

export class UpdateOrderItemDto {
  public readonly orderId?: number | undefined;
  public readonly productId?: number | undefined;
  public readonly productName?: string | undefined;
  public readonly productSku?: string | undefined;
  public readonly unitPriceCents?: number | undefined;
  public readonly taxRate?: number | undefined;
  public readonly quantity?: number | undefined;
  public readonly lineSubtotalCents?: number | undefined;
  public readonly lineTaxCents?: number | undefined;
  public readonly lineTotalCents?: number | undefined;

  constructor(data: unknown) {
    const validated: UpdateOrderItemSchemaType = OrderItemConstants.validateUpdateOrderItem(data);
    this.orderId = validated.orderId;
    this.productId = validated.productId;
    this.productName = validated.productName;
    this.productSku = validated.productSku;
    this.unitPriceCents = validated.unitPriceCents;
    this.taxRate = validated.taxRate;
    this.quantity = validated.quantity;
    this.lineSubtotalCents = validated.lineSubtotalCents;
    this.lineTaxCents = validated.lineTaxCents;
    this.lineTotalCents = validated.lineTotalCents;
  }
}
