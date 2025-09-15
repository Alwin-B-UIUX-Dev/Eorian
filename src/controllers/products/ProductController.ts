// src/controllers/products/ProductController.ts

import type { NextFunction, Request, Response } from 'express';
import { logger } from '@/configs';
import {
  CreateProductDto,
  ResponseProductDto,
  UpdateProductDto,
  UpdateStatusDto,
  UpdateStockDto
} from '@/dtos';
import { ApiError } from '@/exceptions';
import type { IProductController, IProductService } from '@/interfaces';
import type { CreateProductData, IApiResponseData, UpdateProductData } from '@/types';

export class ProductController implements IProductController {
  constructor(private readonly productService: IProductService) {}

  // =============================================
  // ENDPOINTS CRUD DE BASE
  // =============================================

  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : undefined;

      logger.info('Getting all products', {
        operation: 'GET_ALL_PRODUCTS',
        limit,
        offset
      });

      const products = await this.productService.findAll(limit, offset);
      const responseData: IApiResponseData = {
        success: true,
        message: 'Products retrieved successfully',
        data: products.map(product => ResponseProductDto.fromEntity(product).toObject()),
        meta: {
          timestamp: new Date().toISOString(),
          pagination: {
            page: Math.floor((offset || 0) / (limit || 10)) + 1,
            limit: limit || 10,
            total: products.length,
            totalPages: Math.ceil(products.length / (limit || 10))
          }
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      logger.info('Getting product by ID', {
        operation: 'GET_PRODUCT_BY_ID',
        productId: id
      });

      const product = await this.productService.findOne(id);

      if (!product) {
        throw new ApiError('Product not found', 404);
      }

      const responseData: IApiResponseData = {
        success: true,
        message: 'Product retrieved successfully',
        data: ResponseProductDto.fromEntity(product).toObject(),
        meta: {
          timestamp: new Date().toISOString()
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async showBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slug } = req.params;

      logger.info('Getting product by slug', {
        operation: 'GET_PRODUCT_BY_SLUG',
        slug
      });

      const product = await this.productService.findBySlug(slug);

      if (!product) {
        throw new ApiError('Product not found', 404);
      }

      const responseData: IApiResponseData = {
        success: true,
        message: 'Product retrieved successfully',
        data: ResponseProductDto.fromEntity(product).toObject(),
        meta: {
          timestamp: new Date().toISOString()
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async showBySku(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { sku } = req.params;

      logger.info('Getting product by SKU', {
        operation: 'GET_PRODUCT_BY_SKU',
        sku
      });

      const product = await this.productService.findBySku(sku);

      if (!product) {
        throw new ApiError('Product not found', 404);
      }

      const responseData: IApiResponseData = {
        success: true,
        message: 'Product retrieved successfully',
        data: ResponseProductDto.fromEntity(product).toObject(),
        meta: {
          timestamp: new Date().toISOString()
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name } = req.query;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : undefined;

      if (!name || typeof name !== 'string') {
        throw new ApiError('Name parameter is required for search', 400);
      }

      logger.info('Searching products by name', {
        operation: 'SEARCH_PRODUCTS_BY_NAME',
        name,
        limit,
        offset
      });

      const products = await this.productService.findByName(name, limit, offset);

      const responseData: IApiResponseData = {
        success: true,
        message: 'Products found successfully',
        data: products.map(product => ResponseProductDto.fromEntity(product).toObject()),
        meta: {
          timestamp: new Date().toISOString(),
          pagination: {
            page: Math.floor((offset || 0) / (limit || 10)) + 1,
            limit: limit || 10,
            total: products.length,
            totalPages: Math.ceil(products.length / (limit || 10))
          }
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async findActive(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : undefined;

      logger.info('Getting active products', {
        operation: 'GET_ACTIVE_PRODUCTS',
        limit,
        offset
      });

      const products = await this.productService.findActive(limit, offset);

      const responseData: IApiResponseData = {
        success: true,
        message: 'Active products retrieved successfully',
        data: products.map(product => ResponseProductDto.fromEntity(product).toObject()),
        meta: {
          timestamp: new Date().toISOString(),
          pagination: {
            page: Math.floor((offset || 0) / (limit || 10)) + 1,
            limit: limit || 10,
            total: products.length,
            totalPages: Math.ceil(products.length / (limit || 10))
          }
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async findOutOfStock(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : undefined;

      logger.info('Getting out of stock products', {
        operation: 'GET_OUT_OF_STOCK_PRODUCTS',
        limit,
        offset
      });

      const products = await this.productService.findOutOfStock(limit, offset);

      const responseData: IApiResponseData = {
        success: true,
        message: 'Out of stock products retrieved successfully',
        data: products.map(product => ResponseProductDto.fromEntity(product).toObject()),
        meta: {
          timestamp: new Date().toISOString(),
          pagination: {
            page: Math.floor((offset || 0) / (limit || 10)) + 1,
            limit: limit || 10,
            total: products.length,
            totalPages: Math.ceil(products.length / (limit || 10))
          }
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async findLowStock(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : undefined;

      logger.info('Getting low stock products', {
        operation: 'GET_LOW_STOCK_PRODUCTS',
        limit,
        offset
      });

      const products = await this.productService.findLowStock(limit, offset);

      const responseData: IApiResponseData = {
        success: true,
        message: 'Low stock products retrieved successfully',
        data: products.map(product => ResponseProductDto.fromEntity(product).toObject()),
        meta: {
          timestamp: new Date().toISOString(),
          pagination: {
            page: Math.floor((offset || 0) / (limit || 10)) + 1,
            limit: limit || 10,
            total: products.length,
            totalPages: Math.ceil(products.length / (limit || 10))
          }
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async findByCreator(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { createdBy } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : undefined;

      logger.info('Getting products by creator', {
        operation: 'GET_PRODUCTS_BY_CREATOR',
        createdBy,
        limit,
        offset
      });

      const products = await this.productService.findByCreator(createdBy, limit, offset);

      const responseData: IApiResponseData = {
        success: true,
        message: 'Products by creator retrieved successfully',
        data: products.map(product => ResponseProductDto.fromEntity(product).toObject()),
        meta: {
          timestamp: new Date().toISOString(),
          pagination: {
            page: Math.floor((offset || 0) / (limit || 10)) + 1,
            limit: limit || 10,
            total: products.length,
            totalPages: Math.ceil(products.length / (limit || 10))
          }
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async findByTaxRate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { taxRateId } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : undefined;

      logger.info('Getting products by tax rate', {
        operation: 'GET_PRODUCTS_BY_TAX_RATE',
        taxRateId,
        limit,
        offset
      });

      const products = await this.productService.findByTaxRate(taxRateId, limit, offset);

      const responseData: IApiResponseData = {
        success: true,
        message: 'Products by tax rate retrieved successfully',
        data: products.map(product => ResponseProductDto.fromEntity(product).toObject()),
        meta: {
          timestamp: new Date().toISOString(),
          pagination: {
            page: Math.floor((offset || 0) / (limit || 10)) + 1,
            limit: limit || 10,
            total: products.length,
            totalPages: Math.ceil(products.length / (limit || 10))
          }
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      logger.info('Creating new product', {
        operation: 'CREATE_PRODUCT'
      });

      const createProductDto = CreateProductDto.fromRequest(req.body);
      const product = await this.productService.create(
        createProductDto.toObject() as CreateProductData
      );

      const responseData: IApiResponseData = {
        success: true,
        message: 'Product created successfully',
        data: ResponseProductDto.fromEntity(product).toObject(),
        meta: {
          timestamp: new Date().toISOString()
        }
      };

      res.status(201).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      logger.info('Updating product', {
        operation: 'UPDATE_PRODUCT',
        productId: id
      });

      const updateProductDto = UpdateProductDto.fromRequest(req.body);
      const product = await this.productService.update(
        id,
        updateProductDto.toObject() as Partial<UpdateProductData>
      );

      const responseData: IApiResponseData = {
        success: true,
        message: 'Product updated successfully',
        data: ResponseProductDto.fromEntity(product).toObject(),
        meta: {
          timestamp: new Date().toISOString()
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async updateStock(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      logger.info('Updating product stock', {
        operation: 'UPDATE_PRODUCT_STOCK',
        productId: id
      });

      const updateStockDto = UpdateStockDto.fromRequest(req.body);
      const product = await this.productService.updateStock(id, updateStockDto.stockQuantity);

      const responseData: IApiResponseData = {
        success: true,
        message: 'Product stock updated successfully',
        data: ResponseProductDto.fromEntity(product).toObject(),
        meta: {
          timestamp: new Date().toISOString()
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      logger.info('Updating product status', {
        operation: 'UPDATE_PRODUCT_STATUS',
        productId: id
      });

      const updateStatusDto = UpdateStatusDto.fromRequest(req.body);
      const product = await this.productService.updateStatus(id, updateStatusDto.isActive);

      const responseData: IApiResponseData = {
        success: true,
        message: 'Product status updated successfully',
        data: ResponseProductDto.fromEntity(product).toObject(),
        meta: {
          timestamp: new Date().toISOString()
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      logger.info('Removing product', {
        operation: 'REMOVE_PRODUCT',
        productId: id
      });

      await this.productService.remove(id);

      const responseData: IApiResponseData = {
        success: true,
        message: 'Product removed successfully',
        meta: {
          timestamp: new Date().toISOString()
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async count(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      logger.info('Counting all products', {
        operation: 'COUNT_ALL_PRODUCTS'
      });

      const count = await this.productService.count();

      const responseData: IApiResponseData = {
        success: true,
        message: 'Products counted successfully',
        data: { count },
        meta: {
          timestamp: new Date().toISOString()
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public async countActive(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      logger.info('Counting active products', {
        operation: 'COUNT_ACTIVE_PRODUCTS'
      });

      const count = await this.productService.countActive();

      const responseData: IApiResponseData = {
        success: true,
        message: 'Active products counted successfully',
        data: { count },
        meta: {
          timestamp: new Date().toISOString()
        }
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }
}
