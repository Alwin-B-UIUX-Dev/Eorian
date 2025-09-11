import type { NextFunction, Request, Response } from 'express';

export interface IUserController {
  // ===== CONTEXTE ADMIN (Back-office) =====
  /**
   * Lister tous les utilisateurs (Administration)
   * Endpoint: GET /api/v1/users
   */
  index(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Afficher un utilisateur spécifique (Administration)
   * Endpoint: GET /api/v1/users/:id
   */
  // show(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Créer un nouvel utilisateur (Administration)
   * Endpoint: POST /api/v1/users
   */
  store(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Modifier un utilisateur (Administration)
   * Endpoint: PUT /api/v1/users/:id
   */
  // update(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Supprimer un utilisateur (Administration)
   * Endpoint: DELETE /api/v1/users/:id
   */
  // destroy(req: Request, res: Response, next: NextFunction): Promise<void>;
}
