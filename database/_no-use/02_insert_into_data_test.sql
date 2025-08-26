-- Active: 1753172327999@@127.0.0.1@5432@eorian_fr_db
-- =====================================================
-- JEU DE DONNÉES TEST E-COMMERCE CULINAIRE - BASÉ SUR DONNÉES JSON (products.json)
-- =====================================================
-- =====================================================
-- JEU DE DONNÉES : TABLE USERS
-- =====================================================
INSERT INTO
    users (
        username,
        email,
        password_hash,
        role_id,
        is_active,
        is_connected,
        email_verified,
        gdpr_consent,
        gdpr_consent_date,
        created_at,
        updated_at,
        last_login_at
    )
VALUES
    -- ADMIN SYSTÈME
    (
        'admin_system',
        'admin@cuisinedumonde.fr',
        '$2b$12$KvK8QNWnO5kR7iV.encrypted_admin_password_hash',
        2, -- role_id = 2 (admin)
        true,
        false,
        true,
        true,
        '2024-12-20 10:00:00',
        '2024-12-20 10:00:00',
        '2024-12-22 09:15:00',
        '2024-12-22 08:30:00'
    ),
    -- CLIENTS ACTIFS
    (
        'jean_dupont',
        'jean.dupont@email.fr',
        '$2b$12$LwL9QOXoP6lS8jW.encrypted_customer_password_hash',
        1, -- role_id = 1 (customer)
        true,
        false,
        true,
        true,
        '2024-12-15 14:30:00',
        '2024-12-15 14:30:00',
        '2024-12-22 09:15:00',
        '2024-12-22 19:45:00'
    ),
    (
        'marie_martin',
        'marie.martin@email.fr',
        '$2b$12$MxM0QPYpQ7mT9kX.encrypted_customer_password_hash',
        1, -- role_id = 1 (customer)
        true,
        true, -- Connectée actuellement
        true,
        true,
        '2024-12-10 09:15:00',
        '2024-12-10 09:15:00',
        '2024-12-22 11:35:00',
        '2024-12-22 16:20:00'
    ),
    (
        'pierre_durand',
        'pierre.durand@email.fr',
        '$2b$12$NyN1QRZqR8nU0lY.encrypted_customer_password_hash',
        1, -- role_id = 1 (customer)
        true,
        false,
        true,
        true,
        '2024-12-18 16:45:00',
        '2024-12-18 16:45:00',
        '2024-12-22 09:15:00',
        '2024-12-21 20:10:00'
    ),
    (
        'sophie_bernard',
        'sophie.bernard@email.fr',
        '$2b$12$OzO2RSarS9oV1mZ.encrypted_customer_password_hash',
        1, -- role_id = 1 (customer)
        true,
        false,
        false, -- Email pas encore vérifié
        true,
        '2024-12-22 11:00:00',
        '2024-12-22 11:00:00',
        '2024-12-22 11:00:00',
        NULL -- Jamais connecté depuis création
    );


-- =====================================================
-- JEU DE DONNÉES : TABLE USER_SESSIONS
-- =====================================================
INSERT INTO
    user_sessions (
        user_id,
        refresh_token,
        device_info,
        expires_at,
        is_active,
        created_at,
        updated_at
    )
