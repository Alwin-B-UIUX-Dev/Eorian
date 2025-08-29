import type { IorderItems } from '@/interfaces';
import type { IOrderItemsData } from '@/types';
import { BaseEntity } from '../BaseEntity';

export class OrderItems extends BaseEntity implements IorderItems {
  private productId: number | null;
  private orderId: number;
  private productName: string;
  private productSku: string | null;
  private unitPriceCents: number;
  private taxRate: number;
  private quantity: number;
  private lineSubtotalCents: number;
  private lineTaxCents: number;
  private lineTotalCents: number;

  constructor(data: IOrderItemsData) {
    super(data, 'orderItemsId');
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
  public getProductId(): number | null {
    return this.productId;
  }
  public getOrderId(): number {
    return this.orderId;
  }
  public getProductName(): string {
    return this.productName;
  }
  public getProductSku(): string | null {
    return this.productSku;
  }
  public getUnitPriceCents(): number {
    return this.unitPriceCents;
  }
  public getTaxRate(): number {
    return this.taxRate;
  }
  public getQuantity(): number {
    return this.quantity;
  }
  public getLineSubtotalCents(): number {
    return this.lineSubtotalCents;
  }
  public getLineTaxCents(): number {
    return this.lineTaxCents;
  }
  public getLineTotalCents(): number {
    return this.lineTotalCents;
  }

  // === SETTERS ===
  public setProductId(productId: number | null): this {
    this.productId = productId;
    this.updateTimestamp();
    return this;
  }
  public setOrderId(orderId: number): this {
    this.orderId = orderId;
    this.updateTimestamp();
    return this;
  }
  public setProductName(productName: string): this {
    this.productName = productName;
    this.updateTimestamp();
    return this;
  }
  public setProductSku(productSku: string | null): this {
    this.productSku = productSku;
    this.updateTimestamp();
    return this;
  }
  public setUnitPriceCents(unitPriceCents: number): this {
    this.unitPriceCents = unitPriceCents;
    this.updateTimestamp();
    return this;
  }
  public setTaxRate(taxRate: number): this {
    this.taxRate = taxRate;
    this.updateTimestamp();
    return this;
  }
  public setQuantity(quantity: number): this {
    this.quantity = quantity;
    this.updateTimestamp();
    return this;
  }
  public setLineSubtotalCents(lineSubtotalCents: number): this {
    this.lineSubtotalCents = lineSubtotalCents;
    this.updateTimestamp();
    return this;
  }
  public setLineTaxCents(lineTaxCents: number): this {
    this.lineTaxCents = lineTaxCents;
    this.updateTimestamp();
    return this;
  }
  public setLineTotalCents(lineTotalCents: number): this {
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
