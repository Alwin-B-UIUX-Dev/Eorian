-- Active: 1753172326626@@127.0.0.1@5432@eorian_fr_db
-- =====================================================
-- VUE : v_user_addresses
-- =====================================================
-- RÔLE MÉTIER : Adresses utilisateurs avec destinataire (pour checkout/livraisons)
-- ENDPOINTS LIÉS :
--   • GET /api/v1/user/addresses (sélection adresse checkout)
--   • GET /api/v1/admin/addresses (gestion admin)
--   • POST /api/v1/orders (création commande avec adresse)
-- JUSTIFICATION : Inclut les infos destinataire pour éviter un JOIN supplémentaire
-- lors de l'affichage des adresses ou génération d'étiquettes
CREATE
OR REPLACE VIEW v_user_addresses AS
SELECT
    -- === ADRESSE ===
    a.id AS address_id,
    a.user_id,
    a.type,
    a.address_line_1,
    a.address_line_2,
    a.city,
    a.postal_code,
    a.country,
    a.is_default,
    -- === DESTINATAIRE (pour factures/livraisons) ===
    a.first_name,
    a.last_name,
    CONCAT (a.first_name, ' ', a.last_name) AS full_name,
    a.phone, -- Essentiel pour transporteur
    u.email, -- Contact livraison
    -- === AUDIT ===
    a.created_at,
    a.updated_at
FROM
    addresses a
    JOIN users u ON a.user_id = u.id
ORDER BY
    a.user_id,
    a.is_default DESC, -- Adresse par défaut en premier
    a.created_at ASC;
