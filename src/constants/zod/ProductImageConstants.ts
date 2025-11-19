import { z } from 'zod';

export class ProductImageConstants {
  public static readonly PRODUCT_ID = z
    .number()
    .int("L'ID du produit doit être un nombre entier")
    .min(1, "L'ID du produit doit être positif");

  public static readonly IMAGE_URL = z
    .string()
    .min(1, "L'URL de l'image est obligatoire")
    .max(500, "L'URL de l'image ne peut pas dépasser 500 caractères")
    .url("L'URL de l'image doit être valide");

  public static readonly ALT_TEXT = z
    .string()
    .max(200, 'Le texte alternatif ne peut pas dépasser 200 caractères')
    .optional()
    .nullable();

  public static readonly IS_PRIMARY = z.boolean().default(false);

  public static readonly SORT_ORDER = z
    .number()
    .int("L'ordre de tri doit être un nombre entier")
    .min(0, "L'ordre de tri doit être positif ou nul")
    .default(0);

  public static readonly UPLOADED_BY = z
    .number()
    .int("L'ID de l'utilisateur doit être un nombre entier")
    .min(1, "L'ID de l'utilisateur doit être positif");

  public static readonly CREATE_PRODUCT_IMAGE_SCHEMA = z.object({
    productId: ProductImageConstants.PRODUCT_ID,
    imageUrl: ProductImageConstants.IMAGE_URL,
    altText: ProductImageConstants.ALT_TEXT,
    isPrimary: ProductImageConstants.IS_PRIMARY,
    sortOrder: ProductImageConstants.SORT_ORDER,
    uploadedBy: ProductImageConstants.UPLOADED_BY
  });

  public static readonly UPDATE_PRODUCT_IMAGE_SCHEMA = z.object({
    productId: ProductImageConstants.PRODUCT_ID.optional(),
    imageUrl: ProductImageConstants.IMAGE_URL.optional(),
    altText: ProductImageConstants.ALT_TEXT.optional(),
    isPrimary: ProductImageConstants.IS_PRIMARY.optional(),
    sortOrder: ProductImageConstants.SORT_ORDER.optional(),
    uploadedBy: ProductImageConstants.UPLOADED_BY.optional()
  });

  public static validateCreateProductImage(data: unknown) {
    return ProductImageConstants.CREATE_PRODUCT_IMAGE_SCHEMA.parse(data);
  }

  public static validateUpdateProductImage(data: unknown) {
    return ProductImageConstants.UPDATE_PRODUCT_IMAGE_SCHEMA.parse(data);
  }
}

export type CreateProductImageSchemaType = z.infer<
  typeof ProductImageConstants.CREATE_PRODUCT_IMAGE_SCHEMA
>;
export type UpdateProductImageSchemaType = z.infer<
  typeof ProductImageConstants.UPDATE_PRODUCT_IMAGE_SCHEMA
>;
