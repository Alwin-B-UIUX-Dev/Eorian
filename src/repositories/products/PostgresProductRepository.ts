import type { IDatabase } from 'pg-promise';
import { database, logger } from '@/configs';
import { ProductOperationsConstants, ProductQueriesConstants } from '@/constants';
import { Product } from '@/entities';
import { DatabaseError } from '@/exceptions';
import type { IProduct, IProductRepository } from '@/interfaces';
import type { CreateProductData, IProductData, UpdateProductData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresProductRepository implements IProductRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();
  private readonly logger = logger;

  public async create(data: CreateProductData): Promise<IProduct> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Creating product', {
          operation: ProductOperationsConstants.CREATE_PRODUCT,
          name: data.name
        });
        const result: { id: string } = await t.one(ProductQueriesConstants.INSERT_PRODUCT, [
          data.name,
          data.slug,
          data.sku,
          data.shortDescription,
          data.description,
          data.priceCents,
          data.taxRateId,
          data.stockQuantity,
          data.lowStockThreshold,
          data.manageStock,
          data.metaTitle,
          data.metaDescription,
          data.isActive,
          data.createdBy
        ]);
        const row = await t.one(ProductQueriesConstants.SELECT_PRODUCT_BY_ID, [result.id]);
        const mapped: IProductData = DatabaseMapper.snakeToCamel<IProductData>(row);
        return new Product(mapped);
      } catch (error) {
        this.logger.error('Failed to create product', {
          operation: ProductOperationsConstants.CREATE_PRODUCT,
          error
        });
        throw DatabaseError.transactionFailed(ProductOperationsConstants.CREATE_PRODUCT);
      }
    });
  }

  public async update(id: string, data: UpdateProductData): Promise<IProduct> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Updating product', {
          operation: ProductOperationsConstants.UPDATE_PRODUCT,
          id
        });
        const row = await t.one(ProductQueriesConstants.UPDATE_PRODUCT, [
          Number(id),
          data.name,
          data.slug,
          data.sku,
          data.shortDescription,
          data.description,
          data.priceCents,
          data.taxRateId,
          data.stockQuantity,
          data.lowStockThreshold,
          data.manageStock,
          data.metaTitle,
          data.metaDescription,
          data.isActive
        ]);
        const mapped: IProductData = DatabaseMapper.snakeToCamel<IProductData>(row);
        return new Product(mapped);
      } catch (error) {
        this.logger.error('Failed to update product', {
          operation: ProductOperationsConstants.UPDATE_PRODUCT,
          id,
          error
        });
        throw DatabaseError.transactionFailed(ProductOperationsConstants.UPDATE_PRODUCT);
      }
    });
  }

  public async delete(id: string): Promise<boolean> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Deleting product', {
          operation: ProductOperationsConstants.DELETE_PRODUCT_BY_ID,
          id
        });
        const result: { rowCount: number } = await t.result(
          ProductQueriesConstants.DELETE_PRODUCT_BY_ID,
          [Number(id)]
        );
        return result.rowCount > 0;
      } catch (error) {
        this.logger.error('Failed to delete product', {
          operation: ProductOperationsConstants.DELETE_PRODUCT_BY_ID,
          id,
          error
        });
        throw DatabaseError.transactionFailed(ProductOperationsConstants.DELETE_PRODUCT_BY_ID);
      }
    });
  }

  public async findById(id: string): Promise<IProduct | null> {
    try {
      this.logger.info('Finding product by id', {
        operation: ProductOperationsConstants.FIND_PRODUCT_BY_ID,
        id
      });
      const row: IProductData | null = await this.db.oneOrNone(
        ProductQueriesConstants.SELECT_PRODUCT_BY_ID,
        [Number(id)]
      );
      return row ? new Product(DatabaseMapper.snakeToCamel<IProductData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find product by id', {
        operation: ProductOperationsConstants.FIND_PRODUCT_BY_ID,
        id,
        error
      });
      throw DatabaseError.transactionFailed(ProductOperationsConstants.FIND_PRODUCT_BY_ID);
    }
  }

  public async findAll(limit: number = 50, offset: number = 0): Promise<IProduct[]> {
    try {
      this.logger.info('Finding all products', {
        operation: ProductOperationsConstants.FIND_ALL_PRODUCTS,
        limit,
        offset
      });
      const rows: IProductData[] = await this.db.manyOrNone(
        ProductQueriesConstants.SELECT_ALL_PRODUCTS,
        [limit, offset]
      );
      const mapped: IProductData[] = DatabaseMapper.snakeToCamelArray<IProductData>(rows);
      return mapped.map(r => new Product(r));
    } catch (error) {
      this.logger.error('Failed to find all products', {
        operation: ProductOperationsConstants.FIND_ALL_PRODUCTS,
        error
      });
      throw DatabaseError.transactionFailed(ProductOperationsConstants.FIND_ALL_PRODUCTS);
    }
  }

  public async findByName(name: string): Promise<IProduct | null> {
    try {
      this.logger.info('Finding product by name', {
        operation: ProductOperationsConstants.FIND_PRODUCT_BY_NAME,
        name
      });
      const row: IProductData | null = await this.db.oneOrNone(
        ProductQueriesConstants.SELECT_PRODUCT_BY_NAME,
        [name]
      );
      return row ? new Product(DatabaseMapper.snakeToCamel<IProductData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find product by name', {
        operation: ProductOperationsConstants.FIND_PRODUCT_BY_NAME,
        name,
        error
      });
      throw DatabaseError.transactionFailed(ProductOperationsConstants.FIND_PRODUCT_BY_NAME);
    }
  }

  public async findByActiveStatus(active: boolean): Promise<IProduct[]> {
    try {
      this.logger.info('Finding products by active status', {
        operation: ProductOperationsConstants.FIND_PRODUCTS_BY_ACTIVE,
        active
      });
      const rows: IProductData[] = await this.db.manyOrNone(
        ProductQueriesConstants.SELECT_PRODUCTS_BY_ACTIVE,
        [active]
      );
      const mapped: IProductData[] = DatabaseMapper.snakeToCamelArray<IProductData>(rows);
      return mapped.map(r => new Product(r));
    } catch (error) {
      this.logger.error('Failed to find products by active status', {
        operation: ProductOperationsConstants.FIND_PRODUCTS_BY_ACTIVE,
        active,
        error
      });
      throw DatabaseError.transactionFailed(ProductOperationsConstants.FIND_PRODUCTS_BY_ACTIVE);
    }
  }
}
