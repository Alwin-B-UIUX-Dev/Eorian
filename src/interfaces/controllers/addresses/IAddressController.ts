import type { NextFunction, Request, Response } from 'express';

export interface IAddressController {
  index(req: Request, res: Response, next: NextFunction): Promise<void>;
  show(req: Request, res: Response, next: NextFunction): Promise<void>;
  store(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  destroy(req: Request, res: Response, next: NextFunction): Promise<void>;
  findByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
  findByUserIdAndType(req: Request, res: Response, next: NextFunction): Promise<void>;
  findDefaultByUserIdAndType(req: Request, res: Response, next: NextFunction): Promise<void>;
}
