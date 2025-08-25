-- =====================================================
-- VUE : v_order_items_detailed
-- =====================================================
-- RÔLE MÉTIER : Détails items commande avec infos produit (pour factures/exports)
-- ENDPOINTS LIÉS :
--   • GET /api/v1/orders/:id/items (détail items commande)
--   • GET /api/v1/admin/orders/:id/export (export facture)
-- JUSTIFICATION : Inclut les données produit actuelles pour comparaison prix
-- et affichage enrichi des items
CREATE
OR REPLACE VIEW v_order_items_detailed AS
SELECT
    -- === ITEM COMMANDE ===
    oi.id AS order_item_id,
    oi.order_id,
    oi.product_id,
    oi.product_name, -- Nom figé au moment commande
    oi.quantity,
    oi.unit_price_cents, -- Prix figé au moment commande
    oi.line_total_cents,
    -- === COMMANDE LIÉE ===
    o.order_number,
    o.status AS order_status,
    o.created_at AS order_date,
    -- === PRODUIT ACTUEL (pour comparaison) ===
    p.name AS current_product_name, -- Nom actuel (peut avoir changé)
    p.price_cents AS current_price_cents, -- Prix actuel (pour comparaison)
    p.is_active AS product_still_active, -- Produit toujours en vente ?
    p.stock_quantity AS current_stock -- Stock actuel
FROM
    order_items oi
    JOIN orders o ON oi.order_id = o.id
    LEFT JOIN products p ON oi.product_id = p.id -- LEFT car produit peut être supprimé
ORDER BY
    o.created_at DESC, -- Commandes récentes d'abord
    oi.id;
