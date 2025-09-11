import { Router } from 'express';
import type { IUserController } from '@/interfaces';
export class UserRoutes {
  private readonly router: Router;

  constructor(
    private readonly userController: IUserController
    // private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Routes publiques
    this.router.post('/user', this.userController.store.bind(this.userController));
    // Routes protégées
    // const protect = AuthMiddleware.authenticate(this.tokenManager);
    // this.router.post(
    //   '/user',
    //   protect,
    //   this.userController.store.bind(this.userController)
    // );
  }
  public getRouter(): Router {
    return this.router;
  }
}