VALUES
    -- ADMIN SYSTÈME - Session web active (connecté ce matin)
    (
        1, -- admin_system
        'rt_admin_web_2025072808300000_a1b2c3d4e5f6g7h8i9j0k1l2',
        'web',
        '2025-09-04 08:30:00', -- Expire dans 7 jours
        true,
        '2025-07-28 08:30:00',
        '2025-07-28 08:30:00'
    ),
    -- MARIE MARTIN - Session web active (connectée cet après-midi)
    (
        3, -- marie_martin
        'rt_marie_web_2025072816200000_m3n4o5p6q7r8s9t0u1v2w3x4',
        'web',
        '2025-09-04 16:20:00', -- Expire dans 7 jours
        true,
        '2025-07-28 16:20:00',
        '2025-07-28 16:20:00'
    ),
    -- MARIE MARTIN - Session mobile active (connectée hier)
    (
        3, -- marie_martin
        'rt_marie_mobile_2025072712000000_y5z6a7b8c9d0e1f2g3h4',
        'mobile',
        '2025-09-03 12:00:00', -- Expire dans 6 jours
        true,
        '2025-07-27 12:00:00',
        '2025-07-27 12:00:00'
    ),
    -- JEAN DUPONT - Session web récente mais révoquée
    (
        2, -- jean_dupont
        'rt_jean_web_2025072619450000_i5j6k7l8m9n0o1p2q3r4s5t6',
        'web',
        '2025-09-02 19:45:00', -- Expire dans 5 jours
        false, -- Révoqué à la déconnexion
        '2025-07-26 19:45:00',
        '2025-07-26 19:45:00'
    ),
    -- PIERRE DURAND - Session desktop active (connecté avant-hier)
    (
        4, -- pierre_durand
        'rt_pierre_desktop_2025072620100000_u7v8w9x0y1z2a3b4c5',
        'desktop',
        '2025-09-02 20:10:00', -- Expire dans 5 jours
        true,
        '2025-07-26 20:10:00',
        '2025-07-26 20:10:00'
    );

-- =====================================================
-- JEU DE DONNÉES : TABLE USER_PROFILES
-- =====================================================
INSERT INTO
    user_profiles (
        user_id,
        first_name,
        last_name,
        phone,
        birth_date,
        avatar_url,
        created_at,
        updated_at
    )
VALUES
    -- PROFIL ADMIN SYSTÈME - Données minimales pro
    (
        1, -- admin_system
        'Jean',
        'Administrateur',
        '+33142868392', -- Format international sans espaces
        '1985-03-15', -- 40 ans
        'https://avatar.example.com/admin_jean.jpg',
        '2025-07-28 08:00:00',
        '2025-07-28 08:00:00'
    ),
    -- PROFIL JEAN DUPONT - Client standard avec newsletter
    (
        2, -- jean_dupont
        'Jean',
        'Dupont',
        '0612345678', -- Mobile français sans espaces
        '1990-07-22', -- 35 ans
        NULL, -- Pas d'avatar
        '2025-07-28 09:15:00',
        '2025-07-28 09:15:00'
    ),
    -- PROFIL MARIE MARTIN - Cliente active avec profil complet
    (
        3, -- marie_martin
        'Marie',
        'Martin',
        '0798765432', -- Mobile français sans espaces
        '1988-11-03', -- 36 ans
        'https://avatar.example.com/marie_m.jpg',
        '2025-07-28 11:30:00',
        '2025-07-28 16:20:00' -- Profil mis à jour cet après-midi
    ),
    -- PROFIL PIERRE DURAND - Client sans newsletter mais téléphone pro
    (
        4, -- pierre_durand
        'Pierre',
        'Durand',
        '+33467891234', -- Fixe professionnel sans espaces
        '1975-02-28', -- 50 ans
        NULL, -- Pas d'avatar
        '2025-07-28 14:45:00',
        '2025-07-28 14:45:00'
    ),
    -- PROFIL SOPHIE BERNARD - Profil minimal (jeune utilisatrice)
    (
        5, -- sophie_bernard
        'Sophie',
        'Bernard',
        NULL, -- Pas de téléphone fourni
        '1995-12-10', -- 29 ans
        'https://avatar.example.com/sophie_b.png',
        '2025-07-28 18:20:00',
        '2025-07-28 18:20:00'
    );

-- =====================================================
-- JEU DE DONNÉES : TABLE USER_PAYMENT_METHODS
-- =====================================================
INSERT INTO
    user_payment_methods (
        user_id,
        card_token,
        card_last4,
        card_brand,
        card_type,
        cardholder_name,
        expires_month,
        expires_year,
        nickname,
        is_default,
        is_active,
        created_at,
        updated_at
    )
