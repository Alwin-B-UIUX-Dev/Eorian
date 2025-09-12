import { Router } from 'express';
import type { ITaxRateControllers } from '@/interfaces';

export class TaxRateRoutes {
  private readonly router: Router;

  constructor(private readonly controller: ITaxRateControllers) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Public routes for simple CRUD testing via Postman
    this.router.get('/taxRate', this.controller.index.bind(this.controller));
    this.router.get('/taxRate/:id', this.controller.show.bind(this.controller));

    this.router.post('/taxRate', this.controller.store.bind(this.controller));
    this.router.put('/taxRate/:id', this.controller.update.bind(this.controller));
    this.router.delete('/taxRate/:id', this.controller.destroy.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}
