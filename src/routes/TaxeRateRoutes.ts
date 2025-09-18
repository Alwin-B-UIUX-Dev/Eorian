// src/routes/TaxeRateRoutes.ts

import { Router } from 'express';
import type { ITaxeRateController } from '@/interfaces';

export class TaxeRateRoutes {
  private readonly router: Router;

  constructor(private readonly controller: ITaxeRateController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Public routes for simple CRUD testing via Postman
    this.router.get('/tax-rates', this.controller.index.bind(this.controller));
    this.router.get('/tax-rates/:id', this.controller.show.bind(this.controller));
    
    this.router.post('/tax-rates', this.controller.store.bind(this.controller));
    this.router.put('/tax-rates/:id', this.controller.update.bind(this.controller));
    this.router.delete('/tax-rates/:id', this.controller.destroy.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}
