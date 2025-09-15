// src/constants/dbqueries/products/ProductQueries.ts

export class ProductQueries {
  // =============================================
  // REQUÊTES CREATE-UPDATE-DELETE (sur tables)
  // =============================================

  public static readonly INSERT_PRODUCT = `
    INSERT INTO products (
      name, slug, sku, short_description, description, price_cents,
      tax_rate_id, stock_quantity, low_stock_threshold, manage_stock,
      meta_title, meta_description, is_active, created_by
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING id
  `;

  public static readonly UPDATE_PRODUCT = `
    UPDATE products SET
      name = COALESCE($2, name),
      slug = COALESCE($3, slug),
      sku = COALESCE($4, sku),
      short_description = COALESCE($5, short_description),
      description = COALESCE($6, description),
      price_cents = COALESCE($7, price_cents),
      tax_rate_id = COALESCE($8, tax_rate_id),
      stock_quantity = COALESCE($9, stock_quantity),
      low_stock_threshold = COALESCE($10, low_stock_threshold),
      manage_stock = COALESCE($11, manage_stock),
      meta_title = COALESCE($12, meta_title),
      meta_description = COALESCE($13, meta_description),
      is_active = COALESCE($14, is_active),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING id
  `;

  public static readonly UPDATE_PRODUCT_STOCK = `
    UPDATE products SET
      stock_quantity = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING id
  `;

  public static readonly UPDATE_PRODUCT_STATUS = `
    UPDATE products SET
      is_active = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING id
  `;

  public static readonly DELETE_PRODUCT = `
    DELETE FROM products WHERE id = $1
  `;

  // =============================================
  // REQUÊTES SELECT (sur tables)
  // =============================================

  public static readonly SELECT_PRODUCT_BY_ID = `
    SELECT 
      p.id,
      p.name,
      p.slug,
      p.sku,
      p.short_description,
      p.description,
      p.price_cents,
      p.tax_rate_id,
      p.stock_quantity,
      p.low_stock_threshold,
      p.manage_stock,
      p.meta_title,
      p.meta_description,
      p.is_active,
      p.created_by,
      p.created_at,
      p.updated_at
    FROM products p
    WHERE p.id = $1
  `;

  public static readonly SELECT_PRODUCT_BY_SLUG = `
    SELECT 
      p.id,
      p.name,
      p.slug,
      p.sku,
      p.short_description,
      p.description,
      p.price_cents,
      p.tax_rate_id,
      p.stock_quantity,
      p.low_stock_threshold,
      p.manage_stock,
      p.meta_title,
      p.meta_description,
      p.is_active,
      p.created_by,
      p.created_at,
      p.updated_at
    FROM products p
    WHERE p.slug = $1
  `;

  public static readonly SELECT_PRODUCT_BY_SKU = `
    SELECT 
      p.id,
      p.name,
      p.slug,
      p.sku,
      p.short_description,
      p.description,
      p.price_cents,
      p.tax_rate_id,
      p.stock_quantity,
      p.low_stock_threshold,
      p.manage_stock,
      p.meta_title,
      p.meta_description,
      p.is_active,
      p.created_by,
      p.created_at,
      p.updated_at
    FROM products p
    WHERE p.sku = $1
  `;

  public static readonly SELECT_ALL_PRODUCTS = `
    SELECT 
      p.id,
      p.name,
      p.slug,
      p.sku,
      p.short_description,
      p.description,
      p.price_cents,
      p.tax_rate_id,
      p.stock_quantity,
      p.low_stock_threshold,
      p.manage_stock,
      p.meta_title,
      p.meta_description,
      p.is_active,
      p.created_by,
      p.created_at,
      p.updated_at
    FROM products p
    ORDER BY p.created_at DESC
    LIMIT $1 OFFSET $2
  `;

