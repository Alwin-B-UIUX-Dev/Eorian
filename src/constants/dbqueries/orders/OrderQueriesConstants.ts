export class OrderQueriesConstants {
  public static readonly INSERT_ORDER: string = /*sql*/ `
    INSERT INTO orders (
      order_number, user_id, shipping_address_id, billing_address_id,
      status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents,
      payment_status, payment_method, payment_reference, shipping_method,
      tracking_number, customer_notes, admin_notes
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    RETURNING id
  `;

  public static readonly SELECT_ORDER_BY_ID: string = /*sql*/ `
    SELECT 
      id, order_number, user_id, shipping_address_id, billing_address_id,
      status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents,
      payment_status, payment_method, payment_reference, shipping_method,
      tracking_number, customer_notes, admin_notes, created_at, updated_at,
      shipped_at, delivered_at
    FROM orders
    WHERE id = $1
  `;

  public static readonly SELECT_ORDER_BY_NUMBER: string = /*sql*/ `
    SELECT 
      id, order_number, user_id, shipping_address_id, billing_address_id,
      status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents,
      payment_status, payment_method, payment_reference, shipping_method,
      tracking_number, customer_notes, admin_notes, created_at, updated_at,
      shipped_at, delivered_at
    FROM orders
    WHERE order_number = $1
  `;

  public static readonly SELECT_ORDERS_BY_USER_ID: string = /*sql*/ `
    SELECT 
      id, order_number, user_id, shipping_address_id, billing_address_id,
      status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents,
      payment_status, payment_method, payment_reference, shipping_method,
      tracking_number, customer_notes, admin_notes, created_at, updated_at,
      shipped_at, delivered_at
    FROM orders
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;

  public static readonly SELECT_ORDERS_BY_STATUS: string = /*sql*/ `
    SELECT 
      id, order_number, user_id, shipping_address_id, billing_address_id,
      status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents,
      payment_status, payment_method, payment_reference, shipping_method,
      tracking_number, customer_notes, admin_notes, created_at, updated_at,
      shipped_at, delivered_at
    FROM orders
    WHERE status = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;

  public static readonly SELECT_ORDERS_BY_PAYMENT_STATUS: string = /*sql*/ `
    SELECT 
      id, order_number, user_id, shipping_address_id, billing_address_id,
      status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents,
      payment_status, payment_method, payment_reference, shipping_method,
      tracking_number, customer_notes, admin_notes, created_at, updated_at,
      shipped_at, delivered_at
    FROM orders
    WHERE payment_status = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;

  public static readonly SELECT_ALL_ORDERS: string = /*sql*/ `
    SELECT 
      id, order_number, user_id, shipping_address_id, billing_address_id,
      status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents,
      payment_status, payment_method, payment_reference, shipping_method,
      tracking_number, customer_notes, admin_notes, created_at, updated_at,
      shipped_at, delivered_at
    FROM orders
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  `;

  public static readonly UPDATE_ORDER: string = /*sql*/ `
    UPDATE orders
    SET 
      order_number = COALESCE($2, order_number),
      user_id = COALESCE($3, user_id),
      shipping_address_id = COALESCE($4, shipping_address_id),
      billing_address_id = COALESCE($5, billing_address_id),
      status = COALESCE($6, status),
      subtotal_cents = COALESCE($7, subtotal_cents),
      tax_amount_cents = COALESCE($8, tax_amount_cents),
      shipping_cents = COALESCE($9, shipping_cents),
      total_cents = COALESCE($10, total_cents),
      payment_status = COALESCE($11, payment_status),
      payment_method = COALESCE($12, payment_method),
      payment_reference = COALESCE($13, payment_reference),
      shipping_method = COALESCE($14, shipping_method),
      tracking_number = COALESCE($15, tracking_number),
      customer_notes = COALESCE($16, customer_notes),
      admin_notes = COALESCE($17, admin_notes),
      shipped_at = COALESCE($18, shipped_at),
      delivered_at = COALESCE($19, delivered_at),
      updated_at = NOW()
    WHERE id = $1
    RETURNING 
      id, order_number, user_id, shipping_address_id, billing_address_id,
      status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents,
      payment_status, payment_method, payment_reference, shipping_method,
      tracking_number, customer_notes, admin_notes, created_at, updated_at,
      shipped_at, delivered_at
  `;

  public static readonly DELETE_ORDER_BY_ID: string = /*sql*/ `
    DELETE FROM orders WHERE id = $1
  `;
}
