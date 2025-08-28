import { z } from 'zod';

export class ProductConstants {
  public static readonly ID_SCHEMA = z.string().min(1, "L'identifiant est requis");
  public static readonly NAME_SCHEMA = z.string().min(1, 'Le nom est requis');
  public static readonly SLUG_SCHEMA = z.string().min(1, 'Le slug est requis').trim();
  public static readonly SKU_SCHEMA = z.string().trim();
  public static readonly SHORT_DESCRIPTION_SCHEMA = z.string();
  public static readonly DESCRIPTION_SCHEMA = z.string();
  public static readonly PRICE_CENTS_SCHEMA = z
    .string()
    .min(1, 'Le prix (en centimes) est requis')
    .trim();
  public static readonly TAX_RATE_ID_SCHEMA = z.string().trim();
  public static readonly STOCK_QUANTITY_SCHEMA = z
    .string()
    .min(1, 'Le stock est obligatoire')
    .trim();
  public static readonly LOW_STOCK_THRESHOLD_SCHEMA = z.string().trim();
  public static readonly MANAGE_STOCK_SCHEMA = z.boolean();
  public static readonly META_TITLE_SCHEMA = z.string();
  public static readonly META_DESCRIPTION_SCHEMA = z.string();
  public static readonly IS_ACTIVE_SCHEMA = z.boolean();
  public static readonly CREATED_BY_SCHEMA = z.string().trim();

  // SCHEMAS COMPLETS
  public static readonly CREATE_PRODUCT_SCHEMA = z.object({
    name: ProductConstants.NAME_SCHEMA,
    slug: ProductConstants.SLUG_SCHEMA,
    sku: ProductConstants.SKU_SCHEMA,
    shortDescription: ProductConstants.SHORT_DESCRIPTION_SCHEMA,
    description: ProductConstants.DESCRIPTION_SCHEMA,
    priceCents: ProductConstants.PRICE_CENTS_SCHEMA,
    taxRateId: ProductConstants.TAX_RATE_ID_SCHEMA,
    stockQuantity: ProductConstants.STOCK_QUANTITY_SCHEMA,
    lowStockThreshold: ProductConstants.LOW_STOCK_THRESHOLD_SCHEMA,
    manageStock: ProductConstants.MANAGE_STOCK_SCHEMA,
    metaTitle: ProductConstants.META_TITLE_SCHEMA,
    metaDescription: ProductConstants.META_DESCRIPTION_SCHEMA,
    isActive: ProductConstants.IS_ACTIVE_SCHEMA,
    createdBy: ProductConstants.CREATED_BY_SCHEMA
  });

  public static readonly RESPONSE_PRODUCT_SCHEMA = z.object({
    id: ProductConstants.ID_SCHEMA,
    name: ProductConstants.NAME_SCHEMA,
    slug: ProductConstants.SLUG_SCHEMA,
    sku: ProductConstants.SKU_SCHEMA,
    shortDescription: ProductConstants.SHORT_DESCRIPTION_SCHEMA,
    description: ProductConstants.DESCRIPTION_SCHEMA,
    priceCents: ProductConstants.PRICE_CENTS_SCHEMA,
    taxRateId: ProductConstants.TAX_RATE_ID_SCHEMA,
    stockQuantity: ProductConstants.STOCK_QUANTITY_SCHEMA,
    lowStockThreshold: ProductConstants.LOW_STOCK_THRESHOLD_SCHEMA,
    manageStock: ProductConstants.MANAGE_STOCK_SCHEMA,
    metaTitle: ProductConstants.META_TITLE_SCHEMA,
    metaDescription: ProductConstants.META_DESCRIPTION_SCHEMA,
    isActive: ProductConstants.IS_ACTIVE_SCHEMA,
    createdBy: ProductConstants.CREATED_BY_SCHEMA
  });
  // VALIDATION
  public static validationCreateProduct(data: unknown): CreateProductSchemaType {
    return ProductConstants.CREATE_PRODUCT_SCHEMA.parse(data);
  }

  //REPONSE
  public static validationResponseProduct(data: unknown): ResponseProductSchemaType {
    return ProductConstants.RESPONSE_PRODUCT_SCHEMA.parse(data);
  }
}

// TYPES
export type CreateProductSchemaType = z.infer<typeof ProductConstants.CREATE_PRODUCT_SCHEMA>;
export type ResponseProductSchemaType = z.infer<typeof ProductConstants.RESPONSE_PRODUCT_SCHEMA>;
