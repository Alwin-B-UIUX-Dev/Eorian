-- Active: 1753172327999@@127.0.0.1@5432@eorian_fr_db
-- =====================================================
-- EXTENSIONS ESSENTIELLES
-- =====================================================
CREATE EXTENSION IF NOT EXISTS citext;
COMMENT ON EXTENSION citext IS  'Insensibilité à la casse';
CREATE EXTENSION IF NOT EXISTS pg_trgm;
COMMENT ON EXTENSION pg_trgm IS 'Recherche de texte';
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
COMMENT ON EXTENSION "uuid-ossp" IS
'UUID si besoin pour les identifiants';

-- =====================================================
-- CRÉATION DES RÔLES DE SÉCURITÉ (RÔLES DATABASE)
-- =====================================================
-- CREATE ROLE api_service_eorian WITH LOGIN PASSWORD 'secure_password';
-- COMMENT ON ROLE api_service_eorian IS 'Rôle de service backend Node.js';
-- CREATE ROLE customer_eorian WITH NOLOGIN;
-- COMMENT ON ROLE customer_eorian IS 'Rôle de client';
-- CREATE ROLE admin_eorian WITH NOLOGIN;
-- COMMENT ON ROLE admin_eorian IS 'Rôle d''admin';

-- =====================================================
-- SETUP COMPLET GLOBAL eorian DES PRIVILEGES
-- =====================================================
-- Schema access
GRANT USAGE ON SCHEMA public TO api_service_eorian, admin_eorian, customer_eorian;

-- Tables/vues ACTUELLES
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO api_service_eorian;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO api_service_eorian;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO admin_eorian;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO admin_eorian;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO customer_eorian;

-- Tables/vues FUTURES
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO api_service_eorian;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO api_service_eorian;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO admin_eorian;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO admin_eorian;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO customer_eorian;
COMMENT ON ROLE api_service_eorian IS 'All privileges - Backend API service';
COMMENT ON ROLE admin_eorian IS 'CRUD privileges - Admin operations';
COMMENT ON ROLE customer_eorian IS 'Read-only - Customer frontend';

-- =====================================================
-- THÈME : AUTHENTIFICATION & PROFILS
-- =====================================================
-- JUSTIFICATION : Base sécurisée pour tous les utilisateurs
-- ENDPOINTS LIÉS :
-- - POST /api/v1/auth/login
-- - GET /api/v1/profile
-- - PUT /api/v1/profile
-- TABLES : users, user_profiles

-- TABLE : users

-- RÔLE MÉTIER : Authentification pure et gestion des rôles
-- RELATIONS :
-- └─ users 1:1 user_profiles (profil étendu)
-- └─ users 1:N products (admin créateur)
-- └─ users 1:N orders (customer acheteur)

-- -----------------------------------------------------
-- TABLE : user_roles
-- -----------------------------------------------------
-- RÔLE MÉTIER : Référentiel simple des rôles utilisateurs (customer, admin)
-- RELATIONS :
--   └─ user_roles 1:N users (un rôle peut être assigné à plusieurs utilisateurs)
-- PRINCIPE : KISS - Fonctionnalités de base uniquement, évolutif si besoin

CREATE TABLE IF NOT EXISTS user_roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(20) UNIQUE NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_role_name_format CHECK (
        role_name ~*'^[a-z][a-z0-9_]*[a-z0-9]$|^[a-z]$'
    ),
    CONSTRAINT check_role_name_length CHECK (
        char_length(role_name) BETWEEN 3 AND 20
    )
);

COMMENT ON TABLE user_roles IS
'Table de référence des rôles utilisateurs. Version KISS : fonctionnalités essentielles uniquement.';
COMMENT ON COLUMN user_roles.id IS
'PK auto-incrémentée pour référence';
COMMENT ON COLUMN user_roles.role_name IS
'Nom technique du rôle utilisé dans le code API (customer, admin, moderator...). Format : minuscules + underscores.';
COMMENT ON COLUMN user_roles.description IS
'Description lisible du rôle pour les interfaces utilisateur et la documentation.';
COMMENT ON COLUMN user_roles.created_at IS
'Date de création automatique. Utile pour audit et historique des rôles.';
COMMENT ON COLUMN user_roles.updated_at IS
'Date de dernière modification. Doit être mise à jour manuellement par l''API lors des modifications.';

