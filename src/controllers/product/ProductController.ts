import type { NextFunction, Request, Response } from 'express';
import { CreateProductDto, ResponseProductDto } from '@/dtos';
import type { IProduct, IProductControllers, IProductService } from '@/interfaces';
import type { IApiResponseData } from '@/types';
import { ApiResponseFactory } from '@/utils';

export class ProductController implements IProductControllers {
  constructor(private readonly ProductService: IProductService) {}
  index(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  show(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createProductDto = new CreateProductDto(req.body);
      const Product: IProduct = await this.ProductService.create(createProductDto);
      const ProductResponse: ResponseProductDto = ResponseProductDto.fromProduct(Product);

      const response: IApiResponseData<{ Product: ResponseProductDto }> =
        ApiResponseFactory.success('votre adresse a biuen été enregistré', {
          Product: ProductResponse
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
