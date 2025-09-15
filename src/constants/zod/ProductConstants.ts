import { z } from 'zod';

export class ProductConstants {
  // ID AUTO_INCREMENT
  public static readonly ID_SCHEMA = z.string().min(1);

  // SCHEMAS DE BASE
  public static readonly NAME_SCHEMA = z
    .string()
    .min(1, 'Le nom du produit est requis')
    .max(200, 'Le nom du produit ne peut pas dépasser 200 caractères')
    .trim();

  public static readonly SLUG_SCHEMA = z
    .string()
    .min(3, 'Le slug doit contenir au moins 3 caractères')
    .max(200, 'Le slug ne peut pas dépasser 200 caractères')
    .regex(
      /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/,
      'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets'
    )
    .trim();

  public static readonly SKU_SCHEMA = z
    .string()
    .min(1, 'Le SKU est requis')
    .max(100, 'Le SKU ne peut pas dépasser 100 caractères')
    .trim()
    .optional();

  public static readonly PRICE_CENTS_SCHEMA = z
    .number()
    .int('Le prix doit être un nombre entier')
    .positive('Le prix doit être positif');

  public static readonly STOCK_QUANTITY_SCHEMA = z
    .number()
    .int('La quantité doit être un nombre entier')
    .min(0, 'La quantité ne peut pas être négative')
    .default(0);

  public static readonly LOW_STOCK_THRESHOLD_SCHEMA = z
    .number()
    .int('Le seuil de stock faible doit être un nombre entier')
    .min(0, 'Le seuil de stock faible ne peut pas être négatif')
    .default(10);

  public static readonly TAX_RATE_ID_SCHEMA = z.string().min(1, "L'ID du taux de taxe est requis");

  public static readonly CREATED_BY_SCHEMA = z.string().min(1, "L'ID du créateur est requis");

  // SCHEMAS COMPLETS
  public static readonly CREATE_PRODUCT_SCHEMA = z.object({
    name: ProductConstants.NAME_SCHEMA,
    slug: ProductConstants.SLUG_SCHEMA,
    sku: ProductConstants.SKU_SCHEMA,
    shortDescription: z.string().max(500).optional(),
    description: z.string().optional(),
    priceCents: ProductConstants.PRICE_CENTS_SCHEMA,
    taxRateId: ProductConstants.TAX_RATE_ID_SCHEMA,
    stockQuantity: ProductConstants.STOCK_QUANTITY_SCHEMA,
    lowStockThreshold: ProductConstants.LOW_STOCK_THRESHOLD_SCHEMA,
    manageStock: z.boolean().default(true),
    metaTitle: z.string().max(200).optional(),
    metaDescription: z.string().max(500).optional(),
    isActive: z.boolean().default(true),
    createdBy: ProductConstants.CREATED_BY_SCHEMA
  });

  public static readonly UPDATE_PRODUCT_SCHEMA = z.object({
    name: ProductConstants.NAME_SCHEMA.optional(),
    slug: ProductConstants.SLUG_SCHEMA.optional(),
    sku: ProductConstants.SKU_SCHEMA,
    shortDescription: z.string().max(500).optional(),
    description: z.string().optional(),
    priceCents: ProductConstants.PRICE_CENTS_SCHEMA.optional(),
    taxRateId: ProductConstants.TAX_RATE_ID_SCHEMA.optional(),
    stockQuantity: ProductConstants.STOCK_QUANTITY_SCHEMA.optional(),
    lowStockThreshold: ProductConstants.LOW_STOCK_THRESHOLD_SCHEMA.optional(),
    manageStock: z.boolean().optional(),
    metaTitle: z.string().max(200).optional(),
    metaDescription: z.string().max(500).optional(),
    isActive: z.boolean().optional()
  });

  public static readonly RESPONSE_PRODUCT_SCHEMA = z.object({
    id: ProductConstants.ID_SCHEMA,
    name: ProductConstants.NAME_SCHEMA,
    slug: ProductConstants.SLUG_SCHEMA,
    sku: ProductConstants.SKU_SCHEMA,
    shortDescription: z.string().optional(),
    description: z.string().optional(),
    priceCents: ProductConstants.PRICE_CENTS_SCHEMA,
    taxRateId: ProductConstants.TAX_RATE_ID_SCHEMA,
    stockQuantity: ProductConstants.STOCK_QUANTITY_SCHEMA,
    lowStockThreshold: ProductConstants.LOW_STOCK_THRESHOLD_SCHEMA,
    manageStock: z.boolean(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    isActive: z.boolean(),
    createdBy: ProductConstants.CREATED_BY_SCHEMA,
    createdAt: z.date(),
    updatedAt: z.date()
  });

  public static readonly UPDATE_STOCK_SCHEMA = z.object({
    stockQuantity: ProductConstants.STOCK_QUANTITY_SCHEMA
  });

  public static readonly UPDATE_STATUS_SCHEMA = z.object({
    isActive: z.boolean()
  });

  // VALIDATIONS
  public static validateCreateProduct(data: unknown): CreateProductSchemaType {
    return ProductConstants.CREATE_PRODUCT_SCHEMA.parse(data);
  }

  public static validateUpdateProduct(data: unknown): UpdateProductSchemaType {
    return ProductConstants.UPDATE_PRODUCT_SCHEMA.parse(data);
  }

  public static validateResponseProduct(data: unknown): ResponseProductSchemaType {
    return ProductConstants.RESPONSE_PRODUCT_SCHEMA.parse(data);
  }

  public static validateUpdateStock(data: unknown): UpdateStockSchemaType {
    return ProductConstants.UPDATE_STOCK_SCHEMA.parse(data);
  }

  public static validateUpdateStatus(data: unknown): UpdateStatusSchemaType {
    return ProductConstants.UPDATE_STATUS_SCHEMA.parse(data);
  }
}

// TYPES
export type CreateProductSchemaType = z.infer<typeof ProductConstants.CREATE_PRODUCT_SCHEMA>;
export type UpdateProductSchemaType = z.infer<typeof ProductConstants.UPDATE_PRODUCT_SCHEMA>;
export type ResponseProductSchemaType = z.infer<typeof ProductConstants.RESPONSE_PRODUCT_SCHEMA>;
export type UpdateStockSchemaType = z.infer<typeof ProductConstants.UPDATE_STOCK_SCHEMA>;
export type UpdateStatusSchemaType = z.infer<typeof ProductConstants.UPDATE_STATUS_SCHEMA>;
