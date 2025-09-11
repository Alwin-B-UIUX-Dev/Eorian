import { Router } from 'express';
import type { IAddresseControllers } from '@/interfaces';
export class AddresseRoutes {
  private readonly router: Router;

  constructor(
    private readonly addresseController: IAddresseControllers
    // private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Routes publiques
    this.router.post('/addresse', this.addresseController.store.bind(this.addresseController));
    // Routes protégées
    // const protect = AuthMiddleware.authenticate(this.tokenManager);
    // this.router.post(
    //   '/addresse',
    //   protect,
    //   this.addresseController.store.bind(this.addresseController)
    // );
  }
  public getRouter(): Router {
    return this.router;
  }
}
