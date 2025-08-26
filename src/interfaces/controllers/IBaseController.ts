import type { NextFunction, Request, Response } from "express";
export interface IBaseController {
  /**
   * lister toutes les lignes d'une entité (tous les utilisateurs)
   *
   * @param req
   * @param res
   * @param next
   */
  index(req: Request, res: Response, next: NextFunction): Promise<void>;
  /**
   * afficher une ligne de notre entité(exemple un utilisateur)
   *
   * @param req
   * @param res
   * @param next
   */
  show(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Créer un élément dans l'entité (crée un utilisateur)
   *
   * @param req
   * @param res
   * @param next
   */
  store(req: Request, res: Response, next: NextFunction): Promise<void>;
  /**
   * modifier un élément ou row d'une entité (exemple modifier un utilisateur)
   *
   * @param req
   * @param res
   * @param next
   */
  update(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * supprime un élément ou row d'une entité (exemple modifier un utilisateur)
   *
   * @param req
   * @param res
   * @param next
   */
  destroy(req: Request, res: Response, next: NextFunction): Promise<void>;
}
