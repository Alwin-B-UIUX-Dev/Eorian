import type { NextFunction, Request, Response } from 'express';
import { CreateUserPaymentMethodDto, ResponseUserPaymentMethodDto } from '@/dtos';
import type {
  IUserPaymentMethod,
  IUserPaymentMethodControllers,
  IUserPaymentMethodService
} from '@/interfaces';
import type { IApiResponseData } from '@/types';
import { ApiResponseFactory } from '@/utils';

export class UserPaymentMethodController implements IUserPaymentMethodControllers {
  constructor(private readonly UserPaymentMethodService: IUserPaymentMethodService) {}
  index(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  show(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createUserPaymentMethodDto = new CreateUserPaymentMethodDto(req.body);
      const UserPaymentMethod: IUserPaymentMethod = await this.UserPaymentMethodService.create(
        createUserPaymentMethodDto
      );
      const UserPaymentMethodResponse: ResponseUserPaymentMethodDto =
        ResponseUserPaymentMethodDto.fromUserPaymentMethod(UserPaymentMethod);

      const response: IApiResponseData<{ UserPaymentMethod: ResponseUserPaymentMethodDto }> =
        ApiResponseFactory.success('votre adresse a biuen été enregistré', {
          UserPaymentMethod: UserPaymentMethodResponse
        });

      res.status(201).json(response);
    } catch {}
  }
  update(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
