import { Router } from 'express';
import type { ITokenManager } from '@/interfaces';
import type { IProductControllers } from '@/interfaces/controllers/product';
import { AuthMiddleware } from '@/middlewares';
export class ProductRoutes {
  private readonly router: Router;

  constructor(
    private readonly productController: IProductControllers,
    private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Routes publiques
    this.router.post('/products', this.productController.store.bind(this.productController));
    // Routes protégées
    const protect = AuthMiddleware.authenticate(this.tokenManager);
    this.router.post(
      '/products',
      protect,
      this.productController.store.bind(this.productController)
    );
  }
  public getRouter(): Router {
    return this.router;
  }
}
