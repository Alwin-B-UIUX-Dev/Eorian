import type { NextFunction, Request, Response } from 'express';
import { CreateUserRoleDto, ResponseUserRoleDto } from '@/dtos';
import type { IUserRole, IUserRoleControllers, IUserRoleService } from '@/interfaces';
import type { IApiResponseData } from '@/types';
import { ApiResponseFactory } from '@/utils';

export class UserRoleController implements IUserRoleControllers {
  constructor(private readonly UserRoleService: IUserRoleService) {}
  index(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  show(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createUserRoleDto = new CreateUserRoleDto(req.body);
      const UserRole: IUserRole = await this.UserRoleService.create(createUserRoleDto);
      const UserRoleResponse: ResponseUserRoleDto = ResponseUserRoleDto.fromUserRole(UserRole);

      const response: IApiResponseData<{ UserRole: ResponseUserRoleDto }> =
        ApiResponseFactory.success('votre adresse a biuen été enregistré', {
          UserRole: UserRoleResponse
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
