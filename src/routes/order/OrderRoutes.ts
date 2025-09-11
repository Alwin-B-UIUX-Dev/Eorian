import { Router } from 'express';
import type { IOrderControllers } from '@/interfaces';
export class OrderRoutes {
  private readonly router: Router;

  constructor(
    private readonly orderController: IOrderControllers
    // private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Routes publiques
    this.router.post('/order', this.orderController.store.bind(this.orderController));
    // Routes protégées
    // const protect = AuthMiddleware.authenticate(this.tokenManager);
    // this.router.post(
    //   '/order',
    //   protect,
    //   this.orderController.store.bind(this.orderController)
    // );
  }
  public getRouter(): Router {
    return this.router;
  }
}
