import type { NextFunction, Request, Response } from 'express';
import { CreateAdressesDto, ResponseAddressesDto } from '@/dtos';
import type { IAddresses, IAddressesControllers, IAdressesService } from '@/interfaces';
import type { IApiResponseData } from '@/types';
import { ApiResponse } from '@/utils';

export class AdressesController implements IAddressesControllers {
  constructor(private readonly addressesService: IAdressesService) {}
  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async show(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createAddressesDto = new CreateAdressesDto(req.body);
      const addresses: IAddresses = await this.addressesService.create(createAddressesDto);
      const addressesResponse: ResponseAddressesDto = ResponseAddressesDto.fromAddresses(addresses);

      const response: IApiResponseData<{ adresses: ResponseAddressesDto }> = ApiResponse.success(
        'votre adresse a biuen été enregistré',
        { adresses: addressesResponse }
      );

      res.status(201).json(response);
    } catch {}
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
