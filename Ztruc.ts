import { Router } from 'express';
import type { ITaxRateControllers } from '@/interfaces/controllers/taxRate';
export class TaxRateRoutes {
  private readonly router: Router;

  constructor(
    private readonly taxRateController: ITaxRateControllers,
    // private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Routes publiques
    this.router.post('/taxRate', this.taxRateController.store.bind(this.taxRateController));
    // Routes protégées
    // const protect = AuthMiddleware.authenticate(this.tokenManager);
    // this.router.post(
    //   '/taxRate',
    //   protect,
    //   this.taxRateController.store.bind(this.taxRateController)
    // );
  }
  public getRouter(): Router {
    return this.router;
  }
}
