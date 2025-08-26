import { ProductConstants, type ResponseProductSchemaType } from '@/constants/zod/ProductConstants';
import type { IProduct } from '@/interfaces';

export class ResponseProductDto {
  static fromProduct(Product: IProduct): ResponseProductDto {
    throw new Error('Method not implemented.');
  }
  public readonly id: string;
  public readonly name: string;
  public readonly slug: string;
  public readonly sku: string;
  public readonly shortDescription: string;
  public readonly description: string;
  public readonly priceCents: string;
  public readonly taxRateId: string;
  public readonly stockQuantity: string;
  public readonly lowStockThreshold: string;
  public readonly manageStock: boolean;
  public readonly metaTitle: string;
  public readonly metaDescription: string;
  public readonly isActive: boolean;
  public readonly createdBy: string;

  constructor(data: unknown) {
    const validated: ResponseProductSchemaType = ProductConstants.validationResponseProduct(data);
    this.id = validated.id;
    this.name = validated.name;
    this.slug = validated.slug;
    this.sku = validated.sku;
    this.shortDescription = validated.shortDescription;
    this.description = validated.description;
    this.priceCents = validated.priceCents;
    this.taxRateId = validated.taxRateId;
    this.stockQuantity = validated.stockQuantity;
    this.lowStockThreshold = validated.lowStockThreshold;
    this.manageStock = validated.manageStock;
    this.metaTitle = validated.metaTitle;
    this.metaDescription = validated.metaDescription;
    this.isActive = validated.isActive;
    this.createdBy = validated.createdBy;
  }

  // === GETTERS ===
  public getId(): string {
    return this.id; // et ici
  }
  public getName(): string {
    return this.name;
  }
  public getSlug(): string {
    return this.slug;
  }
  public getSku(): string {
    return this.sku;
  }
  public getShortDescription(): string {
    return this.shortDescription;
  }
  public getDescription(): string {
    return this.description;
  }
  public getPriceCents(): string {
    return this.priceCents;
  }
  public getTaxRateId(): string {
    return this.taxRateId;
  }
  public getStockQuantity(): string {
    return this.stockQuantity;
  }
  public getLowStockThreshold(): string {
    return this.lowStockThreshold;
  }
  public getManageStock(): boolean {
    return this.manageStock;
  }
  public getMetaTitle(): string {
    return this.metaTitle;
  }
  public getMetaDescription(): string {
    return this.metaDescription;
  }
  public getIsActive(): boolean {
    return this.isActive;
  }
  public getCreatedBy(): string {
    return this.createdBy;
  }
}
