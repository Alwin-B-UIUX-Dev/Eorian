// src/controllers/products/ProductController.ts

import type { NextFunction, Request, Response } from 'express';
import { CreateProductDto, ResponseProductDto } from '@/dtos/products';
import type { IProductController } from '@/interfaces/controllers/products';
import type { IProductService } from '@/interfaces/services/products';
import type { IProductImageService } from '@/interfaces/services/product-images';
import { ApiResponseFactory } from '@/utils';

export class ProductController implements IProductController {
  constructor(
    private readonly service: IProductService,
    private readonly imageService: IProductImageService
  ) {}

  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;
      const products = await this.service.findAll(limit, offset);
      res.json(
        ApiResponseFactory.success(
          'Products fetched',
          products.map(p => new ResponseProductDto(p.toData()))
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
      const product = await this.service.findOne(String(idNum));
      res.json(
        ApiResponseFactory.success(
          'Product fetched',
          product ? new ResponseProductDto(product.toData()) : null
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = new CreateProductDto(req.body);
      const product = await this.service.create({
        name: dto.name,
        slug: dto.slug,
        sku: dto.sku,
        shortDescription: dto.shortDescription,
        description: dto.description,
        priceCents: dto.priceCents,
        taxRateId: dto.taxRateId,
        stockQuantity: dto.stockQuantity,
        lowStockThreshold: dto.lowStockThreshold,
        manageStock: dto.manageStock,
        metaTitle: dto.metaTitle,
        metaDescription: dto.metaDescription,
        isActive: dto.isActive,
        createdBy: dto.createdBy
      });

      // Gérer l'image principale si fournie
      if (req.body.primaryImageUrl) {
        await this.imageService.create({
          productId: parseInt(product.getId()),
          imageUrl: req.body.primaryImageUrl,
          altText: req.body.primaryImageAlt || null,
          isPrimary: true,
          sortOrder: 1,
          uploadedBy: dto.createdBy
        });
      }

      res
        .status(201)
        .json(
          ApiResponseFactory.success('Product created', new ResponseProductDto(product.toData()))
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
      const product = await this.service.update(String(idNum), req.body);
      res.json(
        ApiResponseFactory.success('Product updated', new ResponseProductDto(product.toData()))
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
