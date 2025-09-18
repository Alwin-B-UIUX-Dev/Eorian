// src/routes/ProductRoutes.ts

import { Router } from 'express';
import type { IProductController } from '@/interfaces/controllers/products';

export class ProductRoutes {
  private readonly router: Router;

  constructor(private readonly controller: IProductController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Public routes for simple CRUD testing via Postman
    this.router.get('/products', this.controller.index.bind(this.controller));
    this.router.get('/products/:id', this.controller.show.bind(this.controller));

    this.router.post('/products', this.controller.store.bind(this.controller));
    this.router.put('/products/:id', this.controller.update.bind(this.controller));
    this.router.delete('/products/:id', this.controller.destroy.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}
