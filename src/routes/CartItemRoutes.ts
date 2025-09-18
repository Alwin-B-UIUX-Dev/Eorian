// src/routes/CartItemRoutes.ts

import { Router } from 'express';
import type { ICartItemController } from '@/interfaces/controllers/cart-items';

export class CartItemRoutes {
  private readonly router: Router;

  constructor(private readonly controller: ICartItemController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // CRUD basique
    this.router.get('/cart-items', this.controller.index.bind(this.controller));
    this.router.get('/cart-items/:id', this.controller.show.bind(this.controller));
    this.router.post('/cart-items', this.controller.store.bind(this.controller));
    this.router.put('/cart-items/:id', this.controller.update.bind(this.controller));
    this.router.delete('/cart-items/:id', this.controller.destroy.bind(this.controller));

    // Fonctionnalités spécifiques au panier
    this.router.get('/cart-items/user/:userId', this.controller.findByUserId.bind(this.controller));
    this.router.post(
      '/cart-items/user/:userId/add',
      this.controller.addToCart.bind(this.controller)
    );
    this.router.delete(
      '/cart-items/user/:userId/product/:productId',
      this.controller.removeFromCart.bind(this.controller)
    );
    this.router.delete(
      '/cart-items/user/:userId/clear',
      this.controller.clearCart.bind(this.controller)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
