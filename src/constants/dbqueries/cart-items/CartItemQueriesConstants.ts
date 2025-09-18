export class CartItemQueriesConstants {
  public static readonly INSERT_CART_ITEM = `
    INSERT INTO cart_items (user_id, product_id, quantity, added_at)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;

  public static readonly UPDATE_CART_ITEM = `
    UPDATE cart_items 
    SET user_id = $2, product_id = $3, quantity = $4, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `;

  public static readonly DELETE_CART_ITEM_BY_ID = `
    DELETE FROM cart_items WHERE id = $1
  `;

  public static readonly DELETE_CART_ITEM_BY_USER_AND_PRODUCT = `
    DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2
  `;

  public static readonly DELETE_CART_ITEMS_BY_USER_ID = `
    DELETE FROM cart_items WHERE user_id = $1
  `;

  public static readonly SELECT_CART_ITEM_BY_ID = `
    SELECT * FROM cart_items WHERE id = $1
  `;

  public static readonly SELECT_ALL_CART_ITEMS = `
    SELECT * FROM cart_items 
    ORDER BY created_at DESC 
    LIMIT $1 OFFSET $2
  `;

  public static readonly SELECT_CART_ITEMS_BY_USER_ID = `
    SELECT * FROM cart_items 
    WHERE user_id = $1 
    ORDER BY added_at DESC
  `;

  public static readonly SELECT_CART_ITEM_BY_USER_AND_PRODUCT = `
    SELECT * FROM cart_items 
    WHERE user_id = $1 AND product_id = $2
  `;
}
