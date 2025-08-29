import type { IEntity } from '@/interfaces';

export interface IorderItems extends IEntity {
  // === GETTERS COMPLETS ===
  getProductId(): number;
  getOrderId(): number;
  getProductName(): string;
  getProductSku(): string;
  getUnitPriceCents(): number;
  getTaxRate(): number;
  getQuantity(): number;
  getLineSubtotalCents(): number;
  getLineTaxCents(): number;
  getLineTotalCents(): number;
  // === SETTERS COMPLETS ===
  setProductId(productId: number): this;
  setOrderId(orderId: number): this;
  setProductName(productName: string): this;
  setProductSku(productSku: string): this;
  setUnitPriceCents(unitPriceCents: number): this;
  setTaxRate(taxRate: number): this;
  setQuantity(quantity: number): this;
  setLineSubtotalCents(lineSubtotalCents: number): this;
  setLineTaxCents(lineTaxCents: number): this;
  setLineTotalCents(lineTotalCents: number): this;
}
