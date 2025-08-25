-- =====================================================
-- VUE : v_cart_items_summary
-- =====================================================
-- RÔLE MÉTIER : Panier utilisateur avec validation stock et calculs temps réel
-- ENDPOINTS LIÉS :
--   • GET /api/v1/cart (affichage panier utilisateur)
--   • PUT /api/v1/cart/items/:id (mise à jour quantité)
--   • POST /api/v1/checkout/validate (validation avant commande)
--   • GET /api/v1/admin/abandoned-carts (analyse paniers abandonnés)
-- JUSTIFICATION : Join cart_items + products pour éviter N+1 queries
-- Calcule automatiquement totaux et valide stock disponible en temps réel
CREATE
OR REPLACE VIEW v_cart_items_summary AS
SELECT
    -- === PANIER ===
    ci.id AS cart_item_id,
    ci.user_id,
    ci.product_id,
    ci.quantity AS requested_quantity,
    ci.updated_at AS last_modified,
    -- === PRODUIT (données actuelles) ===
    p.name AS product_name,
    p.slug AS product_slug,
    p.sku AS product_sku,
    p.author,
    p.isbn,
    p.price_cents AS current_price_cents, -- Prix actuel (peut avoir changé)
    p.stock_quantity AS available_stock,
    p.is_active AS product_active,
    p.short_description,
    -- === CALCULS AUTOMATIQUES ===
    (ci.quantity * p.price_cents) AS line_total_cents, -- Total ligne
    -- === VALIDATION STOCK ===
    CASE
        WHEN p.stock_quantity >= ci.quantity THEN true
        ELSE false
    END AS stock_sufficient,
    CASE
        WHEN p.stock_quantity > ci.quantity THEN (p.stock_quantity - ci.quantity)
        ELSE 0
    END AS remaining_stock_after, -- Stock restant après cet item
    -- === ALERTES MÉTIER ===
    CASE
        WHEN NOT p.is_active THEN 'PRODUIT_INACTIVE'
        WHEN p.stock_quantity = 0 THEN 'RUPTURE_STOCK'
        WHEN p.stock_quantity < ci.quantity THEN 'STOCK_INSUFFISANT'
        WHEN p.stock_quantity <= p.low_stock_threshold THEN 'STOCK_BAS'
        ELSE 'OK'
    END AS status_alert,
    -- === DONNÉES AFFICHAGE ===
    p.low_stock_threshold,
    -- === AUDIT ===
    ci.added_at AS added_to_cart_at
FROM
    cart_items ci
    JOIN products p ON ci.product_id = p.id -- JOIN obligatoire car besoin données produit actuelles
ORDER BY
    ci.user_id, -- Groupement par utilisateur
    ci.updated_at DESC;
