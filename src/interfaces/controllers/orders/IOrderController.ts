import type { NextFunction, Request, Response } from 'express';

export interface IOrderController {
  index(req: Request, res: Response, next: NextFunction): Promise<void>;
  show(req: Request, res: Response, next: NextFunction): Promise<void>;
  store(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  destroy(req: Request, res: Response, next: NextFunction): Promise<void>;
  findByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
  findByStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
  findByPaymentStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
}
