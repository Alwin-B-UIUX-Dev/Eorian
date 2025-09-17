// src/controllers/addresses/AddressController.ts

import type { NextFunction, Request, Response } from 'express';
import { CreateAddressDto, ResponseAddressDto } from '@/dtos';
import type { IAddressController, IAddressService } from '@/interfaces';
import { ApiResponseFactory } from '@/utils';

export class AddressController implements IAddressController {
  constructor(private readonly service: IAddressService) {}

  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;
      const addresses = await this.service.findAll(limit, offset);
      res.json(
        ApiResponseFactory.success(
          'Addresses fetched',
          addresses.map(addr => new ResponseAddressDto(addr.toData()))
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
      const address = await this.service.findOne(String(idNum));
      res.json(
        ApiResponseFactory.success(
          'Address fetched',
          address ? new ResponseAddressDto(address.toData()) : null
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = new CreateAddressDto(req.body);
      const address = await this.service.create({
        userId: dto.userId,
        type: dto.type,
        firstName: dto.firstName,
        lastName: dto.lastName,
        company: dto.company,
        phone: dto.phone,
        addressLine1: dto.addressLine1,
        addressLine2: dto.addressLine2,
        city: dto.city,
        postalCode: dto.postalCode,
        stateRegion: dto.stateRegion,
        country: dto.country,
        isDefault: dto.isDefault
      });
      res
        .status(201)
        .json(
          ApiResponseFactory.success('Address created', new ResponseAddressDto(address.toData()))
        );
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
      const address = await this.service.update(String(idNum), req.body);
      res.json(
        ApiResponseFactory.success('Address updated', new ResponseAddressDto(address.toData()))
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

  public async findByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId: string = String(req.params.userId).trim();
      if (!userId) {
        res.status(400).json(ApiResponseFactory.error('User ID is required', '400'));
        return;
      }
      const addresses = await this.service.findByUserId(userId);
      res.json(
        ApiResponseFactory.success(
          'User addresses fetched',
          addresses.map(addr => new ResponseAddressDto(addr.toData()))
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async findByUserIdAndType(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId: string = String(req.params.userId).trim();
      const type = req.params.type as 'shipping' | 'billing' | 'both';

      if (!userId) {
        res.status(400).json(ApiResponseFactory.error('User ID is required', '400'));
        return;
      }

      if (!['shipping', 'billing', 'both'].includes(type)) {
        res.status(400).json(ApiResponseFactory.error('Invalid type parameter', '400'));
        return;
      }

      const addresses = await this.service.findByUserIdAndType(userId, type);
      res.json(
        ApiResponseFactory.success(
          'User addresses by type fetched',
          addresses.map(addr => new ResponseAddressDto(addr.toData()))
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async findDefaultByUserIdAndType(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId: string = String(req.params.userId).trim();
      const type = req.params.type as 'shipping' | 'billing' | 'both';

      if (!userId) {
        res.status(400).json(ApiResponseFactory.error('User ID is required', '400'));
        return;
      }

      if (!['shipping', 'billing', 'both'].includes(type)) {
        res.status(400).json(ApiResponseFactory.error('Invalid type parameter', '400'));
        return;
      }

      const address = await this.service.findDefaultByUserIdAndType(userId, type);
      res.json(
        ApiResponseFactory.success(
          'Default address fetched',
          address ? new ResponseAddressDto(address.toData()) : null
        )
      );
    } catch (error) {
      next(error);
    }
  }
}
