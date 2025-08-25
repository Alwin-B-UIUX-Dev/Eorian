-- =====================================================
-- VUE : v_orders_summary
-- =====================================================
-- RÔLE MÉTIER : Résumé commandes avec client et adresses dénormalisées
-- ENDPOINTS LIÉS :
--   • GET /api/v1/orders (historique client)
--   • GET /api/v1/admin/orders (gestion admin)
--   • GET /api/v1/orders/:id (détail commande)
-- JUSTIFICATION : Pré-calcule les JOINs vers addresses pour performance
-- Évite 3 requêtes séparées (order + shipping_address + billing_address)
CREATE
OR REPLACE VIEW v_orders_summary AS
SELECT
    -- === COMMANDE ===
    o.id AS order_id,
    o.order_number,
    o.user_id,
    o.status,
    o.payment_status,
    o.total_cents,
    o.shipping_method,
    o.tracking_number,
    -- === DATES IMPORTANTES ===
    o.created_at AS order_date,
    o.shipped_at,
    o.delivered_at,
    -- === CLIENT ===
    CONCAT (ba.first_name, ' ', ba.last_name) AS customer_name,
    u.email AS customer_email,
    -- === ADRESSE LIVRAISON (dénormalisée pour performance) ===
    sa.address_line_1 AS shipping_address_line_1,
    sa.address_line_2 AS shipping_address_line_2,
    sa.city AS shipping_city,
    sa.postal_code AS shipping_postal_code,
    sa.country AS shipping_country,
    -- === ADRESSE FACTURATION ===
    ba.address_line_1 AS billing_address_line_1,
    ba.address_line_2 AS billing_address_line_2,
    ba.city AS billing_city,
    ba.postal_code AS billing_postal_code,
    ba.country AS billing_country
FROM
    orders o
    LEFT JOIN users u ON o.user_id = u.id
    LEFT JOIN user_profiles up ON u.id = up.user_id
    LEFT JOIN addresses sa ON o.shipping_address_id = sa.id -- Adresse livraison
    LEFT JOIN addresses ba ON o.billing_address_id = ba.id -- Adresse facturation
ORDER BY
    o.created_at DESC;
