-- Active: 1753172327999@@127.0.0.1@5432@eorian_fr_db
-- =====================================================
-- VUE : Endpoint POST /api/v1/auth/refresh-token
-- =====================================================
-- USAGE : Valider refresh token et récupérer infos user
CREATE
OR REPLACE VIEW v_user_session AS
SELECT
    -- === USER DATA ===
    u.id,
    u.username,
    u.email,
    u.is_active,
    u.email_verified,
    u.is_connected,
    ur.role_name,
    u.last_login_at,
    -- === SESSION DATA ===
    us.refresh_token,
    us.device_info,
    us.expires_at,
    us.is_active as session_active,
    us.created_at as session_created_at
FROM
    users u
    INNER JOIN user_sessions us ON u.id = us.user_id
    LEFT JOIN user_roles ur ON u.role_id = ur.id
WHERE
    u.is_active = TRUE
    AND u.email_verified = TRUE
    AND u.gdpr_consent = TRUE
    AND us.is_active = TRUE
    AND us.expires_at > NOW ();
