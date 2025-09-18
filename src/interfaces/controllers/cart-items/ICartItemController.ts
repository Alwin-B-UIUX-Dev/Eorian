import type { NextFunction, Request, Response } from 'express';

export interface ICartItemController {
  index(req: Request, res: Response, next: NextFunction): Promise<void>;
  show(req: Request, res: Response, next: NextFunction): Promise<void>;
  store(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  destroy(req: Request, res: Response, next: NextFunction): Promise<void>;
  findByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
  addToCart(req: Request, res: Response, next: NextFunction): Promise<void>;
  removeFromCart(req: Request, res: Response, next: NextFunction): Promise<void>;
  clearCart(req: Request, res: Response, next: NextFunction): Promise<void>;
}
