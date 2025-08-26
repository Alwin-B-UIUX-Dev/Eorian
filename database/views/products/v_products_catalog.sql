-- =====================================================
-- VUE : v_products_catalog
-- =====================================================
-- RÔLE MÉTIER : Catalogue produits actifs pour navigation client
-- ENDPOINTS LIÉS :
--   • GET /api/v1/products (liste produits)
--   • GET /api/v1/products/featured (produits mis en avant)
--   • GET /api/v1/search?q=... (recherche produits)
-- JUSTIFICATION : Filtre activé par défaut, ordre par featured puis date
CREATE
OR REPLACE VIEW v_products_catalog AS
SELECT
    -- === PRODUIT ===
    p.id AS product_id,
    p.name,
    p.slug,
    p.sku,
    p.description,
    p.short_description,
    p.price_cents,
    p.stock_quantity,
    p.low_stock_threshold,
    pi.image_url AS primary_image_url,
    pi.alt_text AS primary_image_alt,
    p.is_active,
    -- === SEO ===
    p.meta_title,
    p.meta_description,
    -- === AUDIT ===
    p.created_at,
    p.updated_at
FROM
    products p
LEFT JOIN product_images pi on p.id = pi.product_id AND pi.is_primary = TRUE
WHERE
    p.is_active = TRUE
ORDER BY
    p.created_at DESC;
