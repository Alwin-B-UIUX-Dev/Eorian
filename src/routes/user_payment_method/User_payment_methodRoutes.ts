import { Router } from 'express';
import type { IUserPaymentMethodControllers } from '@/interfaces';
export class UserPaymentMethodRoutes {
  private readonly router: Router;

  constructor(
    private readonly userPaymentMethodController: IUserPaymentMethodControllers
    // private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Routes publiques
    this.router.post(
      '/userPaymentMethod',
      this.userPaymentMethodController.store.bind(this.userPaymentMethodController)
    );
    // Routes protégées
    // const protect = AuthMiddleware.authenticate(this.tokenManager);
    // this.router.post(
    //   '/userPaymentMethod',
    //   protect,
    //   this.userPaymentMethodController.store.bind(this.userPaymentMethodController)
    // );
  }
  public getRouter(): Router {
    return this.router;
  }
}
