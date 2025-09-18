import type { NextFunction, Request, Response } from 'express';

export interface IUserProfileController {
  index(req: Request, res: Response, next: NextFunction): Promise<void>;
  show(req: Request, res: Response, next: NextFunction): Promise<void>;
  store(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  destroy(req: Request, res: Response, next: NextFunction): Promise<void>;

  // Méthodes de gestion du compte utilisateur
  changeEmail(req: Request, res: Response, next: NextFunction): Promise<void>;
  changePassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  changeUsername(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void>;
}
