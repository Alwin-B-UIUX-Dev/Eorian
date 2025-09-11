import { Router } from 'express';
import type { IUserProfileController } from '@/interfaces';
export class UserProfileRoutes {
  private readonly router: Router;

  constructor(
    private readonly userProfileController: IUserProfileController
    // private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Routes publiques
    this.router.post(
      '/userProfile',
      this.userProfileController.store.bind(this.userProfileController)
    );
    // Routes protégées
    // const protect = AuthMiddleware.authenticate(this.tokenManager);
    // this.router.post(
    //   '/userProfile',
    //   protect,
    //   this.userProfileController.store.bind(this.userProfileController)
    // );
  }
  public getRouter(): Router {
    return this.router;
  }
}