VALUES
    -- MARIE MARTIN - Carte principale (par défaut)
    (
        3, -- marie_martin
        'tok_stripe_1N2M3O4P5Q6R7S8T9U0V1W2X', -- Token Stripe chiffré
        '4242', -- 4 derniers chiffres Visa test
        'visa',
        'card',
        'MARIE MARTIN',
        12, -- Décembre
        2027, -- Expire en 2027 (valide)
        'Ma carte principale',
        true, -- Carte par défaut
        true,
        '2025-07-28 11:35:00',
        '2025-07-28 11:35:00'
    ),
    -- MARIE MARTIN - Carte secondaire (travail)
    (
        3, -- marie_martin
        'tok_stripe_2A3B4C5D6E7F8G9H0I1J2K3L', -- Token différent
        '1234', -- 4 derniers chiffres différents
        'mastercard',
        'card',
        'M MARTIN',
        6, -- Juin
        2026, -- Expire en 2026
        'Carte travail',
        false, -- Pas par défaut
        true,
        '2025-07-28 12:10:00',
        '2025-07-28 12:10:00'
    ),
    -- JEAN DUPONT - Carte unique
    (
        2, -- jean_dupont
        'tok_stripe_3X4Y5Z6A7B8C9D0E1F2G3H4I', -- Token unique
        '5678', -- 4 derniers chiffres
        'visa',
        'card',
        'JEAN DUPONT',
        3, -- Mars
        2028, -- Expire en 2028
        'Ma carte Visa',
        true, -- Sa seule carte = par défaut
        true,
        '2025-07-28 09:20:00',
        '2025-07-28 09:20:00'
    ),
    -- PIERRE DURAND - PayPal (pas de carte physique)
    (
        4, -- pierre_durand
        'tok_paypal_4J5K6L7M8N9O0P1Q2R3S4T5U', -- Token PayPal
        '0000', -- PayPal n'a pas de "derniers 4"
        'unknown', -- Pas de marque carte pour PayPal
        'paypal',
        'Pierre Durand',
        NULL, -- PayPal n'expire pas comme une carte
        NULL,
        'Mon PayPal',
        true, -- Son seul moyen = par défaut
        true,
        '2025-07-28 14:50:00',
        '2025-07-28 14:50:00'
    ),
    -- PIERRE DURAND - Ancienne carte expirée/désactivée
    (
        4, -- pierre_durand
        'tok_stripe_5V6W7X8Y9Z0A1B2C3D4E5F6G', -- Ancien token
        '9876',
        'amex',
        'card',
        'P DURAND',
        1, -- Janvier
        2025, -- Expirée cette année
        'Ancienne Amex',
        false, -- Plus par défaut
        false, -- Désactivée
        '2024-12-18 16:50:00', -- Créée en décembre dernier
        '2025-07-28 14:52:00' -- Désactivée aujourd'hui
    );

-- =====================================================
-- JEU DE DONNÉES : TABLE PRODUCTS
-- Basé sur products.json
-- =====================================================
INSERT INTO
    products (
        name,
        slug,
        sku,
        short_description,
        description,
        price_cents,
        tax_rate_id,
        stock_quantity,
        low_stock_threshold,
        manage_stock,
        meta_title,
        meta_description,
        is_active,
        created_by,
        created_at,
        updated_at
    )
