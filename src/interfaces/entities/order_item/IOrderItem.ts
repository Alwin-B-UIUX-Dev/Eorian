import type { IEntity } from '@/interfaces';

export interface IOrderItem extends IEntity {
  // === GETTERS COMPLETS ===
  getProductId(): string;
  getOrderId(): string;
  getProductName(): string;
  getProductSku(): string;
  getUnitPriceCents(): string;
  getTaxRate(): string;
  getQuantity(): string;
  getLineSubtotalCents(): string;
  getLineTaxCents(): string;
  getLineTotalCents(): string;
  // === SETTERS COMPLETS ===
  setProductId(productId: string): this;
  setOrderId(orderId: string): this;
  setProductName(productName: string): this;
  setProductSku(productSku: string): this;
  setUnitPriceCents(unitPriceCents: string): this;
  setTaxRate(taxRate: string): this;
  setQuantity(quantity: string): this;
  setLineSubtotalCents(lineSubtotalCents: string): this;
  setLineTaxCents(lineTaxCents: string): this;
  setLineTotalCents(lineTotalCents: string): this;
}
