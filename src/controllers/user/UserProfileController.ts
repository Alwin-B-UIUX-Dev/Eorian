// src/controllers/user/UserProfileController.ts

import type { NextFunction, Request, Response } from 'express';
import { CreateUserProfileDto, ResponseUserProfileDto, UpdateUserProfileDto } from '@/dtos';
import type { IUserProfileController, IUserProfileService } from '@/interfaces';
import { ApiResponseFactory } from '@/utils';

export class UserProfileController implements IUserProfileController {
  constructor(private readonly service: IUserProfileService) {}

  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;
      const profiles = await this.service.findAll(limit, offset);
      res.json(
        ApiResponseFactory.success(
          'User profiles fetched',
          profiles.map(p => new ResponseUserProfileDto(p))
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await this.service.findOne(req.params.id);
      res.json(
        ApiResponseFactory.success(
          'User profile fetched',
          profile ? new ResponseUserProfileDto(profile) : null
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = new CreateUserProfileDto(req.body);
      const profile = await this.service.create(dto.getUserId(), {
        firstName: dto.getFirstName(),
        lastName: dto.getLastName(),
        phone: dto.getPhone(),
        birthDate: dto.getBirthDate(),
        avatarUrl: dto.getAvatarUrl() || ''
      });
      res
        .status(201)
        .json(
          ApiResponseFactory.success('User profile created', new ResponseUserProfileDto(profile))
        );
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = new UpdateUserProfileDto(req.body);
      const profile = await this.service.update(req.params.id, {
        firstName: dto.getFirstName(),
        lastName: dto.getLastName(),
        phone: dto.getPhone(),
        birthDate: dto.getBirthDate(),
        avatarUrl: dto.getAvatarUrl() || ''
      });
      res.json(
        ApiResponseFactory.success('User profile updated', new ResponseUserProfileDto(profile))
      );
    } catch (error) {
      next(error);
    }
  }

  public async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.service.remove(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
