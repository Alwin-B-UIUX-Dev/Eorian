import { Router } from 'express';
import type { IUserRoleControllers } from '@/interfaces';
export class UserRoleRoutes {
  private readonly router: Router;

  constructor(
    private readonly userRoleController: IUserRoleControllers
    // private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Routes publiques
    this.router.post('/userRole', this.userRoleController.store.bind(this.userRoleController));
    // Routes protégées
    // const protect = AuthMiddleware.authenticate(this.tokenManager);
    // this.router.post(
    //   '/userRole',
    //   protect,
    //   this.userRoleController.store.bind(this.userRoleController)
    // );
  }
  public getRouter(): Router {
    return this.router;
  }
}
