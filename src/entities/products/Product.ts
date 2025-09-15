// src/entities/products/Product.ts

import { BaseEntity } from '@/entities/BaseEntity';
import type { IProduct } from '@/interfaces';
import type { IProductData } from '@/types';

/**
 * Classe métier Product - Entité métier pour les produits
 */
export class Product extends BaseEntity implements IProduct {
  private name: string;
  private slug: string;
  private sku: string | undefined;
  private shortDescription: string | undefined;
  private description: string | undefined;
  private priceCents: number;
  private taxRateId: string;
  private stockQuantity: number;
  private lowStockThreshold: number;
  private manageStock: boolean;
  private metaTitle: string | undefined;
  private metaDescription: string | undefined;
  private isActive: boolean;
  private createdBy: string;

  constructor(data: IProductData) {
    super(data, 'id');
    this.name = data.name;
    this.slug = data.slug;
    this.sku = data.sku;
    this.shortDescription = data.shortDescription;
    this.description = data.description;
    this.priceCents = data.priceCents;
    this.taxRateId = data.taxRateId;
    this.stockQuantity = data.stockQuantity;
    this.lowStockThreshold = data.lowStockThreshold;
    this.manageStock = data.manageStock;
    this.metaTitle = data.metaTitle;
    this.metaDescription = data.metaDescription;
    this.isActive = data.isActive;
    this.createdBy = data.createdBy;
  }

  // === GETTERS ===
  public getName(): string {
    return this.name;
  }

  public getSlug(): string {
    return this.slug;
  }

  public getSku(): string | undefined {
    return this.sku;
  }

  public getShortDescription(): string | undefined {
    return this.shortDescription;
  }

  public getDescription(): string | undefined {
    return this.description;
  }

  public getPriceCents(): number {
    return this.priceCents;
  }

  public getTaxRateId(): string {
    return this.taxRateId;
  }

  public getStockQuantity(): number {
    return this.stockQuantity;
  }

  public getLowStockThreshold(): number {
    return this.lowStockThreshold;
  }

  public getManageStock(): boolean {
    return this.manageStock;
  }

  public getMetaTitle(): string | undefined {
    return this.metaTitle;
  }

  public getMetaDescription(): string | undefined {
    return this.metaDescription;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getCreatedBy(): string {
    return this.createdBy;
  }

  // === MÉTHODES MÉTIER ===
  public isInStock(): boolean {
    return this.stockQuantity > 0;
  }

  public isLowStock(): boolean {
    return this.manageStock && this.stockQuantity <= this.lowStockThreshold;
  }

  public getPriceInEuros(): number {
    return this.priceCents / 100;
  }

  public updateStock(quantity: number): void {
    if (quantity < 0) {
      throw new Error('Stock quantity cannot be negative');
    }
    this.stockQuantity = quantity;
    this.updateTimestamp();
  }

  public activate(): void {
    this.isActive = true;
    this.updateTimestamp();
  }

  public deactivate(): void {
    this.isActive = false;
    this.updateTimestamp();
  }

  // === MÉTHODES DE MISE À JOUR ===
  public updateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Product name cannot be empty');
    }
    this.name = name.trim();
    this.updateTimestamp();
  }

  public updateSlug(slug: string): void {
    if (!slug || slug.trim().length === 0) {
      throw new Error('Product slug cannot be empty');
    }
    this.slug = slug.trim();
    this.updateTimestamp();
  }

  public updatePrice(priceCents: number): void {
    if (priceCents <= 0) {
      throw new Error('Product price must be positive');
    }
    this.priceCents = priceCents;
    this.updateTimestamp();
  }

  public updateDescription(description: string | undefined): void {
    this.description = description;
    this.updateTimestamp();
  }

  public updateShortDescription(shortDescription: string | undefined): void {
    this.shortDescription = shortDescription;
    this.updateTimestamp();
  }

  public updateMetaData(metaTitle: string | undefined, metaDescription: string | undefined): void {
    this.metaTitle = metaTitle;
    this.metaDescription = metaDescription;
    this.updateTimestamp();
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      name: this.name,
      slug: this.slug,
      sku: this.sku,
      shortDescription: this.shortDescription,
      description: this.description,
      priceCents: this.priceCents,
      taxRateId: this.taxRateId,
      stockQuantity: this.stockQuantity,
      lowStockThreshold: this.lowStockThreshold,
      manageStock: this.manageStock,
      metaTitle: this.metaTitle,
      metaDescription: this.metaDescription,
      isActive: this.isActive,
      createdBy: this.createdBy
    };
  }
}
