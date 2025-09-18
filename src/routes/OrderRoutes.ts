// src/routes/OrderRoutes.ts

import { Router } from 'express';
import type { IOrderController } from '@/interfaces';

export class OrderRoutes {
  private readonly router: Router;

  constructor(private readonly controller: IOrderController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Public routes for simple CRUD testing via Postman
    this.router.get('/orders', this.controller.index.bind(this.controller));
    this.router.get('/orders/:id', this.controller.show.bind(this.controller));

    this.router.post('/orders', this.controller.store.bind(this.controller));
    this.router.put('/orders/:id', this.controller.update.bind(this.controller));
    this.router.delete('/orders/:id', this.controller.destroy.bind(this.controller));

    // Additional routes for specific queries
    this.router.get('/orders/user/:userId', this.controller.findByUserId.bind(this.controller));
    this.router.get('/orders/status/:status', this.controller.findByStatus.bind(this.controller));
    this.router.get(
      '/orders/payment-status/:paymentStatus',
      this.controller.findByPaymentStatus.bind(this.controller)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
