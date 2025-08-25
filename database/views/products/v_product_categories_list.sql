-- =====================================================
-- VUE : v_product_categories_list
-- =====================================================
-- RÔLE MÉTIER : Relations produits-catégories avec noms catégories
-- ENDPOINTS LIÉS :
--   • GET /api/v1/products/:id/categories (catégories d'un produit)
--   • GET /api/v1/categories/:slug/products (produits d'une catégorie)
-- JUSTIFICATION : Inclut le nom catégorie pour éviter JOIN côté Node.js
-- Distinction catégorie primaire vs secondaires pour SEO
CREATE
OR REPLACE VIEW v_product_categories_list AS
SELECT
    -- === RELATION ===
    pc.product_id,
    pc.category_id,
    pc.is_primary, -- Catégorie principale (SEO)
    pc.sort_order,
    -- === CATÉGORIE (pour éviter JOIN côté API) ===
    c.name AS category_name,
    c.slug AS category_slug,
    c.parent_id AS category_parent_id, -- Hiérarchie catégorie
    -- === AUDIT ===
    pc.created_at
FROM
    product_categories pc
    JOIN categories c ON pc.category_id = c.id
ORDER BY
    pc.product_id, -- Groupement par produit
    pc.is_primary DESC, -- Catégorie primaire d'abord
    pc.sort_order ASC;
