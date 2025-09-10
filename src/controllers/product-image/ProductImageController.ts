import type { NextFunction, Request, Response } from 'express';
import { CreateProductImageDto, ResponseProductImageDto } from '@/dtos';
import type { IProductImage, IProductImageControllers, IProductImageService } from '@/interfaces';
import type { IApiResponseData } from '@/types';
import { ApiResponseFactory } from '@/utils';

export class ProductImageController implements IProductImageControllers {
  constructor(private readonly ProductImageService: IProductImageService) {}
  index(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  show(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createProductImageDto = new CreateProductImageDto(req.body);
      const ProductImage: IProductImage =
        await this.ProductImageService.create(createProductImageDto);
      const ProductImageResponse: ResponseProductImageDto =
        ResponseProductImageDto.fromProductImage(ProductImage);

      const response: IApiResponseData<{ ProductImage: ResponseProductImageDto }> =
        ApiResponseFactory.success('votre adresse a biuen été enregistré', {
          ProductImage: ProductImageResponse
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
