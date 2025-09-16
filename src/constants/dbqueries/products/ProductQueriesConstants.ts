export class ProductQueriesConstants {
  public static readonly INSERT_PRODUCT: string = /*sql*/ `
    INSERT INTO products (
      name, slug, sku, short_description, description, price_cents, 
      tax_rate_id, stock_quantity, low_stock_threshold, manage_stock,
      meta_title, meta_description, is_active, created_by
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING id
  `;

  public static readonly SELECT_PRODUCT_BY_ID: string = /*sql*/ `
    SELECT 
      id, name, slug, sku, short_description, description, price_cents,
      tax_rate_id, stock_quantity, low_stock_threshold, manage_stock,
      meta_title, meta_description, is_active, created_by, created_at, updated_at
    FROM products
    WHERE id = $1
  `;

  public static readonly SELECT_PRODUCT_BY_NAME: string = /*sql*/ `
    SELECT 
      id, name, slug, sku, short_description, description, price_cents,
      tax_rate_id, stock_quantity, low_stock_threshold, manage_stock,
      meta_title, meta_description, is_active, created_by, created_at, updated_at
    FROM products
    WHERE name = $1
  `;

  public static readonly SELECT_PRODUCTS_BY_ACTIVE: string = /*sql*/ `
    SELECT 
      id, name, slug, sku, short_description, description, price_cents,
      tax_rate_id, stock_quantity, low_stock_threshold, manage_stock,
      meta_title, meta_description, is_active, created_by, created_at, updated_at
    FROM products
    WHERE is_active = $1
    ORDER BY name ASC
  `;

  public static readonly SELECT_ALL_PRODUCTS: string = /*sql*/ `
    SELECT 
      id, name, slug, sku, short_description, description, price_cents,
      tax_rate_id, stock_quantity, low_stock_threshold, manage_stock,
      meta_title, meta_description, is_active, created_by, created_at, updated_at
    FROM products
    ORDER BY name ASC
    LIMIT $1 OFFSET $2
  `;

  public static readonly UPDATE_PRODUCT: string = /*sql*/ `
    UPDATE products
    SET 
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
      updated_at = NOW()
    WHERE id = $1
    RETURNING 
      id, name, slug, sku, short_description, description, price_cents,
      tax_rate_id, stock_quantity, low_stock_threshold, manage_stock,
      meta_title, meta_description, is_active, created_by, created_at, updated_at
  `;

  public static readonly DELETE_PRODUCT_BY_ID: string = /*sql*/ `
    DELETE FROM products WHERE id = $1
  `;
}
