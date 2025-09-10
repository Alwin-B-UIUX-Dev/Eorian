import type { NextFunction, Request, Response } from 'express';
import { CreateUserProfileDto, ResponseUserProfileDto } from '@/dtos';
import type { IUserProfile, IUserProfileController, IUserProfileService } from '@/interfaces';
import type { IApiResponseData } from '@/types';
import { ApiResponseFactory } from '@/utils';
export class UserProfileController implements IUserProfileController {
  constructor(private readonly UserProfileService: IUserProfileService) {}
  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createUserProfileDto = new CreateUserProfileDto(req.body);
      const UserProfile: IUserProfile = await this.UserProfileService.create(createUserProfileDto);
      const UserProfileResponse: ResponseUserProfileDto =
        ResponseUserProfileDto.fromUserProfile(UserProfile);

      const response: IApiResponseData<{ UserProfile: ResponseUserProfileDto }> =
        ApiResponseFactory.success('votre adresse a biuen été enregistré', {
          UserProfile: UserProfileResponse
        });

      res.status(201).json(response);
    } catch {}
  }
  changeEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  changeUsername(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  index(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  show(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
