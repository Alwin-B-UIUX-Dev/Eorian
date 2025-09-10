import { z } from 'zod';

export class ProductImageConstants {
  // ID AUTO_INCREMENT
  public static readonly ID_SCHEMA = z.string().min(1);

  // SCHEMAS DE BASE
  public static readonly PRODUCT_ID_SCHEMA = z.string().min(1);
  public static readonly IMAGE_URL_SCHEMA = z.string().min(1, 'url est requis').max(500);
  public static readonly ALT_TEXT_SCHEMA = z.string().max(200);
  public static readonly IS_PRIMARY_SCHEMA = z.boolean().default(false);
  public static readonly SORT_ORDER_SCHEMA = z.string().default('0');
  public static readonly UPLOADED_BY_SCHEMA = z.string().min(1);

  public static readonly CREATE_PRODUCT_IMAGES_SCHEMA = z.object({
    productId: ProductImageConstants.PRODUCT_ID_SCHEMA,
    imageUrl: ProductImageConstants.IMAGE_URL_SCHEMA,
    altText: ProductImageConstants.ALT_TEXT_SCHEMA,
    isPrimary: ProductImageConstants.IS_PRIMARY_SCHEMA,
    sortOrder: ProductImageConstants.SORT_ORDER_SCHEMA,
    uploadedBy: ProductImageConstants.UPLOADED_BY_SCHEMA
  });

  public static readonly RESPONSE_PRODUCT_IMAGES_SCHEMA = z.object({
    id: ProductImageConstants.ID_SCHEMA,
    productId: ProductImageConstants.PRODUCT_ID_SCHEMA,
    imageUrl: ProductImageConstants.IMAGE_URL_SCHEMA,
    altText: ProductImageConstants.ALT_TEXT_SCHEMA,
    isPrimary: ProductImageConstants.IS_PRIMARY_SCHEMA,
    sortOrder: ProductImageConstants.SORT_ORDER_SCHEMA,
    uploadedBy: ProductImageConstants.UPLOADED_BY_SCHEMA
  });

  public static validateCreateProductImage(data: unknown) {
    return ProductImageConstants.CREATE_PRODUCT_IMAGES_SCHEMA.parse(data);
  }

  public static validateResponseProductImage(data: unknown) {
    return ProductImageConstants.RESPONSE_PRODUCT_IMAGES_SCHEMA.parse(data);
  }
}

export type CreateProductImageSchemaType = z.infer<
  typeof ProductImageConstants.CREATE_PRODUCT_IMAGES_SCHEMA
>;
export type ResponseProductImageSchemaType = z.infer<
  typeof ProductImageConstants.RESPONSE_PRODUCT_IMAGES_SCHEMA
>;
