export class ProductImageQueriesConstants {
  public static readonly INSERT_PRODUCT_IMAGE: string = /*sql*/ `
    INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order, uploaded_by)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `;

  public static readonly SELECT_PRODUCT_IMAGE_BY_ID: string = /*sql*/ `
    SELECT 
      id, product_id, image_url, alt_text, is_primary, sort_order, uploaded_by, 
      uploaded_at, created_at, updated_at
    FROM product_images
    WHERE id = $1
  `;

  public static readonly SELECT_PRODUCT_IMAGES_BY_PRODUCT_ID: string = /*sql*/ `
    SELECT 
      id, product_id, image_url, alt_text, is_primary, sort_order, uploaded_by, 
      uploaded_at, created_at, updated_at
    FROM product_images
    WHERE product_id = $1
    ORDER BY sort_order ASC, created_at ASC
  `;

  public static readonly SELECT_ALL_PRODUCT_IMAGES: string = /*sql*/ `
    SELECT 
      id, product_id, image_url, alt_text, is_primary, sort_order, uploaded_by, 
      uploaded_at, created_at, updated_at
    FROM product_images
    ORDER BY product_id ASC, sort_order ASC
    LIMIT $1 OFFSET $2
  `;

  public static readonly UPDATE_PRODUCT_IMAGE: string = /*sql*/ `
    UPDATE product_images
    SET 
      product_id = COALESCE($2, product_id),
      image_url = COALESCE($3, image_url),
      alt_text = COALESCE($4, alt_text),
      is_primary = COALESCE($5, is_primary),
      sort_order = COALESCE($6, sort_order),
      uploaded_by = COALESCE($7, uploaded_by),
      updated_at = NOW()
    WHERE id = $1
    RETURNING 
      id, product_id, image_url, alt_text, is_primary, sort_order, uploaded_by, 
      uploaded_at, created_at, updated_at
  `;

  public static readonly DELETE_PRODUCT_IMAGE_BY_ID: string = /*sql*/ `
    DELETE FROM product_images WHERE id = $1
  `;

  public static readonly DELETE_PRODUCT_IMAGES_BY_PRODUCT_ID: string = /*sql*/ `
    DELETE FROM product_images WHERE product_id = $1
  `;

  public static readonly COUNT_PRODUCT_IMAGES_BY_PRODUCT_ID: string = /*sql*/ `
    SELECT COUNT(*) as count FROM product_images WHERE product_id = $1
  `;

  public static readonly SELECT_PRIMARY_IMAGE_BY_PRODUCT_ID: string = /*sql*/ `
    SELECT 
      id, product_id, image_url, alt_text, is_primary, sort_order, uploaded_by, 
      uploaded_at, created_at, updated_at
    FROM product_images
    WHERE product_id = $1 AND is_primary = true
    LIMIT 1
  `;
}
