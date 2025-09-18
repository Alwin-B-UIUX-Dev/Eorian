// src/routes/OrderItemRoutes.ts

import { Router } from 'express';
import type { IOrderItemController } from '@/interfaces';

export class OrderItemRoutes {
  private readonly router: Router;

  constructor(private readonly controller: IOrderItemController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Public routes for simple CRUD testing via Postman
    this.router.get('/order-items', this.controller.index.bind(this.controller));
    this.router.get('/order-items/:id', this.controller.show.bind(this.controller));

    this.router.post('/order-items', this.controller.store.bind(this.controller));
    this.router.put('/order-items/:id', this.controller.update.bind(this.controller));
    this.router.delete('/order-items/:id', this.controller.destroy.bind(this.controller));

    // Additional routes for specific queries
    this.router.get(
      '/order-items/order/:orderId',
      this.controller.findByOrderId.bind(this.controller)
    );
    this.router.get(
      '/order-items/product/:productId',
      this.controller.findByProductId.bind(this.controller)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
