import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { ProductImage } from '@/entities';
import type { IProductImage, IProductImageRepository } from '@/interfaces';
import type { CreateProductImageData, IProductImageData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresProductImageRepository implements IProductImageRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(ProductImageData: CreateProductImageData): Promise<IProductImage> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO ProductImage (order_number, user_id, shipping_address_id, billing_address_id, status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents, payment_status, payment_method, payment_reference, shipping_method, tracking_number, customer_notes, admin_notes, shipped_at, delivered_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING id`,
          [
            ProductImageData.order_number,
            ProductImageData.user_id,
            ProductImageData.shipping_address_id,
            ProductImageData.billing_address_id,
            ProductImageData.status,
            ProductImageData.subtotal_cents,
            ProductImageData.tax_amount_cents,
            ProductImageData.shipping_cents,
            ProductImageData.total_cents,
            ProductImageData.payment_status,
            ProductImageData.payment_method,
            ProductImageData.payment_reference,
            ProductImageData.shipping_method,
            ProductImageData.tracking_number,
            ProductImageData.customer_notes,
            ProductImageData.admin_notes,
            ProductImageData.shipped_at,
            ProductImageData.delivered_at
          ]
        );

        const userProductImage: IProductImageData = await t.one(
          /*sql*/ `SELECT * FROM v_product_images_list WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IProductImageData =
          DatabaseMapper.snakeToCamel<IProductImageData>(userProductImage);

        return new ProductImage(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }
  public async findById(id: string): Promise<IProductImage> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IProductImage[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IProductImageData>): Promise<IProductImage> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
