import type { NextFunction, Request, Response } from 'express';
import { CreateTaxRateDto, ResponseTaxRateDto } from '@/dtos';
import type { ITaxRate, ITaxRateControllers, ITaxRateService } from '@/interfaces';
import type { IApiResponseData } from '@/types';
import { ApiResponseFactory } from '@/utils';

export class TaxRateController implements ITaxRateControllers {
  constructor(private readonly TaxRateService: ITaxRateService) {}
  index(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  show(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createTaxRateDto = new CreateTaxRateDto(req.body);
      const TaxRate: ITaxRate = await this.TaxRateService.create(createTaxRateDto);
      const TaxRateResponse: ResponseTaxRateDto = ResponseTaxRateDto.fromTaxRate(TaxRate);

      const response: IApiResponseData<{ TaxRate: ResponseTaxRateDto }> =
        ApiResponseFactory.success('votre adresse a biuen été enregistré', {
          TaxRate: TaxRateResponse
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
