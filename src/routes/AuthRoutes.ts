// src/routes/AuthRoutes.ts
import { Router } from 'express';
import type { IAuthController, ITokenManager } from '@/interfaces';
import { AuthMiddleware } from '@/middlewares/AuthMiddleware';

export class AuthRoutes {
  private readonly router: Router;

  constructor(
    private readonly authController: IAuthController,
    private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Routes publiques
    this.router.post('/auth/register', this.authController.register.bind(this.authController));
    this.router.post('/auth/login', this.authController.login.bind(this.authController));

    // Routes protégées
    this.router.post(
      '/auth/logout',
      AuthMiddleware.authenticate(this.tokenManager),
      this.authController.logout.bind(this.authController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
