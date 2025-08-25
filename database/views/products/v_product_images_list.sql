-- =====================================================
-- VUE : v_product_images_list
-- =====================================================
-- RÔLE MÉTIER : Images produits ordonnées (pour API séparée images)
-- ENDPOINTS LIÉS :
--   • GET /api/v1/products/:id/images (images d'un produit)
--   • GET /api/v1/admin/products/:id/images (gestion admin images)
-- JUSTIFICATION : Requête séparée pour éviter duplication dans product_catalog
-- Node.js peut choisir de charger les images ou non selon le besoin
CREATE
OR REPLACE VIEW v_product_images_list AS
SELECT
    -- === IMAGE ===
    pi.id AS image_id,
    pi.product_id,
    p.name AS product_name,
    p.slug AS product_slug,
    pi.image_url,
    pi.alt_text,
    pi.is_primary,
    pi.sort_order,
    pi.uploaded_at
FROM
    product_images pi
JOIN products p ON pi.product_id = p.id
ORDER BY
    pi.product_id, -- Groupement par produit
    pi.sort_order ASC;
