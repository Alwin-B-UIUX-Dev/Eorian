import type { IDatabase } from 'pg-promise';
import { database, logger } from '@/configs';
import { ProductImageOperationsConstants, ProductImageQueriesConstants } from '@/constants';
import { ProductImage } from '@/entities';
import { DatabaseError } from '@/exceptions';
import type { IProductImage, IProductImageRepository } from '@/interfaces';
import type { CreateProductImageData, IProductImageData, UpdateProductImageData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresProductImageRepository implements IProductImageRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();
  private readonly logger = logger;

  public async create(data: CreateProductImageData): Promise<IProductImage> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Creating product image', {
          operation: ProductImageOperationsConstants.CREATE_PRODUCT_IMAGE,
          productId: data.productId
        });
        const result: { id: string } = await t.one(
          ProductImageQueriesConstants.INSERT_PRODUCT_IMAGE,
          [
            data.productId,
            data.imageUrl,
            data.altText,
            data.isPrimary,
            data.sortOrder,
            data.uploadedBy
          ]
        );
        const row = await t.one(ProductImageQueriesConstants.SELECT_PRODUCT_IMAGE_BY_ID, [
          result.id
        ]);
        const mapped: IProductImageData = DatabaseMapper.snakeToCamel<IProductImageData>(row);
        return new ProductImage(mapped);
      } catch (error) {
        this.logger.error('Failed to create product image', {
          operation: ProductImageOperationsConstants.CREATE_PRODUCT_IMAGE,
          error
        });
        throw DatabaseError.transactionFailed(ProductImageOperationsConstants.CREATE_PRODUCT_IMAGE);
      }
    });
  }

  public async findById(id: string): Promise<IProductImage | null> {
    try {
      this.logger.info('Finding product image by id', {
        operation: ProductImageOperationsConstants.FIND_PRODUCT_IMAGE_BY_ID,
        id
      });
      const row: IProductImageData | null = await this.db.oneOrNone(
        ProductImageQueriesConstants.SELECT_PRODUCT_IMAGE_BY_ID,
        [id]
      );
      return row ? new ProductImage(DatabaseMapper.snakeToCamel<IProductImageData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find product image by id', {
        operation: ProductImageOperationsConstants.FIND_PRODUCT_IMAGE_BY_ID,
        id,
        error
      });
      throw DatabaseError.transactionFailed(
        ProductImageOperationsConstants.FIND_PRODUCT_IMAGE_BY_ID
      );
    }
  }

  public async findByProductId(productId: string): Promise<IProductImage[]> {
    try {
      this.logger.info('Finding product images by product id', {
        operation: ProductImageOperationsConstants.FIND_PRODUCT_IMAGES_BY_PRODUCT_ID,
        productId
      });
      const rows: IProductImageData[] = await this.db.manyOrNone(
        ProductImageQueriesConstants.SELECT_PRODUCT_IMAGES_BY_PRODUCT_ID,
        [productId]
      );
      const mapped: IProductImageData[] = DatabaseMapper.snakeToCamelArray<IProductImageData>(rows);
      return mapped.map(r => new ProductImage(r));
    } catch (error) {
      this.logger.error('Failed to find product images by product id', {
        operation: ProductImageOperationsConstants.FIND_PRODUCT_IMAGES_BY_PRODUCT_ID,
        productId,
        error
      });
      throw DatabaseError.transactionFailed(
        ProductImageOperationsConstants.FIND_PRODUCT_IMAGES_BY_PRODUCT_ID
      );
    }
  }

  public async findAll(limit: number = 50, offset: number = 0): Promise<IProductImage[]> {
    try {
      this.logger.info('Finding all product images', {
        operation: ProductImageOperationsConstants.FIND_ALL_PRODUCT_IMAGES,
        limit,
        offset
      });
      const rows: IProductImageData[] = await this.db.manyOrNone(
        ProductImageQueriesConstants.SELECT_ALL_PRODUCT_IMAGES,
        [limit, offset]
      );
      const mapped: IProductImageData[] = DatabaseMapper.snakeToCamelArray<IProductImageData>(rows);
      return mapped.map(r => new ProductImage(r));
    } catch (error) {
      this.logger.error('Failed to find all product images', {
        operation: ProductImageOperationsConstants.FIND_ALL_PRODUCT_IMAGES,
        error
      });
      throw DatabaseError.transactionFailed(
        ProductImageOperationsConstants.FIND_ALL_PRODUCT_IMAGES
      );
    }
  }

  public async update(id: string, data: UpdateProductImageData): Promise<IProductImage> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Updating product image', {
          operation: ProductImageOperationsConstants.UPDATE_PRODUCT_IMAGE,
          id
        });
        const row = await t.one(ProductImageQueriesConstants.UPDATE_PRODUCT_IMAGE, [
          id,
          data.productId,
          data.imageUrl,
          data.altText,
          data.isPrimary,
          data.sortOrder,
          data.uploadedBy
        ]);
        const mapped: IProductImageData = DatabaseMapper.snakeToCamel<IProductImageData>(row);
        return new ProductImage(mapped);
      } catch (error) {
        this.logger.error('Failed to update product image', {
          operation: ProductImageOperationsConstants.UPDATE_PRODUCT_IMAGE,
          id,
          error
        });
        throw DatabaseError.transactionFailed(ProductImageOperationsConstants.UPDATE_PRODUCT_IMAGE);
      }
    });
  }

  public async delete(id: string): Promise<boolean> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Deleting product image', {
          operation: ProductImageOperationsConstants.DELETE_PRODUCT_IMAGE_BY_ID,
          id
        });
        const result: { rowCount: number } = await t.result(
          ProductImageQueriesConstants.DELETE_PRODUCT_IMAGE_BY_ID,
          [id]
        );
        return result.rowCount > 0;
      } catch (error) {
        this.logger.error('Failed to delete product image', {
          operation: ProductImageOperationsConstants.DELETE_PRODUCT_IMAGE_BY_ID,
          id,
          error
        });
        throw DatabaseError.transactionFailed(
          ProductImageOperationsConstants.DELETE_PRODUCT_IMAGE_BY_ID
        );
      }
    });
  }
}
