import type { NextFunction, Request, Response } from 'express';
import { CreateProductDto, ResponseProductDto } from '@/dtos';
import type { IProduct, IProductService } from '@/interfaces';
import type { IProductControllers } from '@/interfaces/controllers/product';
import type { IApiResponseData } from '@/types';
import { ApiResponse } from '@/utils';

export class ProductController implements IProductControllers {
  constructor(private readonly ProductService: IProductService) {}
  public async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async show(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createProductDto = new CreateProductDto(req.body);
      const Product: IProduct = await this.ProductService.create(createProductDto);
      const ProductResponse: ResponseProductDto = ResponseProductDto.fromProduct(Product);

      const response: IApiResponseData<{ adresses: ResponseProductDto }> = ApiResponse.success(
        'votre adresse a biuen été enregistré',
        { adresses: ProductResponse }
      );

      res.status(201).json(response);
    } catch {}
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public asyncdestroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
