import type { NextFunction, Request, Response } from 'express';

export interface IUserProfileController {
  store: any;
  // ===== CONTEXTE UTILISATEUR (Mon compte) =====
  /**
   * Modifier l'email de l'utilisateur connecté
   * Endpoint: PUT /api/v1/account/email
   */
  changeEmail(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Modifier le mot de passe de l'utilisateur connecté
   * Endpoint: PUT /api/v1/account/password
   */
  changePassword(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Modifier le nom d'utilisateur de l'utilisateur connecté
   * Endpoint: PUT /api/v1/account/username
   */
  changeUsername(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Supprimer le compte de l'utilisateur connecté
   * Endpoint: DELETE /api/v1/account
   */
  deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void>;
}