-- =====================================================
-- INDEX OPTIMISÉ POUR PERFORMANCES API
-- =====================================================

-- JUSTIFICATION : Recherche fréquente par nom de rôle lors de l'authentification
-- USAGE : SELECT * FROM user_roles WHERE role_name = 'customer' (login process)
CREATE INDEX IF NOT EXISTS idx_user_roles_name
ON user_roles (role_name);

-- =====================================================
-- RLS : ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- JUSTIFICATION : Tous les utilisateurs connectés peuvent lire les rôles
-- USAGE : Interface utilisateur peut afficher les rôles disponibles
CREATE POLICY user_roles_read_all ON user_roles
FOR SELECT
USING (true);                                        -- Lecture libre pour tous les rôles connectés

-- JUSTIFICATION : Seuls les admins peuvent modifier les rôles
-- USAGE : Panel admin pour créer/modifier des rôles personnalisés
CREATE POLICY user_roles_admin_write ON user_roles
FOR ALL TO admin_eorian
USING (true);

-- JUSTIFICATION : API service a accès complet pour gestion backend
-- USAGE : Node.js API peut gérer les rôles sans restriction
CREATE POLICY user_roles_api_service ON user_roles
FOR ALL TO api_service_eorian
USING (true);

-- =====================================================
-- !ATTENTION : DISTINCTION IMPORTANTE
-- =====================================================
-- • customer_eorian = Rôle PostgreSQL (connexion DB)
-- • 'customer' = Rôle métier application (données)
-- Ces deux concepts sont DIFFÉRENTS et ne se mélangent pas

-- =====================================================
-- DONNÉES DE RÉFÉRENCE - RÔLES DE BASE DE L'APPLICATION
-- =====================================================

-- JUSTIFICATION : Rôles minimum pour démarrer l'application
-- customer : Utilisateurs standard qui achètent
-- admin : Gestionnaires avec accès complet
INSERT INTO user_roles (role_name, description) VALUES
('customer', 'Client standard - achat et consultation'),
('admin', 'Administrateur - gestion complète du système')
ON CONFLICT (role_name) DO NOTHING;                  -- Évite erreur si rôles déjà présents

-- =====================================================
-- COMMENTAIRES TECHNIQUES POUR LA MAINTENANCE
-- =====================================================

COMMENT ON TABLE user_roles IS
'Table de référence des rôles utilisateurs. Version KISS : fonctionnalités essentielles uniquement.';

COMMENT ON COLUMN user_roles.role_name IS
'Nom technique du rôle utilisé dans le code API (customer, admin, moderator...). Format : minuscules + underscores.';

COMMENT ON COLUMN user_roles.description IS
'Description lisible du rôle pour les interfaces utilisateur et la documentation.';

COMMENT ON COLUMN user_roles.created_at IS
'Date de création automatique. Utile pour audit et historique des rôles.';

COMMENT ON COLUMN user_roles.updated_at IS
'Date de dernière modification. Doit être mise à jour manuellement par l''API lors des modifications.';

-- =====================================================
-- NOTES POUR LES DÉVELOPPEURS
-- =====================================================

/*
ÉVOLUTION POSSIBLE :
- Ajouter is_active si on veut désactiver des rôles sans les supprimer
- Ajouter permissions granulaires si le système devient complexe
- Créer une table user_role_permissions pour des droits avancés

USAGE API TYPIQUE :
1. Login : SELECT role_name FROM user_roles ur JOIN users u ON u.role_id = ur.id WHERE u.email = ?
2. Interface admin : SELECT * FROM user_roles ORDER BY role_name
3. Création utilisateur : SELECT id FROM user_roles WHERE role_name = 'customer'

SÉCURITÉ :
- RLS activé : protection automatique selon les rôles
- Contraintes de format : évite les erreurs de saisie
- UNIQUE sur role_name : pas de doublons
*/

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username CITEXT UNIQUE NOT NULL,
    email CITEXT UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    is_connected BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    gdpr_consent BOOLEAN NOT NULL DEFAULT FALSE,
    gdpr_consent_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP,
    CONSTRAINT username_length CHECK (
        char_length(username) BETWEEN 3 AND 30
    ),
    CONSTRAINT email_length CHECK (char_length(email) <= 255),
    CONSTRAINT valid_email CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES user_roles(id)
);

-- =====================================================
-- INDEX OPTIMISÉS POUR AUTHENTIFICATION
-- =====================================================

