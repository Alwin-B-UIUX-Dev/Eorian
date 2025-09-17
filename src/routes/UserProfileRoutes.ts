// src/routes/UserProfileRoutes.ts

import { Router } from 'express';
import type { ITokenManager, IUserProfileController } from '@/interfaces';
import { AuthMiddleware } from '@/middlewares';

export class UserProfileRoutes {
  private readonly router: Router;

  constructor(
    private readonly userProfileController: IUserProfileController,
    private readonly tokenManager: ITokenManager
  ) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Routes protégées pour l'administration des profils utilisateur
    // Toutes les routes nécessitent une authentification admin

    // Routes CRUD pour les profils utilisateur
    this.router.get(
      '/user-profiles',
      AuthMiddleware.authenticate(this.tokenManager),
      AuthMiddleware.authenticateRole('admin'),
      this.userProfileController.index.bind(this.userProfileController)
    );

    this.router.get(
      '/user-profiles/:id',
      AuthMiddleware.authenticate(this.tokenManager),
      AuthMiddleware.authenticateRole('admin'),
      this.userProfileController.show.bind(this.userProfileController)
    );

    this.router.post(
      '/user-profiles',
      AuthMiddleware.authenticate(this.tokenManager),
      AuthMiddleware.authenticateRole('admin'),
      this.userProfileController.store.bind(this.userProfileController)
    );

    this.router.put(
      '/user-profiles/:id',
      AuthMiddleware.authenticate(this.tokenManager),
      AuthMiddleware.authenticateRole('admin'),
      this.userProfileController.update.bind(this.userProfileController)
    );

    this.router.delete(
      '/user-profiles/:id',
      AuthMiddleware.authenticate(this.tokenManager),
      AuthMiddleware.authenticateRole('admin'),
      this.userProfileController.destroy.bind(this.userProfileController)
    );

    // Routes futures pour la gestion du compte utilisateur
    // (décommenter si nécessaire)

    // this.router.put(
    //   '/account/email',
    //   AuthMiddleware.authenticate(this.tokenManager),
    //   this.userProfileController.changeEmail.bind(this.userProfileController)
    // );

    // this.router.put(
    //   '/account/password',
    //   AuthMiddleware.authenticate(this.tokenManager),
    //   this.userProfileController.changePassword.bind(this.userProfileController)
    // );

    // this.router.put(
    //   '/account/username',
    //   AuthMiddleware.authenticate(this.tokenManager),
    //   this.userProfileController.changeUsername.bind(this.userProfileController)
    // );

    // this.router.delete(
    //   '/account',
    //   AuthMiddleware.authenticate(this.tokenManager),
    //   this.userProfileController.deleteAccount.bind(this.userProfileController)
    // );
  }

  public getRouter(): Router {
    return this.router;
  }
}
