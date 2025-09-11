import { Router } from 'express';
import type { ICartItemControllers } from '@/interfaces';

export class CartItemRoutes {
  private readonly router: Router;

  constructor(
    private readonly cartItemController: ICartItemControllers
    // private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Routes publiques
    this.router.post('/cartItem', this.cartItemController.store.bind(this.cartItemController));
    // Routes protégées
    // const protect = AuthMiddleware.authenticate(this.tokenManager);
    // this.router.post(
    //   '/cartItem',
    //   protect,
    //   this.cartItemController.store.bind(this.cartItemController)
    // );
  }
  public getRouter(): Router {
    return this.router;
  }
}