-- JUSTIFICATION : Login rapide email/username sur comptes actifs uniquement
CREATE INDEX IF NOT EXISTS idx_users_email
ON users (email)
WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_users_username
ON users (username)
WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_users_role_id
ON users (role_id);

-- =====================================================
-- RLS : ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Customers : accès uniquement à leurs propres données
CREATE POLICY users_customer_access ON users
    FOR ALL TO customer_eorian
    USING (true);  -- Node.js fait WHERE id = $1

-- Admins : accès complet
CREATE POLICY admin_full_users ON users
    FOR ALL TO admin_eorian
    USING (true);

-- API Service : accès complet pour backend Node.js
CREATE POLICY api_service_full_access ON users
    FOR ALL TO api_service_eorian
    USING (true);

-- =====================================================
-- TABLE : user_sessions
-- =====================================================
-- RÔLE MÉTIER : Gestion refresh tokens multi-appareils pour sessions stateful (7 jours)
-- RELATIONS :
--   └─ users 1:N user_sessions (CASCADE DELETE) = un utilisateur peut avoir plusieurs sessions par device différent
--   └─ LOGIQUE MÉTIER : Limitation sessions gérée côté API Node.js (flexibilité maximale)

CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    refresh_token TEXT NOT NULL UNIQUE,
    -- === IDENTIFICATION DEVICE ===
    device_info JSONB,                                     -- Infos device complètes et flexibles
    ip_address INET,                                       -- IP pour sécurité/audit
    -- === GESTION SESSION ===
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    revoked_at TIMESTAMP,                                  -- Quand la session a été révoquée
    -- === AUDIT STANDARD ===
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- === RELATIONS ===
    CONSTRAINT fk_user_sessions_user_id FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE,
    -- === CONTRAINTES MÉTIER ===
    CONSTRAINT valid_expiration CHECK (expires_at > created_at),
    CONSTRAINT revoked_means_inactive CHECK (
        revoked_at IS NULL OR is_active = FALSE
    )
);

-- =====================================================
-- INDEX JUSTIFICATIONS
-- =====================================================

-- Recherche refresh token (authentification stateful) - Très fréquent
CREATE INDEX IF NOT EXISTS idx_user_sessions_token
ON user_sessions (refresh_token)
WHERE is_active = TRUE;  -- Index partiel pour performance

-- Sessions par utilisateur (dashboard "Mes sessions")
CREATE INDEX IF NOT EXISTS idx_user_sessions_user
ON user_sessions (user_id, created_at DESC)
WHERE is_active = TRUE;

-- INDEX JSONB - Recherche par type de device
CREATE INDEX IF NOT EXISTS idx_user_sessions_device_type
ON user_sessions USING BTREE ((device_info->>'type'))
WHERE is_active = TRUE;

-- INDEX JSONB - Recherche multi-critères device
CREATE INDEX IF NOT EXISTS idx_user_sessions_device_search
ON user_sessions USING GIN (device_info)
WHERE is_active = TRUE;

-- Audit sécurité : sessions par IP (détection anomalies)
CREATE INDEX IF NOT EXISTS idx_user_sessions_security
ON user_sessions (ip_address, created_at DESC);

-- INDEX pour logique API - Sessions actives par utilisateur + device
CREATE INDEX IF NOT EXISTS idx_user_sessions_device_management
ON user_sessions (user_id, device_info, is_active, created_at)
WHERE is_active = TRUE;

-- Nettoyage tokens expirés (tâche cron quotidienne)
CREATE INDEX IF NOT EXISTS idx_user_sessions_cleanup
ON user_sessions (expires_at)
WHERE is_active = TRUE;

-- =====================================================
-- COMMENTAIRES TECHNIQUES
-- =====================================================
COMMENT ON TABLE user_sessions IS 'Gestion sessions utilisateur - Logique multi-device gérée côté API Node.js';
COMMENT ON COLUMN user_sessions.revoked_at IS 'Timestamp de révocation manuelle (logout, sécurité)';
COMMENT ON COLUMN user_sessions.device_info IS 'Infos device en JSONB: type, name, user_agent, screen, custom_name, etc.';



-- RLS JUSTIFICATION : Tokens privés par utilisateur
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY sessions_customer_access ON user_sessions
    FOR ALL TO customer_eorian
    USING (true);  -- Node.js filtre avec WHERE user_id = $1

