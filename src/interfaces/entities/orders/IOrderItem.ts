import type { IEntity } from '@/interfaces';
import type { IOrderItemData } from '@/types';

export interface IOrderItem extends IEntity {
  getOrderId(): number;
  getProductId(): number | null;
  getProductName(): string;
  getProductSku(): string | null;
  getUnitPriceCents(): number;
  getTaxRate(): number;
  getQuantity(): number;
  getLineSubtotalCents(): number;
  getLineTaxCents(): number;
  getLineTotalCents(): number;
  setProductName(productName: string): this;
  setProductSku(productSku: string | null): this;
  setUnitPriceCents(unitPriceCents: number): this;
  setTaxRate(taxRate: number): this;
  setQuantity(quantity: number): this;
  setLineSubtotalCents(lineSubtotalCents: number): this;
  setLineTaxCents(lineTaxCents: number): this;
  setLineTotalCents(lineTotalCents: number): this;
  toData(): IOrderItemData;
}
