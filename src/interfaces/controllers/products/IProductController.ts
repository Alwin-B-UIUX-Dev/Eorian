// src/interfaces/controllers/products/IProductController.ts
import type { NextFunction, Request, Response } from 'express';

export interface IProductController {
  /**
   * GET /products - Récupérer tous les produits avec pagination
   */
  index(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * GET /products/:id - Récupérer un produit par ID
   */
  show(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * GET /products/slug/:slug - Récupérer un produit par slug
   */
  showBySlug(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * GET /products/sku/:sku - Récupérer un produit par SKU
   */
  showBySku(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * GET /products/search - Rechercher des produits par nom
   */
  search(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * GET /products/active - Récupérer les produits actifs
   */
  findActive(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * GET /products/out-of-stock - Récupérer les produits en rupture de stock
   */
  findOutOfStock(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * GET /products/low-stock - Récupérer les produits avec stock faible
   */
  findLowStock(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * GET /products/creator/:createdBy - Récupérer les produits par créateur
   */
  findByCreator(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * GET /products/tax-rate/:taxRateId - Récupérer les produits par taux de taxe
   */
  findByTaxRate(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * POST /products - Créer un nouveau produit
   */
  create(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * PUT /products/:id - Mettre à jour un produit
   */
  update(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * PATCH /products/:id/stock - Mettre à jour le stock d'un produit
   */
  updateStock(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * PATCH /products/:id/status - Activer/désactiver un produit
   */
  updateStatus(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * DELETE /products/:id - Supprimer un produit
   */
  remove(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * GET /products/count - Compter le nombre total de produits
   */
  count(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * GET /products/count/active - Compter les produits actifs
   */
  countActive(req: Request, res: Response, next: NextFunction): Promise<void>;
}
