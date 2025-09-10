import { BaseEntity } from '@/entities';
import type { IOrderItem } from '@/interfaces';
import type { IOrderItemData } from '@/types';

export class OrderItem extends BaseEntity implements IOrderItem {
  private productId: string;
  private orderId: string;
  private productName: string;
  private productSku: string;
  private unitPriceCents: string;
  private taxRate: string;
  private quantity: string;
  private lineSubtotalCents: string;
  private lineTaxCents: string;
  private lineTotalCents: string;

  constructor(data: IOrderItemData) {
    super(data, 'orderItemId');
    this.productId = data.productId;
    this.orderId = data.orderId;
    this.productName = data.productName;
    this.productSku = data.productSku;
    this.unitPriceCents = data.unitPriceCents;
    this.taxRate = data.taxRate;
    this.quantity = data.quantity;
    this.lineSubtotalCents = data.lineSubtotalCents;
    this.lineTaxCents = data.lineTaxCents;
    this.lineTotalCents = data.lineTotalCents;
  }
  // === GETTERS ===
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

  // === SETTERS ===
  public setProductId(productId: string): this {
    this.productId = productId;
    this.updateTimestamp();
    return this;
  }
  public setOrderId(orderId: string): this {
    this.orderId = orderId;
    this.updateTimestamp();
    return this;
  }
  public setProductName(productName: string): this {
    this.productName = productName;
    this.updateTimestamp();
    return this;
  }
  public setProductSku(productSku: string): this {
    this.productSku = productSku;
    this.updateTimestamp();
    return this;
  }
  public setUnitPriceCents(unitPriceCents: string): this {
    this.unitPriceCents = unitPriceCents;
    this.updateTimestamp();
    return this;
  }
  public setTaxRate(taxRate: string): this {
    this.taxRate = taxRate;
    this.updateTimestamp();
    return this;
  }
  public setQuantity(quantity: string): this {
    this.quantity = quantity;
    this.updateTimestamp();
    return this;
  }
  public setLineSubtotalCents(lineSubtotalCents: string): this {
    this.lineSubtotalCents = lineSubtotalCents;
    this.updateTimestamp();
    return this;
  }
  public setLineTaxCents(lineTaxCents: string): this {
    this.lineTaxCents = lineTaxCents;
    this.updateTimestamp();
    return this;
  }
  public setLineTotalCents(lineTotalCents: string): this {
    this.lineTotalCents = lineTotalCents;
    this.updateTimestamp();
    return this;
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      productId: this.productId,
      orderId: this.orderId,
      productName: this.productName,
      productSku: this.productSku,
      unitPriceCents: this.unitPriceCents,
      taxRate: this.taxRate,
      quantity: this.quantity,
      lineSubtotalCents: this.lineSubtotalCents,
      lineTaxCents: this.lineTaxCents,
      lineTotalCents: this.lineTotalCents
    };
  }
}