VALUES
    ('Affiche A3 – Montagnes au lever du soleil',
     'affiche-a3-montagnes-lever-soleil',
     'ILL-A3-001',
     'Affiche artistique A3, papier satiné 200 g.',
     'Illustration originale de montagnes baignée de lumière dorée. Impression haute qualité A3 (29,7×42 cm).',
     1990, 1, 45, 5, TRUE,
     'Affiche A3 Montagnes', 'Affiche A3 paysages de montagnes au lever du soleil.', TRUE, 1, NOW(), NOW()
    ),
    ('Affiche A2 – Forêt brumeuse',
     'affiche-a2-foret-brumeuse',
     'ILL-A2-002',
     'Affiche A2 ambiance brume.',
     'Forêt minimaliste dans la brume, couleurs froides. Format A2 (42×59,4 cm), papier 200 g.',
     2990, 1, 30, 5, TRUE,
     'Affiche A2 Forêt', 'Affiche A2 forêt brumeuse style minimal.', TRUE, 1, NOW(), NOW()
    ),
    ('Poster XXL 70×100 – Carte de Paris',
     'poster-xxl-carte-de-paris',
     'ILL-XXL-003',
     'Poster XXL carte stylisée de Paris.',
     'Carte illustrée de Paris, lignes fines et repères iconiques. Format 70×100 cm.',
     3990, 1, 20, 3, TRUE,
     'Poster XXL Paris', 'Poster 70×100 carte de Paris stylisée.', TRUE, 1, NOW(), NOW()
    ),
    ('Série A3 – Animaux géométriques (Renard)',
     'serie-a3-animaux-geometriques-renard',
     'ILL-A3-004',
     'Affiche A3 renard géométrique.',
     'Illustration polygonale d’un renard, palette orange. A3, papier premium 220 g.',
     2190, 1, 60, 10, TRUE,
     'Affiche Renard géométrique', 'Affiche A3 renard style géométrique.', TRUE, 2, NOW(), NOW()
    ),
    ('Série A3 – Animaux géométriques (Loup)',
     'serie-a3-animaux-geometriques-loup',
     'ILL-A3-005',
     'Affiche A3 loup géométrique.',
     'Illustration polygonale d’un loup, tons bleus. A3, papier premium 220 g.',
     2190, 1, 55, 10, TRUE,
     'Affiche Loup géométrique', 'Affiche A3 loup style géométrique.', TRUE, 2, NOW(), NOW()
    ),
    ('Affiche A3 – Plantes tropicales',
     'affiche-a3-plantes-tropicales',
     'ILL-A3-006',
     'Affiche A3 botanique.',
     'Composition botanique de feuilles tropicales, verts profonds. A3 sur papier texturé 240 g.',
     2090, 1, 70, 8, TRUE,
     'Affiche Plantes tropicales', 'Affiche A3 botanique tropicale.', TRUE, 1, NOW(), NOW()
    ),
    ('Affiche A2 – Lignes abstraites or',
     'affiche-a2-lignes-abstraites-or',
     'ILL-A2-007',
     'Affiche A2 abstraite dorée.',
     'Formes abstraites et lignes dorées (impression effet or). A2 papier 200 g.',
     3290, 1, 25, 5, TRUE,
     'Affiche Lignes abstraites', 'Affiche A2 abstraite lignes or.', TRUE, 3, NOW(), NOW()
    ),
    ('Affiche 50×70 – Vagues japonaises',
     'affiche-50x70-vagues-japonaises',
     'ILL-5070-008',
     'Affiche 50×70 inspirée ukiyo-e.',
     'Motif de vagues stylisées, bleu indigo, format 50×70 cm.',
     2790, 1, 40, 6, TRUE,
     'Affiche Vagues japonaises', 'Affiche 50×70 motif vagues style japonais.', TRUE, 1, NOW(), NOW()
    ),
    ('Affiche A3 – Skyline nocturne',
     'affiche-a3-skyline-nocturne',
     'ILL-A3-009',
     'Affiche A3 ville de nuit.',
     'Silhouette de skyline avec néons, A3, papier satiné 200 g.',
     1990, 1, 65, 10, TRUE,
     'Affiche Skyline nocturne', 'Affiche A3 skyline urbaine de nuit.', TRUE, 2, NOW(), NOW()
    ),
    ('Affiche A3 – Constellations hémisphère nord',
     'affiche-a3-constellations-hemisphere-nord',
     'ILL-A3-010',
     'Affiche A3 cartes stellaires.',
     'Carte des constellations de l’hémisphère nord, A3, fond bleu nuit.',
     2190, 1, 50, 8, TRUE,
     'Affiche Constellations', 'Affiche A3 constellations ciel étoilé.', TRUE, 1, NOW(), NOW()
    ),
    ('Affiche 30×40 – Fleur de pavot',
     'affiche-30x40-fleur-de-pavot',
     'ILL-3040-011',
     'Affiche 30×40 florale.',
     'Illustration florale minimaliste, pavot rouge, format 30×40 cm.',
     1690, 1, 80, 12, TRUE,
     'Affiche Pavot', 'Affiche 30×40 fleur de pavot minimaliste.', TRUE, 3, NOW(), NOW()
    ),
    ('Affiche A2 – Architecture brutaliste',
     'affiche-a2-architecture-brutaliste',
     'ILL-A2-012',
     'Affiche A2 archi brutaliste.',
     'Volumes béton, contrastes forts, tirage A2 sur papier 200 g.',
     3190, 1, 22, 4, TRUE,
     'Affiche Brutaliste', 'Affiche A2 architecture brutaliste minimaliste.', TRUE, 2, NOW(), NOW()
    );


