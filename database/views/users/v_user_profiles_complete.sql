-- Active: 1753172326626@@127.0.0.1@5432@eorian_fr_db
-- =====================================================
-- VUE : v_user_profiles_complete
-- =====================================================
-- RÔLE MÉTIER : Profils utilisateurs complets (authentification + données personnelles)
-- ENDPOINTS LIÉS :
--   • GET /api/v1/profile (profil utilisateur connecté)
--   • GET /api/v1/admin/users (liste utilisateurs admin)
--   • PUT /api/v1/profile (mise à jour profil)
-- JUSTIFICATION : Évite JOIN côté Node.js pour données utilisateur de base
CREATE
OR REPLACE VIEW v_user_profiles_complete AS
SELECT
    -- === IDENTIFICATION ===
    u.id AS user_id,
    u.username,
    u.email,
    ur.role_name,
    -- === DONNÉES PERSONNELLES ===
    up.first_name,
    up.last_name,
    CONCAT (up.first_name, ' ', up.last_name) AS full_name, -- Pré-calculé pour affichage
    up.phone,
    up.birth_date,
    up.avatar_url,
    -- === AUDIT ===
    u.created_at AS user_since,
    up.updated_at AS profile_updated_at
FROM
    users u
    LEFT JOIN user_roles ur ON u.role_id = ur.id
    LEFT JOIN user_profiles up ON u.id = up.user_id
ORDER BY
    u.created_at DESC;
