import type { NextFunction, Request, Response } from 'express';
import { CreateTaxRateDto, ResponseTaxRateDto } from '@/dtos';
import type { ITaxRateControllers, ITaxRateService } from '@/interfaces';
import { ApiResponseFactory } from '@/utils/ApiResponseFactory';

export class TaxRateController implements ITaxRateControllers {
  constructor(private readonly service: ITaxRateService) {}

  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;
      const roles = await this.service.findAll(limit, offset);
      res.json(
        ApiResponseFactory.success(
          'Tax fetched',
          roles.map(r => new ResponseTaxRateDto(r.toObject()))
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
          'Tax fetched',
          role ? new ResponseTaxRateDto(role.toObject()) : null
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = new CreateTaxRateDto(req.body);
      const role = await this.service.create({
        Name: dto.name,
        rate: dto.rate,
        description: dto.description,
        isActive: dto.isActive
      });
      res
        .status(201)
        .json(ApiResponseFactory.success('Tax created', new ResponseTaxRateDto(role.toObject())));
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
      res.json(ApiResponseFactory.success('Tax updated', new ResponseTaxRateDto(role.toObject())));
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
