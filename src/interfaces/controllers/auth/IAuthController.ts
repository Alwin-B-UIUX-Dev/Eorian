// src/interfaces/controllers/IAuthController.ts
import type { NextFunction, Request, Response } from 'express';

/**
 * Interface pour le controller de gestion du profil utilisateur et authentification
 *
 * Opérations d'authentification et de gestion de compte personnel
 *
 * ISP : Contrat spécifique pour wrapper les controllers
 */
export interface IAuthController {
  /**
   * Méthode de AuthController pour la création d'un utilisateur
   *
   * Endpoint : POST api/v1/auth/register
   *
   * @param req - Requête HTTP du client contenant les données de l'utilisateur à créer
   * @param res - Réponse HTTP envoyée au client contenant les données de l'utilisateur nouvellement créé
   * @param next - Fonction de rappel pour passer au middleware suivant si besoin (erreur)
   *
   * @throws {ApiError} si la création de l'utilisateur échoue
   */
  register(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Méthode de AuthController pour la connexion d'un utilisateur
   *
   * Endpoint : POST api/v1/auth/login
   *
   * @param req - Requête HTTP du client contenant les données de l'utilisateur à connecter
   * @param res - Réponse HTTP envoyée au client contenant les données de l'utilisateur connecté
   * @param next - Fonction de rappel pour passer au middleware suivant si besoin (erreur)
   *
   * @throws {ApiError} si la connexion de l'utilisateur échoue
   */
  login(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Méthode de AuthController pour la déconnexion d'un utilisateur
   *
   * Endpoint : POST api/v1/auth/logout
   *
   * @param req - Requête HTTP du client contenant les données de l'utilisateur à déconnecter
   * @param res - Réponse HTTP envoyée au client contenant les données de l'utilisateur déconnecté
   * @param next - Fonction de rappel pour passer au middleware suivant si besoin (erreur)
   *
   * @throws {ApiError} si la déconnexion de l'utilisateur échoue
   */
  logout(req: Request, res: Response, next: NextFunction): Promise<void>;

  // Extensions futures logiques
  // forgotPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  // resetPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  // refreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  // verifyEmail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
