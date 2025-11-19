import { z } from 'zod';

/**
 * Ensemble de règles Zod réutilisables pour valider les objets produit.
 * Les validations primitives sont regroupées puis combinées dans les schémas complets.
 */
export class ProductConstants {
  public static readonly NAME = z
    .string()
    .min(1, 'Le nom du produit est requis')
    .max(200, 'Le nom du produit doit contenir au maximum 200 caractères');

  public static readonly SLUG = z
    .string()
    .min(3, 'Le slug doit contenir au moins 3 caractères')
    .max(200, 'Le slug doit contenir au maximum 200 caractères')
    .regex(
      /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/,
      'Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets'
    );

  public static readonly SKU = z
    .string()
    .max(100, 'Le SKU doit contenir au maximum 100 caractères')
    .optional()
    .nullable();

  public static readonly SHORT_DESCRIPTION = z
    .string()
    .max(500, 'La description courte doit contenir au maximum 500 caractères')
    .optional()
    .nullable();

  public static readonly DESCRIPTION = z
    .string()
    .max(2000, 'La description doit contenir au maximum 2000 caractères')
    .optional()
    .nullable();

  public static readonly PRICE_CENTS = z
    .number()
    .int('Le prix doit être un nombre entier (en centimes)')
    .min(1, 'Le prix doit être positif');

  public static readonly TAX_RATE_ID = z
    .number()
    .int("L'ID du taux de taxe doit être un nombre entier")
    .min(1, "L'ID du taux de taxe doit être positif");

  public static readonly STOCK_QUANTITY = z
    .number()
    .int('La quantité en stock doit être un nombre entier')
    .min(0, 'La quantité en stock doit être positive ou nulle');

  public static readonly LOW_STOCK_THRESHOLD = z
    .number()
    .int('Le seuil de stock bas doit être un nombre entier')
    .min(0, 'Le seuil de stock bas doit être positif ou nul')
    .default(10);

  public static readonly MANAGE_STOCK = z.boolean().default(true);

  public static readonly META_TITLE = z
    .string()
    .max(200, 'Le meta title doit contenir au maximum 200 caractères')
    .optional()
    .nullable();

  public static readonly META_DESCRIPTION = z
    .string()
    .max(500, 'La meta description doit contenir au maximum 500 caractères')
    .optional()
    .nullable();

  public static readonly IS_ACTIVE = z.boolean().default(true);

  public static readonly CREATED_BY = z
    .number()
    .int("L'ID du créateur doit être un nombre entier")
    .min(1, "L'ID du créateur doit être positif");

  /**
   * Schéma complet pour la création : toutes les contraintes obligatoires sont appliquées.
   */
  public static readonly CREATE_PRODUCT_SCHEMA = z.object({
    name: ProductConstants.NAME,
    slug: ProductConstants.SLUG,
    sku: ProductConstants.SKU,
    shortDescription: ProductConstants.SHORT_DESCRIPTION,
    description: ProductConstants.DESCRIPTION,
    priceCents: ProductConstants.PRICE_CENTS,
    taxRateId: ProductConstants.TAX_RATE_ID,
    stockQuantity: ProductConstants.STOCK_QUANTITY,
    lowStockThreshold: ProductConstants.LOW_STOCK_THRESHOLD,
    manageStock: ProductConstants.MANAGE_STOCK,
    metaTitle: ProductConstants.META_TITLE,
    metaDescription: ProductConstants.META_DESCRIPTION,
    isActive: ProductConstants.IS_ACTIVE,
    createdBy: ProductConstants.CREATED_BY
  });

  /**
   * Schéma pour la mise à jour partielle : la plupart des champs sont optionnels,
   * et une contrainte globale vérifie qu'au moins une propriété est fournie.
   */

  public static readonly UPDATE_PRODUCT_SCHEMA = z
    .object({
      name: ProductConstants.NAME.optional(),
      slug: ProductConstants.SLUG.optional(),
      sku: ProductConstants.SKU,
      shortDescription: ProductConstants.SHORT_DESCRIPTION,
      description: ProductConstants.DESCRIPTION,
      priceCents: ProductConstants.PRICE_CENTS.optional(),
      taxRateId: ProductConstants.TAX_RATE_ID.optional(),
      stockQuantity: ProductConstants.STOCK_QUANTITY.optional(),
      lowStockThreshold: ProductConstants.LOW_STOCK_THRESHOLD,
      manageStock: ProductConstants.MANAGE_STOCK,
      metaTitle: ProductConstants.META_TITLE,
      metaDescription: ProductConstants.META_DESCRIPTION,
      isActive: ProductConstants.IS_ACTIVE
    })
    .refine(obj => Object.keys(obj).length > 0, {
      message: 'Aucune donnée fournie pour la mise à jour'
    });

  /**
   * sert à vérifier que les données envoyées lors de la création.
   */
  public static validateCreateProduct(data: unknown): CreateProductSchemaType {
    return ProductConstants.CREATE_PRODUCT_SCHEMA.parse(data);
  }

  /**
   * sert à vérifier que les données envoyées lors de la mise à jour partielle.
   */
  public static validateUpdateProduct(data: unknown): UpdateProductSchemaType {
    return ProductConstants.UPDATE_PRODUCT_SCHEMA.parse(data);
  }
}

export type CreateProductSchemaType = z.infer<typeof ProductConstants.CREATE_PRODUCT_SCHEMA>;
export type UpdateProductSchemaType = z.infer<typeof ProductConstants.UPDATE_PRODUCT_SCHEMA>;
