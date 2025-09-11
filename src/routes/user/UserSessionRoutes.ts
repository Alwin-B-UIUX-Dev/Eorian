import { Router } from 'express';
import type { IUserSessionController } from '@/interfaces';
export class UserSessionRoutes {
  private readonly router: Router;

  constructor(
    private readonly userSessionController: IUserSessionController
    // private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Routes publiques
    this.router.post(
      '/userSession',
      this.userSessionController.store.bind(this.userSessionController)
    );
    // Routes protégées
    // const protect = AuthMiddleware.authenticate(this.tokenManager);
    // this.router.post(
    //   '/userSession',
    //   protect,
    //   this.userSessionController.store.bind(this.userSessionController)
    // );
  }
  public getRouter(): Router {
    return this.router;
  }
}
