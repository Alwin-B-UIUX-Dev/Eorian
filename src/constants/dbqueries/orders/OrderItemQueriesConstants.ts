export class OrderItemQueriesConstants {
  public static readonly INSERT_ORDER_ITEM: string = /*sql*/ `
    INSERT INTO order_items (
      order_id, product_id, product_name, product_sku,
      unit_price_cents, tax_rate, quantity,
      line_subtotal_cents, line_tax_cents, line_total_cents
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING id
  `;

  public static readonly SELECT_ORDER_ITEM_BY_ID: string = /*sql*/ `
    SELECT 
      id, order_id, product_id, product_name, product_sku,
      unit_price_cents, tax_rate, quantity,
      line_subtotal_cents, line_tax_cents, line_total_cents,
      created_at, updated_at
    FROM order_items
    WHERE id = $1
  `;

  public static readonly SELECT_ORDER_ITEMS_BY_ORDER_ID: string = /*sql*/ `
    SELECT 
      id, order_id, product_id, product_name, product_sku,
      unit_price_cents, tax_rate, quantity,
      line_subtotal_cents, line_tax_cents, line_total_cents,
      created_at, updated_at
    FROM order_items
    WHERE order_id = $1
    ORDER BY id ASC
  `;

  public static readonly SELECT_ORDER_ITEMS_BY_PRODUCT_ID: string = /*sql*/ `
    SELECT 
      id, order_id, product_id, product_name, product_sku,
      unit_price_cents, tax_rate, quantity,
      line_subtotal_cents, line_tax_cents, line_total_cents,
      created_at, updated_at
    FROM order_items
    WHERE product_id = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;

  public static readonly SELECT_ALL_ORDER_ITEMS: string = /*sql*/ `
    SELECT 
      id, order_id, product_id, product_name, product_sku,
      unit_price_cents, tax_rate, quantity,
      line_subtotal_cents, line_tax_cents, line_total_cents,
      created_at, updated_at
    FROM order_items
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  `;

  public static readonly UPDATE_ORDER_ITEM: string = /*sql*/ `
    UPDATE order_items
    SET 
      order_id = COALESCE($2, order_id),
      product_id = COALESCE($3, product_id),
      product_name = COALESCE($4, product_name),
      product_sku = COALESCE($5, product_sku),
      unit_price_cents = COALESCE($6, unit_price_cents),
      tax_rate = COALESCE($7, tax_rate),
      quantity = COALESCE($8, quantity),
      line_subtotal_cents = COALESCE($9, line_subtotal_cents),
      line_tax_cents = COALESCE($10, line_tax_cents),
      line_total_cents = COALESCE($11, line_total_cents),
      updated_at = NOW()
    WHERE id = $1
    RETURNING 
      id, order_id, product_id, product_name, product_sku,
      unit_price_cents, tax_rate, quantity,
      line_subtotal_cents, line_tax_cents, line_total_cents,
      created_at, updated_at
  `;

  public static readonly DELETE_ORDER_ITEM_BY_ID: string = /*sql*/ `
    DELETE FROM order_items WHERE id = $1
  `;

  public static readonly DELETE_ORDER_ITEMS_BY_ORDER_ID: string = /*sql*/ `
    DELETE FROM order_items WHERE order_id = $1
  `;
}
