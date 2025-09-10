import { ProductConstants } from '@/constants';
import type { IProduct } from '@/interfaces';

export class ResponseProductDto {
  static fromProduct(Product: IProduct): ResponseProductDto {
    throw new Error('Method not implemented.');
  }
  public readonly id: string;
  public readonly name: string;
  public readonly slug: string;
  public readonly sku: string;
  public readonly short_description: string;
  public readonly description: string;
  public readonly price_cents: string;
  public readonly tax_rate_id: string;
  public readonly stock_quantity: string;
  public readonly low_stock_threshold: string;
  public readonly manage_stock: boolean;
  public readonly meta_title: string;
  public readonly meta_description: string;
  public readonly is_active: boolean;
  public readonly created_by: string;

  constructor(data: unknown) {
    const validated = ProductConstants.validateResponseProduct(data);
    this.id = validated.id;
    this.name = validated.name;
    this.slug = validated.slug;
    this.sku = validated.sku;
    this.short_description = validated.shortDescription;
    this.description = validated.description;
    this.price_cents = validated.priceCents;
    this.tax_rate_id = validated.taxRateId;
    this.stock_quantity = validated.stockQuantity;
    this.low_stock_threshold = validated.lowStockThreshold;
    this.manage_stock = validated.manageStock;
    this.meta_title = validated.metaTitle;
    this.meta_description = validated.metaDescription;
    this.is_active = validated.isActive;
    this.created_by = validated.createdBy;
  }

  // Getters
  public getId(): string {
    return this.id;
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
    return this.short_description;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPriceCents(): string {
    return this.price_cents;
  }

  public getTaxRateId(): string {
    return this.tax_rate_id;
  }

  public getStockQuantity(): string {
    return this.stock_quantity;
  }

  public getLowStockThreshold(): string {
    return this.low_stock_threshold;
  }

  public getManageStock(): boolean {
    return this.manage_stock;
  }

  public getMetaTitle(): string {
    return this.meta_title;
  }

  public getMetaDescription(): string {
    return this.meta_description;
  }

  public getIsActive(): boolean {
    return this.is_active;
  }

  public getCreatedBy(): string {
    return this.created_by;
  }

  public static from(product: IProduct): ResponseProductDto {
    return new ResponseProductDto({
      id: product.getId().toString(),
      name: product.getName(),
      slug: product.getSlug(),
      sku: product.getSku(),
      shortDescription: product.getShortDescription(),
      description: product.getDescription(),
      priceCents: product.getPriceCents(),
      taxRateId: product.getTaxRateId(),
      stockQuantity: product.getStockQuantity(),
      lowStockThreshold: product.getLowStockThreshold(),
      manageStock: product.getManageStock(),
      metaTitle: product.getMetaTitle(),
      metaDescription: product.getMetaDescription(),
      isActive: product.getIsActive(),
      createdBy: product.getCreatedBy()
    });
  }
}
