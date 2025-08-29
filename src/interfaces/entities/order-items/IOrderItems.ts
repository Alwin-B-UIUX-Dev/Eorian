import type { IEntity } from '@/interfaces';

export interface IorderItems extends IEntity {
  // === GETTERS COMPLETS ===
  getProductId(): number | null;
  getOrderId(): number;
  getProductName(): string;
  getProductSku(): string | null;
  getUnitPriceCents(): number;
  getTaxRate(): number;
  getQuantity(): number;
  getLineSubtotalCents(): number;
  getLineTaxCents(): number;
  getLineTotalCents(): number;
  // === SETTERS COMPLETS ===
  setProductId(productId: number | null): this;
  setOrderId(orderId: number): this;
  setProductName(productName: string): this;
  setProductSku(productSku: string | null): this;
  setUnitPriceCents(unitPriceCents: number): this;
  setTaxRate(taxRate: number): this;
  setQuantity(quantity: number): this;
  setLineSubtotalCents(lineSubtotalCents: number): this;
  setLineTaxCents(lineTaxCents: number): this;
  setLineTotalCents(lineTotalCents: number): this;
}
