import type { NextFunction, Request, Response } from 'express';
import { CreateUserSessionDto, ResponseUserSessionDto } from '@/dtos';
import type { IUserSession, IUserSessionController, IUserSessionService } from '@/interfaces';
import type { IApiResponseData } from '@/types';
import { ApiResponseFactory } from '@/utils';

export class UserSessionController implements IUserSessionController {
  constructor(private readonly UserSessionService: IUserSessionService) {}
  index(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  show(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createUserSessionDto = new CreateUserSessionDto(req.body);
      const UserSession: IUserSession = await this.UserSessionService.create(createUserSessionDto);
      const UserSessionResponse: ResponseUserSessionDto =
        ResponseUserSessionDto.fromUserSession(UserSession);

      const response: IApiResponseData<{ UserSession: ResponseUserSessionDto }> =
        ApiResponseFactory.success('votre adresse a biuen été enregistré', {
          UserSession: UserSessionResponse
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
