import { Router } from 'express';
import type { IProductImageControllers } from '@/interfaces';
export class ProductImageRoutes {
  private readonly router: Router;

  constructor(
    private readonly productImageController: IProductImageControllers,
    // private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Routes publiques
    this.router.post('/productImage', this.productImageController.store.bind(this.productImageController));
    // Routes protégées
    // const protect = AuthMiddleware.authenticate(this.tokenManager);
    // this.router.post(
    //   '/productImage',
    //   protect,
    //   this.productImageController.store.bind(this.productImageController)
    // );
  }
  public getRouter(): Router {
    return this.router;
  }
}
