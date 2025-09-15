// src/interfaces/services/products/IProductService.ts
import type { IBaseService } from '@/interfaces';
import type { IProduct } from '@/interfaces/entities/products/IProduct';
import type { CreateProductData, IProductData } from '@/types';

export interface IProductService extends IBaseService<IProduct, IProductData> {
  /**
   * Rechercher un produit par son slug
   */
  findBySlug(slug: string): Promise<IProduct | null>;

  /**
   * Rechercher un produit par son SKU
   */
  findBySku(sku: string): Promise<IProduct | null>;

  /**
   * Rechercher des produits par nom (recherche partielle)
   */
  findByName(name: string, limit?: number, offset?: number): Promise<IProduct[]>;

  /**
   * Rechercher des produits actifs
   */
  findActive(limit?: number, offset?: number): Promise<IProduct[]>;

  /**
   * Rechercher des produits en rupture de stock
   */
  findOutOfStock(limit?: number, offset?: number): Promise<IProduct[]>;

  /**
   * Rechercher des produits avec stock faible
   */
  findLowStock(limit?: number, offset?: number): Promise<IProduct[]>;

  /**
   * Rechercher des produits par créateur
   */
  findByCreator(createdBy: string, limit?: number, offset?: number): Promise<IProduct[]>;

  /**
   * Rechercher des produits par taux de taxe
   */
  findByTaxRate(taxRateId: string, limit?: number, offset?: number): Promise<IProduct[]>;

  /**
   * Mettre à jour le stock d'un produit
   */
  updateStock(id: string, stockQuantity: number): Promise<IProduct>;

  /**
   * Activer/désactiver un produit
   */
  updateStatus(id: string, isActive: boolean): Promise<IProduct>;

  /**
   * Compter le nombre total de produits
   */
  count(): Promise<number>;

  /**
   * Compter les produits actifs
   */
  countActive(): Promise<number>;

  /**
   * Créer un produit avec validation métier
   */
  createProduct(data: CreateProductData): Promise<IProduct>;

  /**
   * Mettre à jour un produit avec validation métier
   */
  updateProduct(id: string, data: Partial<CreateProductData>): Promise<IProduct>;
}
