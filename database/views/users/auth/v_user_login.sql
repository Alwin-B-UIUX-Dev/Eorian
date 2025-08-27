-- Active: 1753172326626@@127.0.0.1@5432@eorian_fr_db
-- =====================================================
-- VUE : Endpoint POST /api/v1/auth/login
-- =====================================================
-- USAGE : Vérifier credentials + récupérer infos user
CREATE
OR REPLACE VIEW v_user_login AS
SELECT
    u.id as user_id,
    u.email,
    u.username,
    u.password_hash,
    u.is_active,
    u.email_verified,
    u.gdpr_consent,
    u.is_connected,
    u.role_id, -- FK pour les relations
    ur.role_name, -- Valeur pour la logique
    u.last_login_at
FROM
    users u
    LEFT JOIN user_roles ur ON u.role_id = ur.id
WHERE
    u.is_active = true;
