// src/routes/ProductImageRoutes.ts

import { Router } from 'express';
import type { IProductImageController } from '@/interfaces/controllers/product-images';

export class ProductImageRoutes {
  private readonly router: Router;

  constructor(private readonly controller: IProductImageController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Public routes for simple CRUD testing via Postman
    this.router.get('/product-images', this.controller.index.bind(this.controller));
    this.router.get('/product-images/:id', this.controller.show.bind(this.controller));
    
    this.router.post('/product-images', this.controller.store.bind(this.controller));
    this.router.put('/product-images/:id', this.controller.update.bind(this.controller));
    this.router.delete('/product-images/:id', this.controller.destroy.bind(this.controller));

    // Additional routes for specific queries
    this.router.get(
      '/product-images/product/:productId',
      this.controller.findByProductId.bind(this.controller)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
