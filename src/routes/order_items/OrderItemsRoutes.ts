import { Router } from 'express';
import type { IOrderItemControllers } from '@/interfaces';
export class OrderItemRoutes {
  private readonly router: Router;

  constructor(
    private readonly orderItemController: IOrderItemControllers
    // private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Routes publiques
    this.router.post('/orderItem', this.orderItemController.store.bind(this.orderItemController));
    // Routes protégées
    // const protect = AuthMiddleware.authenticate(this.tokenManager);
    // this.router.post(
    //   '/orderItem',
    //   protect,
    //   this.orderItemController.store.bind(this.orderItemController)
    // );
  }
  public getRouter(): Router {
    return this.router;
  }
}
