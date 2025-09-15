// src/controllers/tax-rates/TaxeRateController.ts

import type { NextFunction, Request, Response } from 'express';
import { CreateTaxeRateDto } from '@/dtos/tax-rates/admin/CreateTaxeRateDto';
import { ResponseTaxeRateDto } from '@/dtos/tax-rates/admin/ResponseTaxeRateDto';
import type { ITaxeRateController } from '@/interfaces/controllers/tax-rates/ITaxeRateController';
import type { ITaxeRateService } from '@/interfaces/services/tax-rates/ITaxeRateService';
import { ApiResponseFactory } from '@/utils/ApiResponseFactory';

export class TaxeRateController implements ITaxeRateController {
  constructor(private readonly service: ITaxeRateService) {}

  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;
      const taxeRates = await this.service.findAll(limit, offset);
      res.json(
        ApiResponseFactory.success(
          'Taxe rates fetched',
          taxeRates.map(tr => new ResponseTaxeRateDto(tr.toObject()))
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
      const taxeRate = await this.service.findOne(String(idNum));
      res.json(
        ApiResponseFactory.success(
          'Taxe rate fetched',
          taxeRate ? new ResponseTaxeRateDto(taxeRate.toObject()) : null
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = new CreateTaxeRateDto(req.body);
      const taxeRate = await this.service.create({
        name: dto.name,
        rate: dto.rate,
        description: dto.description,
        isActive: dto.isActive
      });
      res
        .status(201)
        .json(
          ApiResponseFactory.success(
            'Taxe rate created',
            new ResponseTaxeRateDto(taxeRate.toObject())
          )
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
      const taxeRate = await this.service.update(String(idNum), req.body);
      res.json(
        ApiResponseFactory.success(
          'Taxe rate updated',
          new ResponseTaxeRateDto(taxeRate.toObject())
        )
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
