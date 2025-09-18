// src/controllers/user/UserRoleController.ts

import type { NextFunction, Request, Response } from 'express';
import { CreateUserRoleDto } from '@/dtos/user/admin/CreateUserRoleDto';
import { ResponseUserRoleDto } from '@/dtos/user/admin/ResponseUserRoleDto';
import type { IUserRoleController } from '@/interfaces/controllers/user/IUserRoleController';
import type { IUserRoleService } from '@/interfaces/services/user/IUserRoleService';
import { ApiResponseFactory } from '@/utils/ApiResponseFactory';

export class UserRoleController implements IUserRoleController {
  constructor(private readonly service: IUserRoleService) {}

  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;
      const roles = await this.service.findAll(limit, offset);
      res.json(
        ApiResponseFactory.success(
          'Roles fetched',
          roles.map(r => new ResponseUserRoleDto(r.toObject()))
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idNum: number = Number(String(req.params.id).trim());
      if (!Number.isInteger(idNum) || idNum <= 0) {
        res.status(400).json(ApiResponseFactory.error('Invalid id parameter', '400'));
        return;
      }
      const role = await this.service.findOne(String(idNum));
      res.json(
        ApiResponseFactory.success(
          'Role fetched',
          role ? new ResponseUserRoleDto(role.toObject()) : null
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = new CreateUserRoleDto(req.body);
      const role = await this.service.create({
        roleName: dto.roleName,
        description: dto.description
      });
      res
        .status(201)
        .json(ApiResponseFactory.success('Role created', new ResponseUserRoleDto(role.toObject())));
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idNum: number = Number(String(req.params.id).trim());
      if (!Number.isInteger(idNum) || idNum <= 0) {
        res.status(400).json(ApiResponseFactory.error('Invalid id parameter', '400'));
        return;
      }
      const role = await this.service.update(String(idNum), req.body);
      res.json(
        ApiResponseFactory.success('Role updated', new ResponseUserRoleDto(role.toObject()))
      );
    } catch (error) {
      next(error);
    }
  }

  public async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idNum: number = Number(String(req.params.id).trim());
      if (!Number.isInteger(idNum) || idNum <= 0) {
        res.status(400).json(ApiResponseFactory.error('Invalid id parameter', '400'));
        return;
      }
      await this.service.remove(String(idNum));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
