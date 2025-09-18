import type { IOrderItemData } from '@/types';

export class ResponseOrderItemDto {
  public readonly id: string;
  public readonly orderId: number;
  public readonly productId: number | null;
  public readonly productName: string;
  public readonly productSku: string | null;
  public readonly unitPriceCents: number;
  public readonly taxRate: number;
  public readonly quantity: number;
  public readonly lineSubtotalCents: number;
  public readonly lineTaxCents: number;
  public readonly lineTotalCents: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(data: IOrderItemData) {
    this.id = data.id;
    this.orderId = data.orderId;
    this.productId = data.productId;
    this.productName = data.productName;
    this.productSku = data.productSku;
    this.unitPriceCents = data.unitPriceCents;
    this.taxRate = data.taxRate;
    this.quantity = data.quantity;
    this.lineSubtotalCents = data.lineSubtotalCents;
    this.lineTaxCents = data.lineTaxCents;
    this.lineTotalCents = data.lineTotalCents;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