CREATE POLICY sessions_admin_all ON user_sessions
    FOR ALL TO admin_eorian
    USING (true);  -- Admin accès complet

CREATE POLICY sessions_api_service_full ON user_sessions
    FOR ALL TO api_service_eorian
    USING (true);

-- TABLE : user_profiles

-- RÔLE MÉTIER : Données personnelles étendues séparées de l'auth
-- RELATIONS :
-- └─ users 1:1 user_profiles (CASCADE DELETE) = si l'utilisateur est supprimé, son profil est supprimé

CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    birth_date DATE,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_profiles_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT valid_phone CHECK (phone IS NULL OR phone ~* '^\+?[0-9\s\-\.]{10,15}$')
);
-- RLS JUSTIFICATION : Profils privés par utilisateur
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY profiles_customer_access ON user_profiles
    FOR ALL TO customer_eorian
    USING (true);  -- Node.js fait WHERE user_id = $1

CREATE POLICY admin_full_profiles ON user_profiles
    FOR ALL TO admin_eorian
    USING (true);
CREATE POLICY api_service_full_profiles ON user_profiles
    FOR ALL TO api_service_eorian
    USING (true);

-- =====================================================
-- THÈME : USER MANAGEMENT
-- =====================================================
-- JUSTIFICATION : Données sensibles utilisateur (cartes bancaires)
-- ENDPOINTS LIÉS :
--   POST /api/payment-methods (ajouter carte)
--   GET /api/payment-methods (lister cartes user)
--   PUT /api/payment-methods/:id (modifier carte)
--   DELETE /api/payment-methods/:id (supprimer carte)

-- -----------------------------------------------------
-- TABLE : user_payment_methods
-- -----------------------------------------------------
-- RÔLE MÉTIER : Stockage sécurisé des moyens de paiement utilisateur
-- RELATIONS :
-- └─ users 1:N user_payment_methods (CASCADE DELETE) = un utilisateur peut avoir plusieurs cartes

CREATE TABLE IF NOT EXISTS user_payment_methods (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    card_token VARCHAR(255) NOT NULL,
    card_last4 VARCHAR(4) NOT NULL,
    card_brand VARCHAR(20) NOT NULL,
    card_type VARCHAR(10) DEFAULT 'card',
    cardholder_name VARCHAR(100),
    expires_month SMALLINT,
    expires_year SMALLINT,
    nickname VARCHAR(50),
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_payment_methods_user_id FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT valid_expiration_month CHECK (
        expires_month >= 1
        AND expires_month <= 12
    ),
    CONSTRAINT valid_expiration_year CHECK (
        expires_year >= EXTRACT(
            YEAR
            FROM CURRENT_DATE
        )
    ),
    CONSTRAINT valid_card_brand CHECK (
        card_brand IN (
            'visa',
            'mastercard',
            'amex',
            'discover',
            'unknown'
        )
    ),
    CONSTRAINT valid_card_type CHECK (
        card_type IN (
            'card',
            'paypal',
            'apple_pay',
            'google_pay'
        )
    ),
    CONSTRAINT valid_last4 CHECK (
        card_last4 ~ '^[0-9]{4}$'
    ),
    CONSTRAINT unique_default_payment_per_user
            EXCLUDE (user_id WITH =)
            WHERE (is_default = TRUE AND is_active = TRUE)
);

-- INDEX JUSTIFICATIONS :
-- - Recherche cartes par utilisateur (endpoint principal)
CREATE INDEX IF NOT EXISTS idx_payment_methods_user ON user_payment_methods (user_id, is_active);

-- - Recherche carte par défaut (checkout rapide)
CREATE INDEX IF NOT EXISTS idx_payment_methods_default ON user_payment_methods (user_id, is_default)
WHERE is_default = TRUE AND is_active = TRUE;

-- - Token unique (sécurité + intégrité Stripe)
CREATE UNIQUE INDEX idx_payment_methods_token ON user_payment_methods (card_token);

-- RLS DOUBLE SÉCURITÉ : Cartes ultra-sensibles
ALTER TABLE user_payment_methods ENABLE ROW LEVEL SECURITY;

-- Policy utilisateur : voit seulement ses cartes
CREATE POLICY payment_methods_customer_access ON user_payment_methods
    FOR ALL TO customer_eorian
    USING (true);  -- Node.js fait WHERE user_id = $1

