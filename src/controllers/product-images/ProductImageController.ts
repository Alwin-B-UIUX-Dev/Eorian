import { NextFunction, Request, Response } from 'express';
import { ApiResponseFactory } from '@/utils';
import { CreateProductImageDto } from '@/dtos/product-images/admin/CreateProductImageDto';
import { ResponseProductImageDto } from '@/dtos/product-images/admin/ResponseProductImageDto';
import type { IProductImageController, IProductImageService } from '@/interfaces';

export class ProductImageController implements IProductImageController {
  constructor(private readonly service: IProductImageService) {}

  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;
      const images = await this.service.findAll(limit, offset);
      res.json(
        ApiResponseFactory.success(
          'Product images fetched',
          images.map(image => new ResponseProductImageDto(image.toData()))
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
      const image = await this.service.findOne(String(idNum));
      res.json(
        ApiResponseFactory.success(
          'Product image fetched',
          image ? new ResponseProductImageDto(image.toData()) : null
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = new CreateProductImageDto(req.body);
      const image = await this.service.create({
        productId: dto.productId,
        imageUrl: dto.imageUrl,
        altText: dto.altText,
        isPrimary: dto.isPrimary,
        sortOrder: dto.sortOrder,
        uploadedBy: dto.uploadedBy
      });
      res
        .status(201)
        .json(
          ApiResponseFactory.success(
            'Product image created',
            new ResponseProductImageDto(image.toData())
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
      const image = await this.service.update(String(idNum), req.body);
      res.json(
        ApiResponseFactory.success('Product image updated', new ResponseProductImageDto(image.toData()))
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

  public async findByProductId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productIdNum: number = Number(String(req.params.productId).trim());
      if (!Number.isInteger(productIdNum) || productIdNum <= 0) {
        res.status(400).json(ApiResponseFactory.error('Invalid productId parameter', '400'));
        return;
      }
      const images = await this.service.findByProductId(String(productIdNum));
      res.json(
        ApiResponseFactory.success(
          'Product images fetched',
          images.map(image => new ResponseProductImageDto(image.toData()))
        )
      );
    } catch (error) {
      next(error);
    }
  }
}