  public static readonly SELECT_PRODUCTS_BY_NAME = `
    SELECT 
      p.id,
      p.name,
      p.slug,
      p.sku,
      p.short_description,
      p.description,
      p.price_cents,
      p.tax_rate_id,
      p.stock_quantity,
      p.low_stock_threshold,
      p.manage_stock,
      p.meta_title,
      p.meta_description,
      p.is_active,
      p.created_by,
      p.created_at,
      p.updated_at
    FROM products p
    WHERE p.name ILIKE $1
    ORDER BY p.name ASC
    LIMIT $2 OFFSET $3
  `;

  public static readonly SELECT_ACTIVE_PRODUCTS = `
    SELECT 
      p.id,
      p.name,
      p.slug,
      p.sku,
      p.short_description,
      p.description,
      p.price_cents,
      p.tax_rate_id,
      p.stock_quantity,
      p.low_stock_threshold,
      p.manage_stock,
      p.meta_title,
      p.meta_description,
      p.is_active,
      p.created_by,
      p.created_at,
      p.updated_at
    FROM products p
    WHERE p.is_active = true
    ORDER BY p.created_at DESC
    LIMIT $1 OFFSET $2
  `;

  public static readonly SELECT_OUT_OF_STOCK_PRODUCTS = `
    SELECT 
      p.id,
      p.name,
      p.slug,
      p.sku,
      p.short_description,
      p.description,
      p.price_cents,
      p.tax_rate_id,
      p.stock_quantity,
      p.low_stock_threshold,
      p.manage_stock,
      p.meta_title,
      p.meta_description,
      p.is_active,
      p.created_by,
      p.created_at,
      p.updated_at
    FROM products p
    WHERE p.stock_quantity = 0 AND p.manage_stock = true
    ORDER BY p.name ASC
    LIMIT $1 OFFSET $2
  `;

  public static readonly SELECT_LOW_STOCK_PRODUCTS = `
    SELECT 
      p.id,
      p.name,
      p.slug,
      p.sku,
      p.short_description,
      p.description,
      p.price_cents,
      p.tax_rate_id,
      p.stock_quantity,
      p.low_stock_threshold,
      p.manage_stock,
      p.meta_title,
      p.meta_description,
      p.is_active,
      p.created_by,
      p.created_at,
      p.updated_at
    FROM products p
    WHERE p.stock_quantity <= p.low_stock_threshold 
      AND p.manage_stock = true 
      AND p.stock_quantity > 0
    ORDER BY p.stock_quantity ASC
    LIMIT $1 OFFSET $2
  `;

  public static readonly SELECT_PRODUCTS_BY_CREATOR = `
    SELECT 
      p.id,
      p.name,
      p.slug,
      p.sku,
      p.short_description,
      p.description,
      p.price_cents,
      p.tax_rate_id,
      p.stock_quantity,
      p.low_stock_threshold,
      p.manage_stock,
      p.meta_title,
      p.meta_description,
      p.is_active,
      p.created_by,
      p.created_at,
      p.updated_at
    FROM products p
    WHERE p.created_by = $1
    ORDER BY p.created_at DESC
    LIMIT $2 OFFSET $3
  `;

  public static readonly SELECT_PRODUCTS_BY_TAX_RATE = `
    SELECT 
      p.id,
      p.name,
      p.slug,
      p.sku,
      p.short_description,
      p.description,
      p.price_cents,
      p.tax_rate_id,
      p.stock_quantity,
      p.low_stock_threshold,
      p.manage_stock,
      p.meta_title,
      p.meta_description,
      p.is_active,
      p.created_by,
      p.created_at,
      p.updated_at
    FROM products p
    WHERE p.tax_rate_id = $1
    ORDER BY p.name ASC
    LIMIT $2 OFFSET $3
  `;

  public static readonly COUNT_ALL_PRODUCTS = `
    SELECT COUNT(*) as count FROM products
  `;

  public static readonly COUNT_ACTIVE_PRODUCTS = `
    SELECT COUNT(*) as count FROM products WHERE is_active = true
  `;
}