-- Policy admin : accès complet pour support client
CREATE POLICY admin_full_payment_methods ON user_payment_methods
    FOR ALL TO admin_eorian
    USING (true);

-- Policy service API : accès technique complet
CREATE POLICY api_service_full_payment_methods ON user_payment_methods
    FOR ALL TO api_service_eorian
    USING (true);

-- =====================================================
-- THÈME : RÉFÉRENTIELS MÉTIER
-- =====================================================
-- JUSTIFICATION : Tables de référence pour la conformité fiscale et organisation
-- ENDPOINTS LIÉS :
-- - GET /api/v1/categories (navigation)
-- - GET /api/v1/tax-rates (calculs checkout)
-- - POST /api/v1/admin/tax-rates (gestion admin)
-- TABLES : tax_rates, categories

-- -----------------------------------------------------
-- TABLE : tax_rates
-- -----------------------------------------------------
-- RÔLE MÉTIER : Centraliser les taux TVA pour conformité fiscale française
-- RELATIONS :
-- └─ tax_rates 1:N products (calcul TVA par produit)

CREATE TABLE IF NOT EXISTS tax_rates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    rate DECIMAL(5,4) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_tax_rate CHECK (rate >= 0 AND rate <= 1),
    CONSTRAINT unique_active_rate EXCLUDE (rate WITH =) WHERE (is_active = true)
);

-- JUSTIFICATION INDEX : Recherche des taux actifs (endpoint checkout fréquent)
CREATE INDEX IF NOT EXISTS idx_tax_rates_active ON tax_rates (is_active)
WHERE is_active = true;

-- JUSTIFICATION INDEX : Recherche par nom (interface admin)
CREATE INDEX IF NOT EXISTS idx_tax_rates_name ON tax_rates (name)
WHERE is_active = true;

-- RLS JUSTIFICATION : Lecture publique, modification admin uniquement
ALTER TABLE tax_rates ENABLE ROW LEVEL SECURITY;

CREATE POLICY tax_rates_read_all ON tax_rates FOR
SELECT USING (is_active = true);

CREATE POLICY admin_manage_tax_rates ON tax_rates FOR ALL TO admin_eorian USING (true);

-- DONNÉES RÉFÉRENCE FRANCE 2025
INSERT INTO
    tax_rates (name, rate, description)
VALUES (
        'TVA Standard',
        0.2000,
        'Taux normal 20% - biens et services courants'
    ),
    (
        'TVA Réduite',
        0.1000,
        'Taux réduit 10% - restauration, transports'
    ),
    (
        'TVA Super Réduite',
        0.0550,
        'Taux super réduit 5,5% - alimentation, livres'
    ),
    (
        'Franchise TVA',
        0.0000,
        'Exonération de TVA - micro-entreprises'
    );

-- -----------------------------------------------------
-- TABLE : products (MISE À JOUR AVEC CITEXT + MÉTADONNÉES LIVRES)
-- -----------------------------------------------------
-- RÔLE MÉTIER : Catalogue produits avec recherche insensible à la casse
-- RELATIONS :
--   └─ tax_rates 1:N products (calcul TVA)
--   └─ users(admin) 1:N products (créateur)
--   └─ products N:M categories (via product_categories)
--   └─ products 1:N product_images (galerie)
--   └─ products 1:N cart_items (ajout panier)
--   └─ products 1:N order_items (commandes)

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name CITEXT NOT NULL,
    slug CITEXT UNIQUE NOT NULL,
    sku VARCHAR(100) UNIQUE,
    short_description TEXT,
    description TEXT,
    price_cents INTEGER NOT NULL,
    tax_rate_id INTEGER NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10,
    manage_stock BOOLEAN DEFAULT TRUE,
    meta_title CITEXT,
    meta_description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT products_price_positive CHECK (price_cents > 0),
    CONSTRAINT products_stock_positive CHECK (stock_quantity >= 0),
    CONSTRAINT products_valid_slug CHECK (
        slug ~ '^[a-z0-9]([a-z0-9\-]*[a-z0-9])?$'
        AND char_length(slug) BETWEEN 3 AND 200
    ),
    CONSTRAINT fk_products_tax_rate FOREIGN KEY (tax_rate_id)
        REFERENCES tax_rates (id),
    CONSTRAINT fk_products_created_by FOREIGN KEY (created_by)
        REFERENCES users (id)
);