-- =====================================================
-- JEU DE DONNÉES : TABLE PRODUCT_IMAGES
-- Basé sur le products.json réel
-- =====================================================
INSERT INTO
    product_images (
        product_id,
        image_url,
        alt_text,
        is_primary,
        sort_order,
        uploaded_by,
        uploaded_at,
        created_at,
        updated_at
    )
VALUES
  (1,  'https://source.unsplash.com/_HRcPmzjDPc/1600x1200', 'Illustration florale colorée (motif végétal)', TRUE, 1, 1,  '2025-08-26 10:00:00', '2025-08-26 10:00:00', '2025-08-26 10:00:00'),
  (2,  'https://source.unsplash.com/RmkQiUzufc0/1600x1200', 'Illustration d’un phare en bord de mer',       TRUE, 1, 1,    '2025-08-26 10:02:00', '2025-08-26 10:02:00', '2025-08-26 10:02:00'),
  (3,  'https://source.unsplash.com/E_R80zTvTjI/1600x1200', 'Renard stylisé se reposant dans un paysage',     TRUE, 1, 1, '2025-08-26 10:04:00', '2025-08-26 10:04:00', '2025-08-26 10:04:00'),
  (4,  'https://source.unsplash.com/j-oNlEbFrpU/1600x1200', 'Paysage de montagne au coucher de soleil (flat)',TRUE, 1, 1,  '2025-08-26 10:06:00', '2025-08-26 10:06:00', '2025-08-26 10:06:00'),
  (5,  'https://source.unsplash.com/Or7LlCdYbGE/1600x1200', 'Espace: planètes et étoiles (fond violet)',       TRUE, 1, 1,   '2025-08-26 10:08:00', '2025-08-26 10:08:00', '2025-08-26 10:08:00'),
  (6,  'https://source.unsplash.com/YkF8gHkBokc/1600x1200', 'Système solaire stylisé (planètes en orbite)',   TRUE, 1, 1,  '2025-08-26 10:10:00', '2025-08-26 10:10:00', '2025-08-26 10:10:00'),
  (7,  'https://source.unsplash.com/xtuUAdAFvDU/1600x1200', 'Illustration florale aux couleurs vives',         TRUE, 1, 1,    '2025-08-26 10:12:00', '2025-08-26 10:12:00', '2025-08-26 10:12:00'),
  (8,  'https://source.unsplash.com/Z4mCfthBpfE/1600x1200', 'Motif floral stylisé (design ornemental)',        TRUE, 1, 1, '2025-08-26 10:14:00', '2025-08-26 10:14:00', '2025-08-26 10:14:00'),
  (9,  'https://source.unsplash.com/j2baPOGjRg4/1600x1200', 'Motif floral répétitif (pattern seamless)',       TRUE, 1, 1,  '2025-08-26 10:16:00', '2025-08-26 10:16:00', '2025-08-26 10:16:00'),
  (10, 'https://source.unsplash.com/_-yJ1OV9GYc/1600x1200', 'Abstrait géométrique (inspiration Bauhaus)',      TRUE, 1, 1,   '2025-08-26 10:18:00', '2025-08-26 10:18:00', '2025-08-26 10:18:00');


