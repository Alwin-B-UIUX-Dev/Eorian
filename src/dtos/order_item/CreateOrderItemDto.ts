import { type CreateOrderItemSchemaType, OrderItemConstants } from '@/constants';

export class CreateOrderItemDto {
  public readonly productId: string;
  public readonly orderId: string;
  public readonly productName: string;
  public readonly productSku: string;
  public readonly unitPriceCents: string;
  public readonly taxRate: string;
  public readonly quantity: string;
  public readonly lineSubtotalCents: string;
  public readonly lineTaxCents: string;
  public readonly lineTotalCents: string;

  constructor(data: unknown) {
    const validated: CreateOrderItemSchemaType = OrderItemConstants.validateCreateOrderItem(data);
    this.productId = validated.productId;
    this.orderId = validated.orderId;
    this.productName = validated.productName;
    this.productSku = validated.productSku;
    this.unitPriceCents = validated.unitPriceCents;
    this.taxRate = validated.taxRate;
    this.quantity = validated.quantity;
    this.lineSubtotalCents = validated.lineSubtotalCents;
    this.lineTaxCents = validated.lineTaxCents;
    this.lineTotalCents = validated.lineTotalCents;
  }

  // Getters
  public getProductId(): string {
    return this.productId;
  }
  public getOrderId(): string {
    return this.orderId;
  }
  public getProductName(): string {
    return this.productName;
  }
  public getProductSku(): string {
    return this.productSku;
  }
  public getUnitPriceCents(): string {
    return this.unitPriceCents;
  }
  public getTaxRate(): string {
    return this.taxRate;
  }
  public getQuantity(): string {
    return this.quantity;
  }
  public getLineSubtotalCents(): string {
    return this.lineSubtotalCents;
  }
  public getLineTaxCents(): string {
    return this.lineTaxCents;
  }
  public getLineTotalCents(): string {
    return this.lineTotalCents;
  }
}