-- =====================================================
-- RLS : ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- JUSTIFICATION : Lecture publique des produits actifs uniquement
CREATE POLICY products_read_active ON products FOR SELECT
    USING (is_active = true);

-- JUSTIFICATION : Admins gèrent tous les produits
CREATE POLICY admin_manage_products ON products FOR ALL TO admin_eorian
    USING (true);

-- JUSTIFICATION : Service API accès technique complet
CREATE POLICY api_service_full_products ON products FOR ALL TO api_service_eorian
    USING (true);


-- -----------------------------------------------------
-- TABLE : product_images
-- -----------------------------------------------------
-- RÔLE MÉTIER : Galerie d'images par produit avec image principale
-- RELATIONS :
--   └─ products 1:N product_images (galerie)
--   └─ users(admin) 1:N product_images (qui a uploadé)

CREATE TABLE IF NOT EXISTS product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(200),
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    uploaded_by INTEGER NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT product_images_sort_positive CHECK (sort_order >= 0),
    CONSTRAINT product_images_url_not_empty CHECK (char_length(trim(image_url)) > 0),
    CONSTRAINT fk_product_images_product FOREIGN KEY (product_id)
        REFERENCES products (id) ON DELETE CASCADE,
    CONSTRAINT fk_product_images_uploaded_by FOREIGN KEY (uploaded_by)
        REFERENCES users (id)
);

-- CONTRAINTE CRITIQUE : Une seule image primary par produit
CREATE UNIQUE INDEX idx_product_images_one_primary
    ON product_images (product_id)
    WHERE is_primary = true;

-- INDEX JUSTIFICATION : Galerie produit et performance
CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images (product_id);                    -- Galerie produit
CREATE INDEX IF NOT EXISTS idx_product_images_product_order ON product_images (product_id, sort_order); -- Ordre affichage
CREATE INDEX IF NOT EXISTS idx_product_images_uploaded_by ON product_images (uploaded_by);              -- Images par admin

-- RLS JUSTIFICATION : Images publiques, gestion admin
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY images_read_all ON product_images FOR SELECT
    USING (true);

CREATE POLICY admin_manage_images ON product_images FOR ALL TO admin_eorian
    USING (true);


-- =====================================================
-- THÈME : GESTION UTILISATEUR
-- =====================================================
-- JUSTIFICATION : Données clients pour livraisons et préférences
-- ENDPOINTS LIÉS :
-- - GET /api/v1/addresses
-- - POST /api/v1/addresses
-- - PUT /api/v1/addresses/:id/default
-- TABLES : addresses, cart_items

-- -----------------------------------------------------
-- TABLE : addresses
-- -----------------------------------------------------
-- RÔLE MÉTIER : Adresses de livraison et facturation clients
-- RELATIONS :
--   └─ users(customer) 1:N addresses (adresses multiples)
--   └─ addresses 1:N orders (adresse de livraison/facturation)

CREATE TABLE IF NOT EXISTS addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    type VARCHAR(20) DEFAULT 'shipping',
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    company VARCHAR(150),
    phone VARCHAR(20) NOT NULL,
    address_line_1 VARCHAR(200) NOT NULL,
    address_line_2 VARCHAR(200),
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    state_region VARCHAR(100),
    country CHAR(2) DEFAULT 'FR',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT addresses_valid_type CHECK (
        type IN ('shipping', 'billing', 'both')
    ),
    CONSTRAINT addresses_valid_postal_fr CHECK (
        country != 'FR' OR postal_code ~ '^[0-9]{5}$'
    ),
    CONSTRAINT addresses_valid_phone CHECK (
        phone ~ '^\+?[0-9\s\-\.]{10,15}$'
    ),
    CONSTRAINT addresses_valid_country CHECK (
        char_length(country) = 2
    ),
    CONSTRAINT addresses_names_not_empty CHECK (
        char_length(trim(first_name)) > 0 AND char_length(trim(last_name)) > 0
    ),
    CONSTRAINT fk_addresses_user FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE
);

-- CONTRAINTE CRITIQUE : Une seule adresse par défaut par utilisateur ET par type
CREATE UNIQUE INDEX idx_addresses_one_default_per_type
    ON addresses (user_id, type)
    WHERE is_default = true;