-- =====================================================
-- JEU DE DONNÉES : TABLE ADDRESSES
--
-- =====================================================
INSERT INTO
    addresses (
        user_id,
        type,
        first_name,
        last_name,
        company,
        phone,
        address_line_1,
        address_line_2,
        city,
        postal_code,
        state_region,
        country,
        is_default,
        created_at,
        updated_at
    )
VALUES
    (
        1,
        'shipping',
        'Marie',
        'Dubois',
        NULL,
        '+33123456789',
        '15 Rue de la Paix',
        NULL,
        'Paris',
        '75002',
        'Île-de-France',
        'FR',
        TRUE,
        '2024-12-15 10:00:00',
        '2024-12-15 10:00:00'
    ),
    (
        1,
        'billing',
        'Marie',
        'Dubois',
        'Les Éditions du Terroir',
        '+33198765432',
        '25 Avenue des Champs-Élysées',
        'Bureau 10',
        'Paris',
        '75008',
        'Île-de-France',
        'FR',
        FALSE,
        '2024-12-15 10:00:00',
        '2024-12-15 10:00:00'
    ),
    (
        2,
        'both',
        'Jean',
        'Martin',
        NULL,
        '+33412345678',
        '45 Boulevard de la République',
        'Apt 202',
        'Lyon',
        '69001',
        'Auvergne-Rhône-Alpes',
        'FR',
        FALSE,
        '2024-12-15 10:00:00',
        '2024-12-15 10:00:00'
    ),
    (
        3,
        'shipping',
        'Laura',
        'Bernard',
        NULL,
        '+33523456789',
        '78 Rue de la Liberté',
        'Résidence Fleurie',
        'Marseille',
        '13001',
        'Provence-Alpes-Côte d''Azur',
        'FR',
        TRUE,
        '2024-12-15 10:00:00',
        '2024-12-15 10:00:00'
    ),
    (
        3,
        'billing',
        'Laura',
        'Bernard',
        'Société Innovative',
        '+33634567890',
        '12 Rue des Lilas',
        NULL,
        'Marseille',
        '13002',
        'Provence-Alpes-Côte d''Azur',
        'FR',
        FALSE,
        '2024-12-15 10:00:00',
        '2024-12-15 10:00:00'
    );

-- =====================================================
-- JEU DE DONNÉES : TABLE ORDERS
-- Basé sur le products.json réel
-- =====================================================
INSERT INTO
    cart_items (user_id, product_id, quantity)
VALUES
    (1, 1, 2), -- Utilisateur 1, Produit 1, Quantité 2
    (1, 3, 1), -- Utilisateur 1, Produit 3, Quantité 1
    (2, 2, 3), -- Utilisateur 2, Produit 2, Quantité 3
    (3, 5, 1), -- Utilisateur 3, Produit 5, Quantité 1
    (1, 4, 5);

-- Utilisateur 1, Produit 4, Quantité 5
-- =====================================================
-- JEU DE DONNÉES : TABLE ORDERS
--
-- =====================================================
INSERT INTO
    orders (
        order_number,
        user_id,
        shipping_address_id,
        billing_address_id,
        status,
        subtotal_cents,
        tax_amount_cents,
        shipping_cents,
        total_cents,
        payment_status,
        payment_method,
        payment_reference,
        shipping_method,
        tracking_number,
        customer_notes,
        admin_notes,
        shipped_at,
        delivered_at
    )
