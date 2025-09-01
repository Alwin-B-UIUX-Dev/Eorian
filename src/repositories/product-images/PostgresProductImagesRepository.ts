import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { ProductImages } from '@/entities';
import type { IProductImages, IProductImagesRepository } from '@/interfaces';
import type { CreateProductImagesData, IProductImagesData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresProductImagesRepository implements IProductImagesRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(ProductImagesData: CreateProductImagesData): Promise<IProductImages> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO ProductImages (order_number, user_id, shipping_address_id, billing_address_id, status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents, payment_status, payment_method, payment_reference, shipping_method, tracking_number, customer_notes, admin_notes, shipped_at, delivered_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING id`,
          [
            ProductImagesData.order_number,
            ProductImagesData.user_id,
            ProductImagesData.shipping_address_id,
            ProductImagesData.billing_address_id,
            ProductImagesData.status,
            ProductImagesData.subtotal_cents,
            ProductImagesData.tax_amount_cents,
            ProductImagesData.shipping_cents,
            ProductImagesData.total_cents,
            ProductImagesData.payment_status,
            ProductImagesData.payment_method,
            ProductImagesData.payment_reference,
            ProductImagesData.shipping_method,
            ProductImagesData.tracking_number,
            ProductImagesData.customer_notes,
            ProductImagesData.admin_notes,
            ProductImagesData.shipped_at,
            ProductImagesData.delivered_at
          ]
        );

        const userProductImages: IProductImagesData = await t.one(
          /*sql*/ `SELECT * FROM v_product_images_list WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IProductImagesData =
          DatabaseMapper.snakeToCamel<IProductImagesData>(userProductImages);

        return new ProductImages(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }
  public async findById(id: string): Promise<IProductImages> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IProductImages[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IProductImagesData>): Promise<IProductImages> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
