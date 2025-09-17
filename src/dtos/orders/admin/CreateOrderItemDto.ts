import { type CreateOrderItemSchemaType, OrderItemConstants } from '@/constants';

export class CreateOrderItemDto {
  public readonly orderId: number;
  public readonly productId?: number | undefined;
  public readonly productName: string;
  public readonly productSku?: string | undefined;
  public readonly unitPriceCents: number;
  public readonly taxRate: number;
  public readonly quantity: number;
  public readonly lineSubtotalCents: number;
  public readonly lineTaxCents: number;
  public readonly lineTotalCents: number;

  constructor(data: unknown) {
    const validated: CreateOrderItemSchemaType = OrderItemConstants.validateCreateOrderItem(data);
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
