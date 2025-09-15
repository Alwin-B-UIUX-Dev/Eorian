// src/routes/ProductRoutes.ts

import { Router } from 'express';
import type { IProductController } from '@/interfaces';

export class ProductRoutes {
  private readonly router: Router;

  constructor(private readonly controller: IProductController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // =============================================
    // ROUTES DE RECHERCHE ET FILTRAGE
    // =============================================

    // GET /products - Récupérer tous les produits avec pagination
    this.router.get('/products', this.controller.index.bind(this.controller));

    // GET /products/search - Rechercher des produits par nom
    this.router.get('/products/search', this.controller.search.bind(this.controller));

    // GET /products/active - Récupérer les produits actifs
    this.router.get('/products/active', this.controller.findActive.bind(this.controller));

    // GET /products/out-of-stock - Récupérer les produits en rupture de stock
    this.router.get('/products/out-of-stock', this.controller.findOutOfStock.bind(this.controller));

    // GET /products/low-stock - Récupérer les produits avec stock faible
    this.router.get('/products/low-stock', this.controller.findLowStock.bind(this.controller));

    // GET /products/count - Compter le nombre total de produits
    this.router.get('/products/count', this.controller.count.bind(this.controller));

    // GET /products/count/active - Compter les produits actifs
    this.router.get('/products/count/active', this.controller.countActive.bind(this.controller));

    // =============================================
    // ROUTES DE RECHERCHE PAR PARAMÈTRE
    // =============================================

    // GET /products/creator/:createdBy - Récupérer les produits par créateur
    this.router.get(
      '/products/creator/:createdBy',
      this.controller.findByCreator.bind(this.controller)
    );

    // GET /products/tax-rate/:taxRateId - Récupérer les produits par taux de taxe
    this.router.get(
      '/products/tax-rate/:taxRateId',
      this.controller.findByTaxRate.bind(this.controller)
    );

    // =============================================
    // ROUTES DE RECHERCHE PAR IDENTIFIANT
    // =============================================

    // GET /products/slug/:slug - Récupérer un produit par slug
    this.router.get('/products/slug/:slug', this.controller.showBySlug.bind(this.controller));

    // GET /products/sku/:sku - Récupérer un produit par SKU
    this.router.get('/products/sku/:sku', this.controller.showBySku.bind(this.controller));

    // GET /products/:id - Récupérer un produit par ID
    this.router.get('/products/:id', this.controller.show.bind(this.controller));

    // =============================================
    // ROUTES CRUD
    // =============================================

    // POST /products - Créer un nouveau produit
    this.router.post('/products', this.controller.create.bind(this.controller));

    // PUT /products/:id - Mettre à jour un produit
    this.router.put('/products/:id', this.controller.update.bind(this.controller));

    // DELETE /products/:id - Supprimer un produit
    this.router.delete('/products/:id', this.controller.remove.bind(this.controller));

    // =============================================
    // ROUTES DE MISE À JOUR SPÉCIALISÉES
    // =============================================

    // PATCH /products/:id/stock - Mettre à jour le stock d'un produit
    this.router.patch('/products/:id/stock', this.controller.updateStock.bind(this.controller));

    // PATCH /products/:id/status - Activer/désactiver un produit
    this.router.patch('/products/:id/status', this.controller.updateStatus.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}
