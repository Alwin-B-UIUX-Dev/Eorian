// src/repositories/products/PostgresProductRepository.ts

import type { IDatabase } from 'pg-promise';
import { database, logger } from '@/configs';
import { ProductQueries } from '@/constants';
import { Product } from '@/entities';
import { DatabaseError } from '@/exceptions';
import type { IProduct, IProductRepository } from '@/interfaces';
import type { CreateProductData, IProductData, UpdateProductData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresProductRepository implements IProductRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();
  private readonly logger = logger;

  // =============================================
  // OPÉRATIONS CREATE-UPDATE-DELETE (sur tables)
  // =============================================
  public async create(productData: CreateProductData): Promise<IProduct> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Attempting to create new product', {
          operation: 'CREATE_PRODUCT',
          name: productData.name,
          slug: productData.slug
        });

        const result: { id: string } = await t.one(ProductQueries.INSERT_PRODUCT, [
          productData.name,
          productData.slug,
          productData.sku,
          productData.shortDescription,
          productData.description,
          productData.priceCents,
          productData.taxRateId,
          productData.stockQuantity,
          productData.lowStockThreshold,
          productData.manageStock,
          productData.metaTitle,
          productData.metaDescription,
          productData.isActive,
          productData.createdBy
        ]);

        const productProfile: IProductData = await t.one(ProductQueries.SELECT_PRODUCT_BY_ID, [
          result.id
        ]);

        // Mapping automatique snake_case → camelCase
        const mappedProfile: IProductData =
          DatabaseMapper.snakeToCamel<IProductData>(productProfile);

        this.logger.info('Product created successfully', {
          operation: 'CREATE_PRODUCT',
          productId: result.id,
          name: productData.name
        });

        return new Product(mappedProfile);
      } catch (error) {
        this.logger.error('Failed to create product', {
          operation: 'CREATE_PRODUCT',
          error: error instanceof Error ? error.message : 'Unknown error',
          name: productData.name
        });
        throw new DatabaseError('Failed to create product');
      }
    });
  }

  public async findById(id: string): Promise<IProduct | null> {
    try {
      this.logger.info('Attempting to find product by ID', {
        operation: 'FIND_PRODUCT_BY_ID',
        productId: id
      });

      const result: IProductData | null = await this.db.oneOrNone(
        ProductQueries.SELECT_PRODUCT_BY_ID,
        [id]
      );

      if (!result) {
        this.logger.info('Product not found', {
          operation: 'FIND_PRODUCT_BY_ID',
          productId: id
        });
        return null;
      }

      // Mapping automatique snake_case → camelCase
      const mappedResult: IProductData = DatabaseMapper.snakeToCamel<IProductData>(result);

      this.logger.info('Product found successfully', {
        operation: 'FIND_PRODUCT_BY_ID',
        productId: id
      });

      return new Product(mappedResult);
    } catch (error) {
      this.logger.error('Failed to find product by ID', {
        operation: 'FIND_PRODUCT_BY_ID',
        error: error instanceof Error ? error.message : 'Unknown error',
        productId: id
      });
      throw new DatabaseError('Failed to find product by ID');
    }
  }

  public async findAll(limit?: number, offset?: number): Promise<IProduct[]> {
    try {
      const limitValue = limit || 100;
      const offsetValue = offset || 0;

      this.logger.info('Attempting to find all products', {
        operation: 'FIND_ALL_PRODUCTS',
        limit: limitValue,
        offset: offsetValue
      });

      const results: IProductData[] = await this.db.any(ProductQueries.SELECT_ALL_PRODUCTS, [
        limitValue,
        offsetValue
      ]);

      // Mapping automatique snake_case → camelCase
      const mappedResults: IProductData[] = results.map(result =>
        DatabaseMapper.snakeToCamel<IProductData>(result)
      );

      this.logger.info('Products found successfully', {
        operation: 'FIND_ALL_PRODUCTS',
        count: mappedResults.length
      });

      return mappedResults.map(data => new Product(data));
    } catch (error) {
      this.logger.error('Failed to find all products', {
        operation: 'FIND_ALL_PRODUCTS',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new DatabaseError('Failed to find all products');
    }
  }

  public async update(id: string, data: Partial<UpdateProductData>): Promise<IProduct> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Attempting to update product', {
          operation: 'UPDATE_PRODUCT',
          productId: id
        });

        await t.none(ProductQueries.UPDATE_PRODUCT, [
          id,
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

        const updatedProduct: IProductData = await t.one(ProductQueries.SELECT_PRODUCT_BY_ID, [id]);

        // Mapping automatique snake_case → camelCase
        const mappedProduct: IProductData =
          DatabaseMapper.snakeToCamel<IProductData>(updatedProduct);

        this.logger.info('Product updated successfully', {
          operation: 'UPDATE_PRODUCT',
          productId: id
        });

        return new Product(mappedProduct);
      } catch (error) {
        this.logger.error('Failed to update product', {
          operation: 'UPDATE_PRODUCT',
          error: error instanceof Error ? error.message : 'Unknown error',
          productId: id
        });
        throw new DatabaseError('Failed to update product');
      }
    });
  }

  public async delete(id: string): Promise<boolean> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Attempting to delete product', {
          operation: 'DELETE_PRODUCT',
          productId: id
        });

        const result = await t.result(ProductQueries.DELETE_PRODUCT, [id]);

        const deleted = result.rowCount > 0;

        this.logger.info('Product deletion result', {
          operation: 'DELETE_PRODUCT',
          productId: id,
          deleted
        });

        return deleted;
      } catch (error) {
        this.logger.error('Failed to delete product', {
          operation: 'DELETE_PRODUCT',
          error: error instanceof Error ? error.message : 'Unknown error',
          productId: id
        });
        throw new DatabaseError('Failed to delete product');
      }
    });
  }

  // =============================================
  // MÉTHODES SPÉCIALISÉES
  // =============================================

  public async findBySlug(slug: string): Promise<IProduct | null> {
    try {
      this.logger.info('Attempting to find product by slug', {
        operation: 'FIND_PRODUCT_BY_SLUG',
        slug
      });

      const result: IProductData | null = await this.db.oneOrNone(
        ProductQueries.SELECT_PRODUCT_BY_SLUG,
        [slug]
      );

      if (!result) {
        this.logger.info('Product not found by slug', {
          operation: 'FIND_PRODUCT_BY_SLUG',
          slug
        });
        return null;
      }

      // Mapping automatique snake_case → camelCase
      const mappedResult: IProductData = DatabaseMapper.snakeToCamel<IProductData>(result);

      this.logger.info('Product found by slug successfully', {
        operation: 'FIND_PRODUCT_BY_SLUG',
        slug
      });

      return new Product(mappedResult);
    } catch (error) {
      this.logger.error('Failed to find product by slug', {
        operation: 'FIND_PRODUCT_BY_SLUG',
        error: error instanceof Error ? error.message : 'Unknown error',
        slug
      });
      throw new DatabaseError('Failed to find product by slug');
    }
  }

  public async findBySku(sku: string): Promise<IProduct | null> {
    try {
      this.logger.info('Attempting to find product by SKU', {
        operation: 'FIND_PRODUCT_BY_SKU',
        sku
      });

      const result: IProductData | null = await this.db.oneOrNone(
        ProductQueries.SELECT_PRODUCT_BY_SKU,
        [sku]
      );

      if (!result) {
        this.logger.info('Product not found by SKU', {
          operation: 'FIND_PRODUCT_BY_SKU',
          sku
        });
        return null;
      }

      // Mapping automatique snake_case → camelCase
      const mappedResult: IProductData = DatabaseMapper.snakeToCamel<IProductData>(result);

      this.logger.info('Product found by SKU successfully', {
        operation: 'FIND_PRODUCT_BY_SKU',
        sku
      });

      return new Product(mappedResult);
    } catch (error) {
      this.logger.error('Failed to find product by SKU', {
        operation: 'FIND_PRODUCT_BY_SKU',
        error: error instanceof Error ? error.message : 'Unknown error',
        sku
      });
      throw new DatabaseError('Failed to find product by SKU');
    }
  }

  public async findByName(name: string, limit?: number, offset?: number): Promise<IProduct[]> {
    try {
      const limitValue = limit || 100;
      const offsetValue = offset || 0;
      const searchPattern = `%${name}%`;

      this.logger.info('Attempting to find products by name', {
        operation: 'FIND_PRODUCTS_BY_NAME',
        name,
        limit: limitValue,
        offset: offsetValue
      });

      const results: IProductData[] = await this.db.any(ProductQueries.SELECT_PRODUCTS_BY_NAME, [
        searchPattern,
        limitValue,
        offsetValue
      ]);

      // Mapping automatique snake_case → camelCase
      const mappedResults: IProductData[] = results.map(result =>
        DatabaseMapper.snakeToCamel<IProductData>(result)
      );

      this.logger.info('Products found by name successfully', {
        operation: 'FIND_PRODUCTS_BY_NAME',
        name,
        count: mappedResults.length
      });

      return mappedResults.map(data => new Product(data));
    } catch (error) {
      this.logger.error('Failed to find products by name', {
        operation: 'FIND_PRODUCTS_BY_NAME',
        error: error instanceof Error ? error.message : 'Unknown error',
        name
      });
      throw new DatabaseError('Failed to find products by name');
    }
  }

  public async findActive(limit?: number, offset?: number): Promise<IProduct[]> {
    try {
      const limitValue = limit || 100;
      const offsetValue = offset || 0;

      this.logger.info('Attempting to find active products', {
        operation: 'FIND_ACTIVE_PRODUCTS',
        limit: limitValue,
        offset: offsetValue
      });

      const results: IProductData[] = await this.db.any(ProductQueries.SELECT_ACTIVE_PRODUCTS, [
        limitValue,
        offsetValue
      ]);

      // Mapping automatique snake_case → camelCase
      const mappedResults: IProductData[] = results.map(result =>
        DatabaseMapper.snakeToCamel<IProductData>(result)
      );

      this.logger.info('Active products found successfully', {
        operation: 'FIND_ACTIVE_PRODUCTS',
        count: mappedResults.length
      });

      return mappedResults.map(data => new Product(data));
    } catch (error) {
      this.logger.error('Failed to find active products', {
        operation: 'FIND_ACTIVE_PRODUCTS',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new DatabaseError('Failed to find active products');
    }
  }

  public async findOutOfStock(limit?: number, offset?: number): Promise<IProduct[]> {
    try {
      const limitValue = limit || 100;
      const offsetValue = offset || 0;

      this.logger.info('Attempting to find out of stock products', {
        operation: 'FIND_OUT_OF_STOCK_PRODUCTS',
        limit: limitValue,
        offset: offsetValue
      });

      const results: IProductData[] = await this.db.any(
        ProductQueries.SELECT_OUT_OF_STOCK_PRODUCTS,
        [limitValue, offsetValue]
      );

      // Mapping automatique snake_case → camelCase
      const mappedResults: IProductData[] = results.map(result =>
        DatabaseMapper.snakeToCamel<IProductData>(result)
      );

      this.logger.info('Out of stock products found successfully', {
        operation: 'FIND_OUT_OF_STOCK_PRODUCTS',
        count: mappedResults.length
      });

      return mappedResults.map(data => new Product(data));
    } catch (error) {
      this.logger.error('Failed to find out of stock products', {
        operation: 'FIND_OUT_OF_STOCK_PRODUCTS',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new DatabaseError('Failed to find out of stock products');
    }
  }

  public async findLowStock(limit?: number, offset?: number): Promise<IProduct[]> {
    try {
      const limitValue = limit || 100;
      const offsetValue = offset || 0;

      this.logger.info('Attempting to find low stock products', {
        operation: 'FIND_LOW_STOCK_PRODUCTS',
        limit: limitValue,
        offset: offsetValue
      });

      const results: IProductData[] = await this.db.any(ProductQueries.SELECT_LOW_STOCK_PRODUCTS, [
        limitValue,
        offsetValue
      ]);

      // Mapping automatique snake_case → camelCase
      const mappedResults: IProductData[] = results.map(result =>
        DatabaseMapper.snakeToCamel<IProductData>(result)
      );

      this.logger.info('Low stock products found successfully', {
        operation: 'FIND_LOW_STOCK_PRODUCTS',
        count: mappedResults.length
      });

      return mappedResults.map(data => new Product(data));
    } catch (error) {
      this.logger.error('Failed to find low stock products', {
        operation: 'FIND_LOW_STOCK_PRODUCTS',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new DatabaseError('Failed to find low stock products');
    }
  }

  public async findByCreator(
    createdBy: string,
    limit?: number,
    offset?: number
  ): Promise<IProduct[]> {
    try {
      const limitValue = limit || 100;
      const offsetValue = offset || 0;

      this.logger.info('Attempting to find products by creator', {
        operation: 'FIND_PRODUCTS_BY_CREATOR',
        createdBy,
        limit: limitValue,
        offset: offsetValue
      });

      const results: IProductData[] = await this.db.any(ProductQueries.SELECT_PRODUCTS_BY_CREATOR, [
        createdBy,
        limitValue,
        offsetValue
      ]);

      // Mapping automatique snake_case → camelCase
      const mappedResults: IProductData[] = results.map(result =>
        DatabaseMapper.snakeToCamel<IProductData>(result)
      );

      this.logger.info('Products found by creator successfully', {
        operation: 'FIND_PRODUCTS_BY_CREATOR',
        createdBy,
        count: mappedResults.length
      });

      return mappedResults.map(data => new Product(data));
    } catch (error) {
      this.logger.error('Failed to find products by creator', {
        operation: 'FIND_PRODUCTS_BY_CREATOR',
        error: error instanceof Error ? error.message : 'Unknown error',
        createdBy
      });
      throw new DatabaseError('Failed to find products by creator');
    }
  }

  public async findByTaxRate(
    taxRateId: string,
    limit?: number,
    offset?: number
  ): Promise<IProduct[]> {
    try {
      const limitValue = limit || 100;
      const offsetValue = offset || 0;

      this.logger.info('Attempting to find products by tax rate', {
        operation: 'FIND_PRODUCTS_BY_TAX_RATE',
        taxRateId,
        limit: limitValue,
        offset: offsetValue
      });

      const results: IProductData[] = await this.db.any(
        ProductQueries.SELECT_PRODUCTS_BY_TAX_RATE,
        [taxRateId, limitValue, offsetValue]
      );

      // Mapping automatique snake_case → camelCase
      const mappedResults: IProductData[] = results.map(result =>
        DatabaseMapper.snakeToCamel<IProductData>(result)
      );

      this.logger.info('Products found by tax rate successfully', {
        operation: 'FIND_PRODUCTS_BY_TAX_RATE',
        taxRateId,
        count: mappedResults.length
      });

      return mappedResults.map(data => new Product(data));
    } catch (error) {
      this.logger.error('Failed to find products by tax rate', {
        operation: 'FIND_PRODUCTS_BY_TAX_RATE',
        error: error instanceof Error ? error.message : 'Unknown error',
        taxRateId
      });
      throw new DatabaseError('Failed to find products by tax rate');
    }
  }

  public async updateStock(id: string, stockQuantity: number): Promise<IProduct> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Attempting to update product stock', {
          operation: 'UPDATE_PRODUCT_STOCK',
          productId: id,
          stockQuantity
        });

        await t.none(ProductQueries.UPDATE_PRODUCT_STOCK, [id, stockQuantity]);

        const updatedProduct: IProductData = await t.one(ProductQueries.SELECT_PRODUCT_BY_ID, [id]);

        // Mapping automatique snake_case → camelCase
        const mappedProduct: IProductData =
          DatabaseMapper.snakeToCamel<IProductData>(updatedProduct);

        this.logger.info('Product stock updated successfully', {
          operation: 'UPDATE_PRODUCT_STOCK',
          productId: id,
          stockQuantity
        });

        return new Product(mappedProduct);
      } catch (error) {
        this.logger.error('Failed to update product stock', {
          operation: 'UPDATE_PRODUCT_STOCK',
          error: error instanceof Error ? error.message : 'Unknown error',
          productId: id
        });
        throw new DatabaseError('Failed to update product stock');
      }
    });
  }

  public async updateStatus(id: string, isActive: boolean): Promise<IProduct> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Attempting to update product status', {
          operation: 'UPDATE_PRODUCT_STATUS',
          productId: id,
          isActive
        });

        await t.none(ProductQueries.UPDATE_PRODUCT_STATUS, [id, isActive]);

        const updatedProduct: IProductData = await t.one(ProductQueries.SELECT_PRODUCT_BY_ID, [id]);

        // Mapping automatique snake_case → camelCase
        const mappedProduct: IProductData =
          DatabaseMapper.snakeToCamel<IProductData>(updatedProduct);

        this.logger.info('Product status updated successfully', {
          operation: 'UPDATE_PRODUCT_STATUS',
          productId: id,
          isActive
        });

        return new Product(mappedProduct);
      } catch (error) {
        this.logger.error('Failed to update product status', {
          operation: 'UPDATE_PRODUCT_STATUS',
          error: error instanceof Error ? error.message : 'Unknown error',
          productId: id
        });
        throw new DatabaseError('Failed to update product status');
      }
    });
  }

  public async count(): Promise<number> {
    try {
      this.logger.info('Attempting to count all products', {
        operation: 'COUNT_ALL_PRODUCTS'
      });

      const result: { count: string } = await this.db.one(ProductQueries.COUNT_ALL_PRODUCTS);
      const count = parseInt(result.count, 10);

      this.logger.info('Products counted successfully', {
        operation: 'COUNT_ALL_PRODUCTS',
        count
      });

      return count;
    } catch (error) {
      this.logger.error('Failed to count all products', {
        operation: 'COUNT_ALL_PRODUCTS',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new DatabaseError('Failed to count all products');
    }
  }

  public async countActive(): Promise<number> {
    try {
      this.logger.info('Attempting to count active products', {
        operation: 'COUNT_ACTIVE_PRODUCTS'
      });

      const result: { count: string } = await this.db.one(ProductQueries.COUNT_ACTIVE_PRODUCTS);
      const count = parseInt(result.count, 10);

      this.logger.info('Active products counted successfully', {
        operation: 'COUNT_ACTIVE_PRODUCTS',
        count
      });

      return count;
    } catch (error) {
      this.logger.error('Failed to count active products', {
        operation: 'COUNT_ACTIVE_PRODUCTS',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new DatabaseError('Failed to count active products');
    }
  }
}