-- INDEX JUSTIFICATION : Performance endpoints utilisateur
CREATE INDEX IF NOT EXISTS idx_addresses_user ON addresses (user_id);                    -- Adresses utilisateur
CREATE INDEX IF NOT EXISTS idx_addresses_user_type ON addresses (user_id, type);         -- Filtrer par type
CREATE INDEX IF NOT EXISTS idx_addresses_country ON addresses (country);                 -- Stats par pays

-- RLS JUSTIFICATION : Adresses privées par utilisateur
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- Customers peuvent gérer leurs adresses
CREATE POLICY customers_manage_addresses ON addresses
    FOR ALL TO customer_eorian
    USING (true);  -- ← RLS simple

-- Admin voit toutes les adresses
CREATE POLICY admin_view_addresses ON addresses
    FOR SELECT TO admin_eorian
    USING (true);


-- -----------------------------------------------------
-- TABLE : cart_items
-- -----------------------------------------------------
-- RÔLE MÉTIER : Panier persistant pour chaque utilisateur connecté
-- RELATIONS :
--   └─ users(customer) 1:N cart_items (panier multi-produits)
--   └─ products 1:N cart_items (référence produit)

CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT cart_items_quantity_positive CHECK (quantity > 0),
    CONSTRAINT cart_items_quantity_reasonable CHECK (quantity <= 999),
    CONSTRAINT cart_items_unique_user_product UNIQUE(user_id, product_id),
    CONSTRAINT fk_cart_items_user FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_items_product FOREIGN KEY (product_id)
        REFERENCES products (id) ON DELETE CASCADE
);

-- INDEX JUSTIFICATION : Performance panier et gestion stock
CREATE INDEX IF NOT EXISTS idx_cart_items_user ON cart_items (user_id);                    -- Panier utilisateur
CREATE INDEX IF NOT EXISTS idx_cart_items_product ON cart_items (product_id);              -- Produits populaires + stock
CREATE INDEX IF NOT EXISTS idx_cart_items_updated ON cart_items (updated_at);              -- Nettoyage paniers anciens

-- RLS JUSTIFICATION : Panier privé par utilisateur
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Customers gèrent leurs paniers
CREATE POLICY customers_manage_cart ON cart_items
    FOR ALL TO customer_eorian
    USING (true);

-- Admin voit tous les paniers
CREATE POLICY admin_view_cart ON cart_items
    FOR SELECT TO admin_eorian
    USING (true);

-- -----------------------------------------------------
-- TABLE : orders
-- -----------------------------------------------------
-- RÔLE MÉTIER : Commandes clients avec calculs prix figés et statut suivi
-- RELATIONS :
--   └─ users(customer) 1:N orders (historique commandes)
--   └─ addresses N:1 orders (livraison/facturation)
--   └─ orders 1:N order_items (lignes commande)

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id INTEGER NOT NULL,
    shipping_address_id INTEGER,
    billing_address_id INTEGER,
    status VARCHAR(20) DEFAULT 'pending',
    subtotal_cents INTEGER NOT NULL,
    tax_amount_cents INTEGER NOT NULL,
    shipping_cents INTEGER DEFAULT 0,
    total_cents INTEGER NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_reference VARCHAR(200),
    shipping_method VARCHAR(100),
    tracking_number VARCHAR(100),
    customer_notes TEXT,
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    shipped_at TIMESTAMP,
    delivered_at TIMESTAMP,
    CONSTRAINT orders_status_valid CHECK (
        status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')
    ),
    CONSTRAINT orders_payment_status_valid CHECK (
        payment_status IN ('pending', 'paid', 'failed', 'refunded')
    ),
    CONSTRAINT orders_subtotal_positive CHECK (subtotal_cents >= 0),
    CONSTRAINT orders_tax_positive CHECK (tax_amount_cents >= 0),
    CONSTRAINT orders_shipping_positive CHECK (shipping_cents >= 0),
    CONSTRAINT orders_total_positive CHECK (total_cents > 0),
    CONSTRAINT orders_total_calculation CHECK (
        total_cents = subtotal_cents + tax_amount_cents + shipping_cents
    ),
    CONSTRAINT orders_order_number_format CHECK (
        order_number ~* '^[A-Z]{3}-[0-9]{8}-[0-9]{3}$'
    ),
    CONSTRAINT orders_shipped_requires_date CHECK (
        status != 'shipped' OR shipped_at IS NOT NULL
    ),
    CONSTRAINT orders_delivered_requires_dates CHECK (
        status != 'delivered' OR (shipped_at IS NOT NULL AND delivered_at IS NOT NULL)
    ),
    CONSTRAINT orders_tracking_when_shipped CHECK (
        status NOT IN ('shipped', 'delivered') OR tracking_number IS NOT NULL
    ),
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE RESTRICT,
    CONSTRAINT fk_orders_shipping_address FOREIGN KEY (shipping_address_id)
        REFERENCES addresses (id) ON DELETE SET NULL,
    CONSTRAINT fk_orders_billing_address FOREIGN KEY (billing_address_id)
        REFERENCES addresses (id) ON DELETE SET NULL
);

