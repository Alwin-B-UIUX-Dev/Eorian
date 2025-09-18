// src/routes/UserRoutes.ts

import { Router } from 'express';
import type { ITokenManager, IUserController } from '@/interfaces';
import { AuthMiddleware } from '@/middlewares';

export class UserRoutes {
  private readonly router: Router;

  constructor(
    private readonly userController: IUserController,
    private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Routes protégées pour l'administration des utilisateurs
    // Toutes les routes nécessitent une authentification admin

    this.router.get(
      '/users',
      AuthMiddleware.authenticate(this.tokenManager),
      AuthMiddleware.authenticateRole('admin'),
      this.userController.index.bind(this.userController)
    );

    this.router.get(
      '/users/:id',
      AuthMiddleware.authenticate(this.tokenManager),
      AuthMiddleware.authenticateRole('admin'),
      this.userController.show.bind(this.userController)
    );

    // Routes futures pour l'administration complète des utilisateurs
    // (décommenter si nécessaire)

    // this.router.put(
    //   '/users/:id',
    //   AuthMiddleware.authenticate(this.tokenManager),
    //   AuthMiddleware.requireRole(['admin']),
    //   this.userController.update.bind(this.userController)
    // );

    this.router.delete(
      '/users/:id',
      AuthMiddleware.authenticate(this.tokenManager),
      AuthMiddleware.authenticateRole('admin'),
      this.userController.destroy.bind(this.userController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
