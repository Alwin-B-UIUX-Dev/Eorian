import type { NextFunction, Request, Response } from 'express';
import { ResponseUserDto } from '@/dtos';
import { CreateUserDto } from '@/dtos/user/CreateUserDto';
import type { IUser, IUserController, IUserService } from '@/interfaces';
import type { IApiResponseData } from '@/types';
import { ApiResponseFactory } from '@/utils';
export class UserController implements IUserController {
  constructor(private readonly UserService: IUserService) {}
  index(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  show(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createUserDto = new CreateUserDto(req.body);
      const User: IUser = await this.UserService.create(createUserDto);
      const UserResponse: ResponseUserDto = ResponseUserDto.fromUser(User);

      const response: IApiResponseData<{ User: ResponseUserDto }> = ApiResponseFactory.success(
        'votre adresse a biuen été enregistré',
        { User: UserResponse }
      );

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