-- INDEX JUSTIFICATION : Performance recherche commandes multi-critères
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders (user_id);                           -- Historique client
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);                          -- Dashboard admin
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders (payment_status);          -- Suivi paiements
CREATE INDEX IF NOT EXISTS idx_orders_date ON orders (created_at);                        -- Tri chronologique
CREATE INDEX IF NOT EXISTS idx_orders_user_date ON orders (user_id, created_at DESC);     -- Historique client optimisé
CREATE INDEX IF NOT EXISTS idx_orders_status_date ON orders (status, created_at);         -- Admin filtres combinés

-- CONSTRAINT UNIQUE après les index pour cohérence
CREATE UNIQUE INDEX idx_orders_number_unique ON orders (order_number);      -- Numérotation unique

-- RLS JUSTIFICATION : Commandes privées par client
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Customers peuvent consulter leurs commandes
CREATE POLICY customers_view_orders ON orders
    FOR SELECT TO customer_eorian
    USING (true);

-- Admin gère toutes les commandes
CREATE POLICY admin_manage_orders ON orders
    FOR ALL TO admin_eorian
    USING (true);

-- -----------------------------------------------------
-- TABLE : order_items
-- -----------------------------------------------------
-- RÔLE MÉTIER : Lignes de commande avec snapshot produit immutable
-- RELATIONS :
--   └─ orders 1:N order_items (détail commande)
--   └─ products N:1 order_items (référence produit - peut changer)

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER,
    product_name VARCHAR(200) NOT NULL,
    product_sku VARCHAR(100),
    unit_price_cents INTEGER NOT NULL,
    tax_rate DECIMAL(5,4) NOT NULL DEFAULT 0.2000,
    quantity INTEGER NOT NULL,
    line_subtotal_cents INTEGER NOT NULL,
    line_tax_cents INTEGER NOT NULL,
    line_total_cents INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT order_items_unit_price_positive CHECK (unit_price_cents > 0),
    CONSTRAINT order_items_quantity_positive CHECK (quantity > 0),
    CONSTRAINT order_items_quantity_reasonable CHECK (quantity <= 999),
    CONSTRAINT order_items_tax_rate_valid CHECK (tax_rate >= 0 AND tax_rate <= 1),
    CONSTRAINT order_items_subtotal_positive CHECK (line_subtotal_cents >= 0),
    CONSTRAINT order_items_tax_positive CHECK (line_tax_cents >= 0),
    CONSTRAINT order_items_total_positive CHECK (line_total_cents > 0),
    CONSTRAINT order_items_line_calculations CHECK (
        line_subtotal_cents = unit_price_cents * quantity AND
        line_tax_cents = ROUND(line_subtotal_cents * tax_rate) AND
        line_total_cents = line_subtotal_cents + line_tax_cents
    ),
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id)
        REFERENCES orders (id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id)
        REFERENCES products (id) ON DELETE SET NULL
);

-- INDEX JUSTIFICATION : Performance requêtes détail commandes
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items (order_id);              -- Détail commande
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items (product_id)           -- Analyse ventes par produit
    WHERE product_id IS NOT NULL;                                          -- Index partiel
CREATE INDEX IF NOT EXISTS idx_order_items_sku ON order_items (product_sku)              -- Recherche par SKU historique
    WHERE product_sku IS NOT NULL;                                         -- Index partiel

-- RLS JUSTIFICATION : Accès via la commande parente
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Customers peuvent consulter leurs items de commande
CREATE POLICY customers_view_order_items ON order_items
    FOR SELECT TO customer_eorian
    USING (true);

-- Admin gère tous les items
CREATE POLICY admin_manage_order_items ON order_items
    FOR ALL TO admin_eorian
    USING (true);