VALUES
    (
        'ORD-20250127-001',
        1,
        1,
        1,
        'pending',
        5980,
        500,
        1000,
        7480,
        'pending',
        'stripe',
        'pi_12345',
        'Standard',
        NULL,
        'Livraison express',
        'Préparer pour expédition.',
        NULL,
        NULL
    ),
    (
        'ORD-20250127-002',
        2,
        2,
        2,
        'processing',
        10485,
        0,
        0,
        10485,
        'paid',
        'paypal',
        'pi_67890',
        'Expedited',
        'TRACK123',
        'Ajouter une note',
        'Commander des étiquettes.',
        NULL,
        NULL
    ),
    (
        'ORD-20250127-003',
        3,
        3,
        3,
        'shipped',
        4250,
        600,
        2000,
        6850,
        'paid',
        'stripe',
        'pi_11223',
        'Standard',
        'TRACK456',
        'Vérifier le statut',
        'Préparer le colis.',
        NOW (),
        NULL
    ),
    (
        'ORD-20250127-004',
        1,
        1,
        1,
        'delivered',
        15600,
        1200,
        3000,
        19800,
        'refunded',
        'paypal',
        'pi_44556',
        'Express',
        'TRACK789',
        'Satisfaction garantie',
        'Processus de retour.',
        NOW (),
        NOW ()
    ),
    (
        'ORD-20250127-005',
        2,
        2,
        2,
        'cancelled',
        6990,
        400,
        1000,
        8390,
        'failed',
        'stripe',
        'pi_78901',
        'Standard',
        NULL,
        'Annulation de commande.',
        'Remboursement à traiter.',
        NULL,
        NULL
    );

INSERT INTO order_items (
    order_id,
    product_id,
    product_name,
    product_sku,
    unit_price_cents,
    tax_rate,
    quantity,
    line_subtotal_cents,
    line_tax_cents,
    line_total_cents
) VALUES
    -- Pour la commande 1
    (
        1,  -- order_id
        1,  -- product_id
        'Les Secrets de la Cuisine Française',
        'COOK-FR-001',
        2990,      -- prix unitaire
        0.20,      -- taux de TVA (20%)
        2,         -- quantité
        5980,      -- sous-total (2990 * 2)
        1196,      -- TVA (5980 * 0.20)
        7176       -- total (5980 + 1196)
    ),
    -- Pour la commande 2
    (
        2,  -- order_id
        2,  -- product_id
        'Cuisine Italienne Moderne',
        'COOK-IT-002',
        3495,      -- prix unitaire
        0.20,      -- taux de TVA (20%)
        1,         -- quantité
        3495,      -- sous-total
        699,       -- TVA (3495 * 0.20)
        4194       -- total (3495 + 699)
    ),
    -- Pour la commande 3
    (
        3,  -- order_id
        3,  -- product_id
        'Pâtisserie Artisanale',
        'COOK-PA-003',
        4250,      -- prix unitaire
        0.20,      -- taux de TVA (20%)
        1,         -- quantité
        4250,      -- sous-total
        850,       -- TVA (4250 * 0.20)
        5100       -- total (4250 + 850)
    ),
    -- Pour la commande 4
    (
        4,  -- order_id
        4,  -- product_id
        'Cuisine Asiatique Fusion',
        'COOK-AS-004',
        3120,      -- prix unitaire
        0.20,      -- taux de TVA (20%)
        3,         -- quantité
        9360,      -- sous-total (3120 * 3)
        1872,      -- TVA (9360 * 0.20)
        11232      -- total (9360 + 1872)
    ),
    -- Pour la commande 5
    (
        5,  -- order_id
        1,  -- product_id (par exemple)
        'Les Secrets de la Cuisine Française',
        'COOK-FR-001',
        2990,      -- prix unitaire
        0.20,      -- taux de TVA (20%)
        2,         -- quantité
        5980,      -- sous-total
        1196,      -- TVA (5980 * 0.20)
        7176       -- total (5980 + 1196)
    );

