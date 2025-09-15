// src/services/products/ProductService.ts

import { logger } from '@/configs';
import { ConflictError } from '@/exceptions';
import type { IProduct, IProductRepository, IProductService } from '@/interfaces';
import type { CreateProductData, UpdateProductData } from '@/types';

export class ProductService implements IProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  // =============================================
  // MÉTHODES CRUD DE BASE
  // =============================================

  public async create(data: CreateProductData): Promise<IProduct> {
    try {
      logger.info('Creating new product', {
        operation: 'CREATE_PRODUCT',
        name: data.name,
        slug: data.slug
      });

      // Validation métier : vérifier que le slug est unique
      const existingBySlug = await this.productRepository.findBySlug(data.slug);
      if (existingBySlug) {
        throw new ConflictError(`Product with slug '${data.slug}' already exists`);
      }

      // Validation métier : vérifier que le SKU est unique (si fourni)
      if (data.sku) {
        const existingBySku = await this.productRepository.findBySku(data.sku);
        if (existingBySku) {
          throw new ConflictError(`Product with SKU '${data.sku}' already exists`);
        }
      }

      const product = await this.productRepository.create(data);

      logger.info('Product created successfully', {
        operation: 'CREATE_PRODUCT',
        productId: product.getId(),
        name: product.getName()
      });

      return product;
    } catch (error) {
      logger.error('Failed to create product', {
        operation: 'CREATE_PRODUCT',
        error: error instanceof Error ? error.message : 'Unknown error',
        name: data.name
      });
      throw error;
    }
  }

  public async findAll(limit?: number, offset?: number): Promise<IProduct[]> {
    try {
      logger.info('Finding all products', {
        operation: 'FIND_ALL_PRODUCTS',
        limit,
        offset
      });

      const products = await this.productRepository.findAll(limit, offset);

      logger.info('Products found successfully', {
        operation: 'FIND_ALL_PRODUCTS',
        count: products.length
      });

      return products;
    } catch (error) {
      logger.error('Failed to find all products', {
        operation: 'FIND_ALL_PRODUCTS',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  public async findOne(id: string): Promise<IProduct | null> {
    try {
      logger.info('Finding product by ID', {
        operation: 'FIND_PRODUCT_BY_ID',
        productId: id
      });

      const product = await this.productRepository.findById(id);

      if (product) {
        logger.info('Product found successfully', {
          operation: 'FIND_PRODUCT_BY_ID',
          productId: id,
          name: product.getName()
        });
      } else {
        logger.info('Product not found', {
          operation: 'FIND_PRODUCT_BY_ID',
          productId: id
        });
      }

      return product;
    } catch (error) {
      logger.error('Failed to find product by ID', {
        operation: 'FIND_PRODUCT_BY_ID',
        error: error instanceof Error ? error.message : 'Unknown error',
        productId: id
      });
      throw error;
    }
  }

  public async update(id: string, data: Partial<UpdateProductData>): Promise<IProduct> {
    try {
      logger.info('Updating product', {
        operation: 'UPDATE_PRODUCT',
        productId: id
      });

      // Vérifier que le produit existe
      const existingProduct = await this.productRepository.findById(id);
      if (!existingProduct) {
        throw new Error(`Product with ID '${id}' not found`);
      }

      // Validation métier : vérifier que le slug est unique (si modifié)
      if (data.slug && data.slug !== existingProduct.getSlug()) {
        const existingBySlug = await this.productRepository.findBySlug(data.slug);
        if (existingBySlug) {
          throw new ConflictError(`Product with slug '${data.slug}' already exists`);
        }
      }

      // Validation métier : vérifier que le SKU est unique (si modifié)
      if (data.sku && data.sku !== existingProduct.getSku()) {
        const existingBySku = await this.productRepository.findBySku(data.sku);
        if (existingBySku) {
          throw new ConflictError(`Product with SKU '${data.sku}' already exists`);
        }
      }

      const updatedProduct = await this.productRepository.update(id, data);

      logger.info('Product updated successfully', {
        operation: 'UPDATE_PRODUCT',
        productId: id,
        name: updatedProduct.getName()
      });

      return updatedProduct;
    } catch (error) {
      logger.error('Failed to update product', {
        operation: 'UPDATE_PRODUCT',
        error: error instanceof Error ? error.message : 'Unknown error',
        productId: id
      });
      throw error;
    }
  }

  public async remove(id: string): Promise<void> {
    try {
      logger.info('Removing product', {
        operation: 'REMOVE_PRODUCT',
        productId: id
      });

      // Vérifier que le produit existe
      const existingProduct = await this.productRepository.findById(id);
      if (!existingProduct) {
        throw new Error(`Product with ID '${id}' not found`);
      }

      const deleted = await this.productRepository.delete(id);
      if (!deleted) {
        throw new Error(`Failed to delete product with ID '${id}'`);
      }

      logger.info('Product removed successfully', {
        operation: 'REMOVE_PRODUCT',
        productId: id,
        name: existingProduct.getName()
      });
    } catch (error) {
      logger.error('Failed to remove product', {
        operation: 'REMOVE_PRODUCT',
        error: error instanceof Error ? error.message : 'Unknown error',
        productId: id
      });
      throw error;
    }
  }

  // =============================================
  // MÉTHODES SPÉCIALISÉES
  // =============================================

  public async findBySlug(slug: string): Promise<IProduct | null> {
    try {
      logger.info('Finding product by slug', {
        operation: 'FIND_PRODUCT_BY_SLUG',
        slug
      });

      const product = await this.productRepository.findBySlug(slug);

      if (product) {
        logger.info('Product found by slug successfully', {
          operation: 'FIND_PRODUCT_BY_SLUG',
          slug,
          productId: product.getId()
        });
      } else {
        logger.info('Product not found by slug', {
          operation: 'FIND_PRODUCT_BY_SLUG',
          slug
        });
      }

      return product;
    } catch (error) {
      logger.error('Failed to find product by slug', {
        operation: 'FIND_PRODUCT_BY_SLUG',
        error: error instanceof Error ? error.message : 'Unknown error',
        slug
      });
      throw error;
    }
  }

  public async findBySku(sku: string): Promise<IProduct | null> {
    try {
      logger.info('Finding product by SKU', {
        operation: 'FIND_PRODUCT_BY_SKU',
        sku
      });

      const product = await this.productRepository.findBySku(sku);

      if (product) {
        logger.info('Product found by SKU successfully', {
          operation: 'FIND_PRODUCT_BY_SKU',
          sku,
          productId: product.getId()
        });
      } else {
        logger.info('Product not found by SKU', {
          operation: 'FIND_PRODUCT_BY_SKU',
          sku
        });
      }

      return product;
    } catch (error) {
      logger.error('Failed to find product by SKU', {
        operation: 'FIND_PRODUCT_BY_SKU',
        error: error instanceof Error ? error.message : 'Unknown error',
        sku
      });
      throw error;
    }
  }

  public async findByName(name: string, limit?: number, offset?: number): Promise<IProduct[]> {
    try {
      logger.info('Finding products by name', {
        operation: 'FIND_PRODUCTS_BY_NAME',
        name,
        limit,
        offset
      });

      const products = await this.productRepository.findByName(name, limit, offset);

      logger.info('Products found by name successfully', {
        operation: 'FIND_PRODUCTS_BY_NAME',
        name,
        count: products.length
      });

      return products;
    } catch (error) {
      logger.error('Failed to find products by name', {
        operation: 'FIND_PRODUCTS_BY_NAME',
        error: error instanceof Error ? error.message : 'Unknown error',
        name
      });
      throw error;
    }
  }

  public async findActive(limit?: number, offset?: number): Promise<IProduct[]> {
    try {
      logger.info('Finding active products', {
        operation: 'FIND_ACTIVE_PRODUCTS',
        limit,
        offset
      });

      const products = await this.productRepository.findActive(limit, offset);

      logger.info('Active products found successfully', {
        operation: 'FIND_ACTIVE_PRODUCTS',
        count: products.length
      });

      return products;
    } catch (error) {
      logger.error('Failed to find active products', {
        operation: 'FIND_ACTIVE_PRODUCTS',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  public async findOutOfStock(limit?: number, offset?: number): Promise<IProduct[]> {
    try {
      logger.info('Finding out of stock products', {
        operation: 'FIND_OUT_OF_STOCK_PRODUCTS',
        limit,
        offset
      });

      const products = await this.productRepository.findOutOfStock(limit, offset);

      logger.info('Out of stock products found successfully', {
        operation: 'FIND_OUT_OF_STOCK_PRODUCTS',
        count: products.length
      });

      return products;
    } catch (error) {
      logger.error('Failed to find out of stock products', {
        operation: 'FIND_OUT_OF_STOCK_PRODUCTS',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  public async findLowStock(limit?: number, offset?: number): Promise<IProduct[]> {
    try {
      logger.info('Finding low stock products', {
        operation: 'FIND_LOW_STOCK_PRODUCTS',
        limit,
        offset
      });

      const products = await this.productRepository.findLowStock(limit, offset);

      logger.info('Low stock products found successfully', {
        operation: 'FIND_LOW_STOCK_PRODUCTS',
        count: products.length
      });

      return products;
    } catch (error) {
      logger.error('Failed to find low stock products', {
        operation: 'FIND_LOW_STOCK_PRODUCTS',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  public async findByCreator(
    createdBy: string,
    limit?: number,
    offset?: number
  ): Promise<IProduct[]> {
    try {
      logger.info('Finding products by creator', {
        operation: 'FIND_PRODUCTS_BY_CREATOR',
        createdBy,
        limit,
        offset
      });

      const products = await this.productRepository.findByCreator(createdBy, limit, offset);

      logger.info('Products found by creator successfully', {
        operation: 'FIND_PRODUCTS_BY_CREATOR',
        createdBy,
        count: products.length
      });

      return products;
    } catch (error) {
      logger.error('Failed to find products by creator', {
        operation: 'FIND_PRODUCTS_BY_CREATOR',
        error: error instanceof Error ? error.message : 'Unknown error',
        createdBy
      });
      throw error;
    }
  }

  public async findByTaxRate(
    taxRateId: string,
    limit?: number,
    offset?: number
  ): Promise<IProduct[]> {
    try {
      logger.info('Finding products by tax rate', {
        operation: 'FIND_PRODUCTS_BY_TAX_RATE',
        taxRateId,
        limit,
        offset
      });

      const products = await this.productRepository.findByTaxRate(taxRateId, limit, offset);

      logger.info('Products found by tax rate successfully', {
        operation: 'FIND_PRODUCTS_BY_TAX_RATE',
        taxRateId,
        count: products.length
      });

      return products;
    } catch (error) {
      logger.error('Failed to find products by tax rate', {
        operation: 'FIND_PRODUCTS_BY_TAX_RATE',
        error: error instanceof Error ? error.message : 'Unknown error',
        taxRateId
      });
      throw error;
    }
  }

  public async updateStock(id: string, stockQuantity: number): Promise<IProduct> {
    try {
      logger.info('Updating product stock', {
        operation: 'UPDATE_PRODUCT_STOCK',
        productId: id,
        stockQuantity
      });

      // Vérifier que le produit existe
      const existingProduct = await this.productRepository.findById(id);
      if (!existingProduct) {
        throw new Error(`Product with ID '${id}' not found`);
      }

      // Validation métier : le stock ne peut pas être négatif
      if (stockQuantity < 0) {
        throw new Error('Stock quantity cannot be negative');
      }

      const updatedProduct = await this.productRepository.updateStock(id, stockQuantity);

      logger.info('Product stock updated successfully', {
        operation: 'UPDATE_PRODUCT_STOCK',
        productId: id,
        stockQuantity,
        name: updatedProduct.getName()
      });

      return updatedProduct;
    } catch (error) {
      logger.error('Failed to update product stock', {
        operation: 'UPDATE_PRODUCT_STOCK',
        error: error instanceof Error ? error.message : 'Unknown error',
        productId: id
      });
      throw error;
    }
  }

  public async updateStatus(id: string, isActive: boolean): Promise<IProduct> {
    try {
      logger.info('Updating product status', {
        operation: 'UPDATE_PRODUCT_STATUS',
        productId: id,
        isActive
      });

      // Vérifier que le produit existe
      const existingProduct = await this.productRepository.findById(id);
      if (!existingProduct) {
        throw new Error(`Product with ID '${id}' not found`);
      }

      const updatedProduct = await this.productRepository.updateStatus(id, isActive);

      logger.info('Product status updated successfully', {
        operation: 'UPDATE_PRODUCT_STATUS',
        productId: id,
        isActive,
        name: updatedProduct.getName()
      });

      return updatedProduct;
    } catch (error) {
      logger.error('Failed to update product status', {
        operation: 'UPDATE_PRODUCT_STATUS',
        error: error instanceof Error ? error.message : 'Unknown error',
        productId: id
      });
      throw error;
    }
  }

  public async count(): Promise<number> {
    try {
      logger.info('Counting all products', {
        operation: 'COUNT_ALL_PRODUCTS'
      });

      const count = await this.productRepository.count();

      logger.info('Products counted successfully', {
        operation: 'COUNT_ALL_PRODUCTS',
        count
      });

      return count;
    } catch (error) {
      logger.error('Failed to count all products', {
        operation: 'COUNT_ALL_PRODUCTS',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  public async countActive(): Promise<number> {
    try {
      logger.info('Counting active products', {
        operation: 'COUNT_ACTIVE_PRODUCTS'
      });

      const count = await this.productRepository.countActive();

      logger.info('Active products counted successfully', {
        operation: 'COUNT_ACTIVE_PRODUCTS',
        count
      });

      return count;
    } catch (error) {
      logger.error('Failed to count active products', {
        operation: 'COUNT_ACTIVE_PRODUCTS',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  // =============================================
  // MÉTHODES MÉTIER SPÉCIALISÉES
  // =============================================

  public async createProduct(data: CreateProductData): Promise<IProduct> {
    return this.create(data);
  }

  public async updateProduct(id: string, data: Partial<CreateProductData>): Promise<IProduct> {
    return this.update(id, data);
  }
}
