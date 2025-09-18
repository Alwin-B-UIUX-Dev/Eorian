import type { NextFunction, Request, Response } from 'express';

export interface IOrderItemController {
  index(req: Request, res: Response, next: NextFunction): Promise<void>;
  show(req: Request, res: Response, next: NextFunction): Promise<void>;
  store(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  destroy(req: Request, res: Response, next: NextFunction): Promise<void>;
  findByOrderId(req: Request, res: Response, next: NextFunction): Promise<void>;
  findByProductId(req: Request, res: Response, next: NextFunction): Promise<void>;
}
