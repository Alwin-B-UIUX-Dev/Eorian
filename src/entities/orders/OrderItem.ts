import { BaseEntity } from '@/entities';
import type { IOrderItem } from '@/interfaces';
import type { IOrderItemData } from '@/types';

export class OrderItem extends BaseEntity implements IOrderItem {
  private orderId: number;
  private productId: number | null;
  private productName: string;
  private productSku: string | null;
  private unitPriceCents: number;
  private taxRate: number;
  private quantity: number;
  private lineSubtotalCents: number;
  private lineTaxCents: number;
  private lineTotalCents: number;

  constructor(data: IOrderItemData) {
    super(data);
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
  }

  public getOrderId(): number {
    return this.orderId;
  }

  public getProductId(): number | null {
    return this.productId;
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
      orderItemId: this.id,
      orderId: this.orderId,
      productId: this.productId,
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

  /**
   * Retourne les données de l'entité dans le format IOrderItemData
   * pour être utilisé par les DTOs
   */
  public toData(): IOrderItemData {
    return {
      id: this.id,
      orderId: this.orderId,
      productId: this.productId,
      productName: this.productName,
      productSku: this.productSku,
      unitPriceCents: this.unitPriceCents,
      taxRate: this.taxRate,
      quantity: this.quantity,
      lineSubtotalCents: this.lineSubtotalCents,
      lineTaxCents: this.lineTaxCents,
      lineTotalCents: this.lineTotalCents,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
