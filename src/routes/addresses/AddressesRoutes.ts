import { Router } from 'express';
import type { IAddressesControllers, ITokenManager } from '@/interfaces';
import { AuthMiddleware } from '@/middlewares';

export class AddressesRoutes {
  private readonly router: Router;

  constructor(
    private readonly addressesController: IAddressesControllers,
    private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    const protect = AuthMiddleware.authenticate(this.tokenManager);
    this.router.post(
      '/addresses',
      protect,
      this.addressesController.store.bind(this.addressesController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
