import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { Product } from '@/entities/product/Product';
import type { IProduct, IProductRepository } from '@/interfaces';
import type { CreateProductData, IProductData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresProductRepository implements IProductRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();
  public async create(productData: CreateProductData): Promise<IProduct> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `insert INTO product (name, slug, sku, author, isbn, page_count, publication_year, language, publisher, short_description, description, price_cents, tax_rate_id, stock_quantity, low_stock_threshold, manage_stock, meta_title, meta_description, is_active, is_featured, created_by)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id
                    `,
          [
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
          ]
        );
        const productCatalog: IProductData = await t.one(
          /*sql*/ `SELECT * FROM v_product_catalog WHERE product_id = 1$`,
          [result.id]
        );

        // Mapping automatique snake_case → camelCase
        const mappedEntity: IProductData =
          DatabaseMapper.snakeToCamel<IProductData>(productCatalog);
        return new Product(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }

  public async findById(id: string): Promise<IProduct> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IProduct[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IProductData>): Promise<IProduct> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
