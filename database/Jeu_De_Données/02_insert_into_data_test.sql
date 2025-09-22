-- Active: 1757659359211@@127.0.0.1@5432@eorian_fr_db
-- =====================================================
-- JEU DE DONNÉES COMPLET POUR EORIAN - VERSION CORRIGÉE
-- =====================================================
-- Description: Données de test réalistes pour toutes les tables
-- Date: 2025-01-17
-- Auteur: Assistant IA
-- Version: 2.0 - Conforme aux contraintes de la base
-- =====================================================

-- Nettoyage des données existantes (optionnel - décommentez si nécessaire)
-- TRUNCATE TABLE order_items, orders, cart_items, addresses, product_images, products, user_payment_methods, user_profiles, user_sessions, users RESTART IDENTITY CASCADE;

-- =====================================================
-- 1. UTILISATEURS ET PROFILS
-- =====================================================

-- Utilisateurs clients
INSERT INTO users (username, email, password_hash, role_id, is_active, email_verified, gdpr_consent, gdpr_consent_date) VALUES
('mariedupont', 'mariedupont@email.com', '$2b$10$rQZ8K9vL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 1, true, true, true, '2024-01-15 10:30:00'),
('pierremartin', 'pierremartin@email.com', '$2b$10$rQZ8K9vL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 1, true, true, true, '2024-02-20 14:15:00'),
('sophiebernard', 'sophiebernard@email.com', '$2b$10$rQZ8K9vL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 1, true, true, true, '2024-03-10 09:45:00'),
('jeandurand', 'jeandurand@email.com', '$2b$10$rQZ8K9vL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 1, true, true, true, '2024-04-05 16:20:00'),
('claireroux', 'claireroux@email.com', '$2b$10$rQZ8K9vL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 1, true, true, true, '2024-05-12 11:30:00'),
('thomaspetit', 'thomaspetit@email.com', '$2b$10$rQZ8K9vL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 1, true, true, true, '2024-06-18 13:45:00'),
('lauramoreau', 'lauramoreau@email.com', '$2b$10$rQZ8K9vL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 1, true, true, true, '2024-07-22 08:15:00'),
('alexandresimon', 'alexandresimon@email.com', '$2b$10$rQZ8K9vL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 1, true, true, true, '2024-08-30 15:30:00');

-- Utilisateurs administrateurs
INSERT INTO users (username, email, password_hash, role_id, is_active, email_verified, gdpr_consent, gdpr_consent_date) VALUES
('admin.eorian', 'admin@eorian.fr', '$2b$10$rQZ8K9vL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 2, true, true, true, '2024-01-01 00:00:00'),
('manager.eorian', 'manager@eorian.fr', '$2b$10$rQZ8K9vL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 2, true, true, true, '2024-01-01 00:00:00');

-- Profils utilisateurs
INSERT INTO user_profiles (user_id, first_name, last_name, phone, birth_date, avatar_url) VALUES
(1, 'Marie', 'Dupont', '+33123456789', '1985-03-15', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'),
(2, 'Pierre', 'Martin', '+33987654321', '1990-07-22', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'),
(3, 'Sophie', 'Bernard', '+33555666777', '1988-11-08', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'),
(4, 'Jean', 'Durand', '+33444555666', '1992-01-30', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'),
(5, 'Claire', 'Roux', '+33333444555', '1987-09-12', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'),
(6, 'Thomas', 'Petit', '+33222333444', '1991-05-25', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'),
(7, 'Laura', 'Moreau', '+33111222333', '1989-12-03', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'),
(8, 'Alexandre', 'Simon', '+33999888777', '1993-08-17', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face')

-- =====================================================
-- 2. PRODUITS
-- =====================================================

INSERT INTO products (name, slug, sku, short_description, description, price_cents, tax_rate_id, stock_quantity, low_stock_threshold, meta_title, meta_description, is_active, created_by) VALUES
('Smartphone Galaxy S24', 'smartphone-galaxy-s24', 'GAL-S24-128', 'Smartphone Android haut de gamme avec écran 6.2"', 'Le Samsung Galaxy S24 offre des performances exceptionnelles avec son processeur Exynos 2400, un écran Dynamic AMOLED 2X de 6.2 pouces et un système de caméra triple professionnel. Parfait pour la photographie et les applications exigeantes.', 89900, 1, 25, 5, 'Samsung Galaxy S24 - Smartphone Android Premium', 'Découvrez le Samsung Galaxy S24 avec écran 6.2", triple caméra et processeur Exynos 2400. Livraison gratuite.', true, 1),
('iPhone 15 Pro', 'iphone-15-pro', 'APP-IP15P-256', 'iPhone 15 Pro avec puce A17 Pro et caméra 48MP', 'L''iPhone 15 Pro révolutionne la photographie mobile avec sa caméra principale 48MP et son système de zoom optique 3x. La puce A17 Pro offre des performances inégalées pour le gaming et la création de contenu.', 119900, 1, 15, 3, 'iPhone 15 Pro - Smartphone Apple Premium', 'iPhone 15 Pro avec puce A17 Pro, caméra 48MP et design en titane. Disponible en plusieurs couleurs.', true, 1),
('MacBook Air M3', 'macbook-air-m3', 'APP-MBA-M3-256', 'MacBook Air 13" avec puce M3 et 8GB RAM', 'Le MacBook Air M3 allie performance et portabilité avec sa puce Apple M3, 8GB de mémoire unifiée et un écran Liquid Retina 13.6 pouces. Autonomie jusqu''à 18 heures pour une productivité sans limites.', 129900, 1, 12, 2, 'MacBook Air M3 - Ordinateur portable Apple', 'MacBook Air 13" avec puce M3, 8GB RAM et autonomie 18h. Design ultra-fin et silencieux.', true, 1),
('AirPods Pro 2', 'airpods-pro-2', 'APP-APP2-GEN2', 'Écouteurs sans fil avec réduction de bruit active', 'Les AirPods Pro de 2ème génération offrent une réduction de bruit active améliorée, un son spatial personnalisé et une autonomie jusqu''à 6 heures. Compatible avec tous les appareils Apple.', 27900, 1, 50, 10, 'AirPods Pro 2 - Écouteurs sans fil Apple', 'AirPods Pro 2ème génération avec réduction de bruit active et son spatial. Livraison rapide.', true, 1),
('Samsung 4K TV 55"', 'samsung-4k-tv-55', 'SAM-TV55-4K', 'Téléviseur 4K UHD 55 pouces avec Smart TV', 'Téléviseur Samsung 55 pouces 4K UHD avec technologie QLED, Smart TV intégrée et compatibilité HDR10+. Parfait pour le home cinéma avec un son Dolby Atmos.', 69900, 1, 8, 2, 'Samsung TV 4K 55" - Téléviseur QLED Smart TV', 'Téléviseur Samsung 55" 4K QLED avec Smart TV et son Dolby Atmos. Installation incluse.', true, 1),
('PlayStation 5', 'playstation-5', 'SONY-PS5-STD', 'Console de jeu PlayStation 5 avec disque', 'La PlayStation 5 révolutionne le gaming avec son processeur AMD Zen 2, son SSD ultra-rapide et ses graphismes 4K. Compatible avec tous les jeux PS4 et les nouveaux titres PS5.', 49900, 1, 6, 1, 'PlayStation 5 - Console de jeu Sony', 'PlayStation 5 avec disque, SSD ultra-rapide et graphismes 4K. Jeux PS4 et PS5 compatibles.', true, 1),
('Nintendo Switch OLED', 'nintendo-switch-oled', 'NIN-SW-OLED', 'Console portable Nintendo Switch avec écran OLED', 'La Nintendo Switch OLED offre un écran OLED 7 pouces vibrant, 64GB de stockage et une autonomie améliorée. Parfaite pour jouer en mode portable ou sur TV.', 34900, 1, 20, 5, 'Nintendo Switch OLED - Console portable', 'Nintendo Switch OLED avec écran 7" et 64GB. Jeu portable et sur TV. Livraison gratuite.', true, 1),
('iPad Air M2', 'ipad-air-m2', 'APP-IPA-M2-256', 'Tablette iPad Air avec puce M2 et 10.9"', 'L''iPad Air M2 combine la puissance de la puce M2 avec un écran Liquid Retina 10.9 pouces. Parfait pour la créativité, le travail et les loisirs avec Apple Pencil et Magic Keyboard.', 69900, 1, 18, 4, 'iPad Air M2 - Tablette Apple 10.9"', 'iPad Air avec puce M2, écran 10.9" et compatibilité Apple Pencil. Design ultra-fin.', true, 1),
('Casque Sony WH-1000XM5', 'casque-sony-wh1000xm5', 'SONY-WH1000XM5', 'Casque sans fil avec réduction de bruit', 'Le Sony WH-1000XM5 offre la meilleure réduction de bruit du marché, un son haute qualité et une autonomie de 30 heures. Parfait pour les voyages et le télétravail.', 39900, 1, 15, 3, 'Sony WH-1000XM5 - Casque sans fil premium', 'Casque Sony WH-1000XM5 avec réduction de bruit exceptionnelle et son haute qualité.', true, 1),
('Apple Watch Series 9', 'apple-watch-series-9', 'APP-AW9-45MM', 'Montre connectée Apple Watch Series 9 45mm', 'L''Apple Watch Series 9 45mm avec puce S9, écran Always-On Retina et détection de chute. Suivi santé avancé, GPS et résistance à l''eau jusqu''à 50m.', 44900, 1, 30, 6, 'Apple Watch Series 9 - Montre connectée 45mm', 'Apple Watch Series 9 45mm avec puce S9 et suivi santé avancé. GPS et résistance eau.', true, 1);

-- =====================================================
-- 3. IMAGES DE PRODUITS
-- =====================================================

INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order, uploaded_by) VALUES
(1, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop', 'Samsung Galaxy S24 - Vue avant', true, 1, 9),
(1, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop', 'Samsung Galaxy S24 - Vue arrière', false, 2, 9),
(1, 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop', 'Samsung Galaxy S24 - Détail caméra', false, 3, 9),
(2, 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=600&fit=crop', 'iPhone 15 Pro - Vue avant', true, 1, 9),
(2, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop', 'iPhone 15 Pro - Vue arrière', false, 2, 9),
(3, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop', 'MacBook Air M3 - Vue ouverte', true, 1, 9),
(3, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop', 'MacBook Air M3 - Vue fermée', false, 2, 9),
(4, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=600&fit=crop', 'AirPods Pro 2 - Boîtier et écouteurs', true, 1, 9),
(5, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop', 'Samsung TV 4K 55 pouces', true, 1, 9),
(5, 'https://images.unsplash.com/photo-1461151304267-b35e2241aad8?w=800&h=600&fit=crop', 'Samsung TV - Interface Smart TV', false, 2, 9),
(6, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop', 'PlayStation 5 - Console principale', true, 1, 9),
(6, 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop', 'PlayStation 5 - Manette DualSense', false, 2, 9),
(7, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', 'Nintendo Switch OLED - Mode portable', true, 1, 9),
(7, 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&h=600&fit=crop', 'Nintendo Switch OLED - Mode TV', false, 2, 9),
(8, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop', 'iPad Air M2 - Vue avant', true, 1, 9),
(8, 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=600&fit=crop', 'iPad Air M2 - Avec Apple Pencil', false, 2, 9),
(9, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop', 'Sony WH-1000XM5 - Casque fermé', true, 1, 9),
(9, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop', 'Sony WH-1000XM5 - Détail écouteurs', false, 2, 9),
(10, 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=600&fit=crop', 'Apple Watch Series 9 - Vue face', true, 1, 9),
(10, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop', 'Apple Watch Series 9 - Sur poignet', false, 2, 9);

-- =====================================================
-- 4. ADRESSES UTILISATEURS
-- =====================================================

INSERT INTO addresses (user_id, type, first_name, last_name, company, phone, address_line_1, address_line_2, city, postal_code, state_region, country, is_default) VALUES
-- Marie Dupont
(1, 'shipping', 'Marie', 'Dupont', NULL, '+33123456789', '15 Rue de la Paix', 'Appartement 3B', 'Paris', '75001', 'Île-de-France', 'FR', true),
(1, 'billing', 'Marie', 'Dupont', 'Entreprise Dupont SARL', '+33123456789', '15 Rue de la Paix', 'Appartement 3B', 'Paris', '75001', 'Île-de-France', 'FR', true),
(2, 'shipping', 'Pierre', 'Martin', NULL, '+33987654321', '42 Avenue des Champs-Élysées', NULL, 'Paris', '75008', 'Île-de-France', 'FR', true),
(2, 'billing', 'Pierre', 'Martin', NULL, '+33987654321', '42 Avenue des Champs-Élysées', NULL, 'Paris', '75008', 'Île-de-France', 'FR', true),
(3, 'shipping', 'Sophie', 'Bernard', NULL, '+33555666777', '8 Place Bellecour', 'Bâtiment A', 'Lyon', '69002', 'Auvergne-Rhône-Alpes', 'FR', true),
(3, 'billing', 'Sophie', 'Bernard', NULL, '+33555666777', '8 Place Bellecour', 'Bâtiment A', 'Lyon', '69002', 'Auvergne-Rhône-Alpes', 'FR', true),
(4, 'shipping', 'Jean', 'Durand', NULL, '+33444555666', '25 Cours Mirabeau', NULL, 'Aix-en-Provence', '13100', 'Provence-Alpes-Côte d''Azur', 'FR', true),
(4, 'billing', 'Jean', 'Durand', NULL, '+33444555666', '25 Cours Mirabeau', NULL, 'Aix-en-Provence', '13100', 'Provence-Alpes-Côte d''Azur', 'FR', true),
(5, 'shipping', 'Claire', 'Roux', NULL, '+33333444555', '12 Rue de la République', '2ème étage', 'Marseille', '13001', 'Provence-Alpes-Côte d''Azur', 'FR', true),
(5, 'billing', 'Claire', 'Roux', NULL, '+33333444555', '12 Rue de la République', '2ème étage', 'Marseille', '13001', 'Provence-Alpes-Côte d''Azur', 'FR', true),
(6, 'shipping', 'Thomas', 'Petit', NULL, '+33222333444', '7 Place du Capitole', NULL, 'Toulouse', '31000', 'Occitanie', 'FR', true),
(6, 'billing', 'Thomas', 'Petit', NULL, '+33222333444', '7 Place du Capitole', NULL, 'Toulouse', '31000', 'Occitanie', 'FR', true),
(7, 'shipping', 'Laura', 'Moreau', NULL, '+33111222333', '18 Rue de la Soif', 'Résidence Les Lilas', 'Nantes', '44000', 'Pays de la Loire', 'FR', true),
(7, 'billing', 'Laura', 'Moreau', NULL, '+33111222333', '18 Rue de la Soif', 'Résidence Les Lilas', 'Nantes', '44000', 'Pays de la Loire', 'FR', true),
(8, 'shipping', 'Alexandre', 'Simon', NULL, '+33999888777', '33 Boulevard de la Liberté', 'Appartement 5', 'Lille', '59000', 'Hauts-de-France', 'FR', true),
(8, 'billing', 'Alexandre', 'Simon', NULL, '+33999888777', '33 Boulevard de la Liberté', 'Appartement 5', 'Lille', '59000', 'Hauts-de-France', 'FR', true);

-- =====================================================
-- 5. MÉTHODES DE PAIEMENT
-- =====================================================

INSERT INTO user_payment_methods (user_id, card_token, card_last4, card_brand, card_type, cardholder_name, expires_month, expires_year, nickname, is_default, is_active) VALUES
(1, 'tok_visa_4242_marie', '4242', 'visa', 'card', 'Marie Dupont', 12, 2026, 'Carte principale', true, true),
(1, 'tok_mastercard_5555_marie', '5555', 'mastercard', 'card', 'Marie Dupont', 8, 2027, 'Carte de secours', false, true),

(2, 'tok_visa_4242_pierre', '4242', 'visa', 'card', 'Pierre Martin', 6, 2025, 'Visa Pierre', true, true),

(3, 'tok_mastercard_5555_sophie', '5555', 'mastercard', 'card', 'Sophie Bernard', 3, 2026, 'Mastercard Sophie', true, true),

(4, 'tok_amex_3782_jean', '3782', 'amex', 'card', 'Jean Durand', 11, 2027, 'American Express', true, true),

(5, 'tok_visa_4242_claire', '4242', 'visa', 'card', 'Claire Roux', 9, 2025, 'Visa Claire', true, true),

(6, 'tok_mastercard_5555_thomas', '5555', 'mastercard', 'card', 'Thomas Petit', 4, 2026, 'MC Thomas', true, true),

(7, 'tok_visa_4242_laura', '4242', 'visa', 'card', 'Laura Moreau', 7, 2027, 'Visa Laura', true, true),

(8, 'tok_mastercard_5555_alex', '5555', 'mastercard', 'card', 'Alexandre Simon', 2, 2025, 'Mastercard Alex', true, true);

-- =====================================================
-- 6. ARTICLES DE PANIER
-- =====================================================

INSERT INTO cart_items (user_id, product_id, quantity, added_at) VALUES
(1, 1, 1, '2025-01-15 10:30:00'),  -- Marie veut un Galaxy S24
(1, 4, 1, '2025-01-15 10:35:00'),  -- Marie veut aussi des AirPods Pro

(2, 2, 1, '2025-01-16 14:20:00'),  -- Pierre veut un iPhone 15 Pro
(2, 10, 1, '2025-01-16 14:25:00'), -- Pierre veut aussi une Apple Watch

(3, 3, 1, '2025-01-17 09:15:00'),  -- Sophie veut un MacBook Air M3

(4, 6, 1, '2025-01-18 16:45:00'),  -- Jean veut une PlayStation 5
(4, 7, 1, '2025-01-18 16:50:00'),  -- Jean veut aussi une Nintendo Switch

(5, 5, 1, '2025-01-19 11:30:00'),  -- Claire veut une TV Samsung

(6, 8, 1, '2025-01-20 13:20:00'),  -- Thomas veut un iPad Air

(7, 9, 1, '2025-01-21 15:10:00'),  -- Laura veut un casque Sony

(8, 1, 2, '2025-01-22 08:45:00');  -- Alexandre veut 2 Galaxy S24

-- =====================================================
-- 7. COMMANDES
-- =====================================================

INSERT INTO orders (order_number, user_id, shipping_address_id, billing_address_id, status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents, payment_status, payment_method, payment_reference, shipping_method, tracking_number, customer_notes, created_at, shipped_at, delivered_at) VALUES
-- Commande de Marie Dupont (livrée)
('EOR-20250101-001', 1, 1, 2, 'delivered', 117800, 23560, 0, 141360, 'paid', 'card', 'pi_1234567890', 'Colissimo', '1A234567890FR', 'Livraison en point relais si possible', '2025-01-01 10:30:00', '2025-01-02 14:20:00', '2025-01-04 16:45:00'),

-- Commande de Pierre Martin (expédiée)
('EOR-20250102-002', 2, 3, 4, 'shipped', 164800, 32960, 0, 197760, 'paid', 'card', 'pi_2345678901', 'Chronopost', '2B345678901FR', NULL, '2025-01-02 14:20:00', '2025-01-03 09:15:00', NULL),

-- Commande de Sophie Bernard (en cours de traitement)
('EOR-20250103-003', 3, 5, 6, 'processing', 129900, 25980, 0, 155880, 'paid', 'card', 'pi_3456789012', 'Colissimo', NULL, 'Livraison en entreprise', '2025-01-03 09:15:00', NULL, NULL),

-- Commande de Jean Durand (en attente)
('EOR-20250104-004', 4, 7, 8, 'pending', 84800, 16960, 0, 101760, 'pending', 'card', NULL, 'Colissimo', NULL, NULL, '2025-01-04 16:45:00', NULL, NULL),

-- Commande de Claire Roux (annulée)
('EOR-20250105-005', 5, 9, 10, 'cancelled', 69900, 13980, 0, 83880, 'refunded', 'card', 'pi_4567890123', 'Colissimo', NULL, 'Commande annulée par le client', '2025-01-05 11:30:00', NULL, NULL),

-- Commande de Thomas Petit (livrée)
('EOR-20250106-006', 6, 11, 12, 'delivered', 69900, 13980, 0, 83880, 'paid', 'card', 'pi_5678901234', 'Chronopost', '3C456789012FR', NULL, '2025-01-06 13:20:00', '2025-01-07 10:30:00', '2025-01-09 14:15:00'),

-- Commande de Laura Moreau (expédiée)
('EOR-20250107-007', 7, 13, 14, 'shipped', 39900, 7980, 0, 47880, 'paid', 'card', 'pi_6789012345', 'Colissimo', '4D567890123FR', NULL, '2025-01-07 15:10:00', '2025-01-08 11:45:00', NULL),

-- Commande d'Alexandre Simon (en cours de traitement)
('EOR-20250108-008', 8, 15, 16, 'processing', 179800, 35960, 0, 215760, 'paid', 'card', 'pi_7890123456', 'Chronopost', NULL, 'Livraison urgente demandée', '2025-01-08 08:45:00', NULL, NULL);

-- =====================================================
-- 8. ARTICLES DE COMMANDES
-- =====================================================

INSERT INTO order_items (order_id, product_id, product_name, product_sku, unit_price_cents, tax_rate, quantity, line_subtotal_cents, line_tax_cents, line_total_cents) VALUES
-- Commande EOR-20250101-001 (Marie Dupont)
(1, 1, 'Smartphone Galaxy S24', 'GAL-S24-128', 89900, 0.2000, 1, 89900, 17980, 107880),
(1, 4, 'AirPods Pro 2', 'APP-APP2-GEN2', 27900, 0.2000, 1, 27900, 5580, 33480),
(2, 2, 'iPhone 15 Pro', 'APP-IP15P-256', 119900, 0.2000, 1, 119900, 23980, 143880),
(2, 10, 'Apple Watch Series 9', 'APP-AW9-45MM', 44900, 0.2000, 1, 44900, 8980, 53880),
(3, 3, 'MacBook Air M3', 'APP-MBA-M3-256', 129900, 0.2000, 1, 129900, 25980, 155880),
(4, 6, 'PlayStation 5', 'SONY-PS5-STD', 49900, 0.2000, 1, 49900, 9980, 59880),
(4, 7, 'Nintendo Switch OLED', 'NIN-SW-OLED', 34900, 0.2000, 1, 34900, 6980, 41880),
(5, 5, 'Samsung 4K TV 55"', 'SAM-TV55-4K', 69900, 0.2000, 1, 69900, 13980, 83880),
(6, 8, 'iPad Air M2', 'APP-IPA-M2-256', 69900, 0.2000, 1, 69900, 13980, 83880),
(7, 9, 'Casque Sony WH-1000XM5', 'SONY-WH1000XM5', 39900, 0.2000, 1, 39900, 7980, 47880),
(8, 1, 'Smartphone Galaxy S24', 'GAL-S24-128', 89900, 0.2000, 2, 179800, 35960, 215760);

-- =====================================================
-- 9. SESSIONS UTILISATEURS (exemples)
-- =====================================================

INSERT INTO user_sessions (user_id, refresh_token, device_info, ip_address, expires_at, is_active) VALUES
(1, 'rt_marie_dupont_20250117_001', '{"type": "desktop", "name": "Chrome on Windows", "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", "screen": "1920x1080", "custom_name": "Ordinateur de bureau"}', '192.168.1.100', '2025-02-17 10:30:00', true),
(1, 'rt_marie_dupont_20250117_002', '{"type": "mobile", "name": "Safari on iPhone", "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)", "screen": "390x844", "custom_name": "iPhone de Marie"}', '192.168.1.101', '2025-02-17 15:45:00', true),

(2, 'rt_pierre_martin_20250117_001', '{"type": "desktop", "name": "Firefox on macOS", "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0", "screen": "2560x1440", "custom_name": "MacBook Pro"}', '192.168.1.102', '2025-02-17 14:20:00', true),

(3, 'rt_sophie_bernard_20250117_001', '{"type": "tablet", "name": "Safari on iPad", "user_agent": "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)", "screen": "1024x1366", "custom_name": "iPad de Sophie"}', '192.168.1.103', '2025-02-17 09:15:00', true),

(9, 'rt_admin_eorian_20250117_001', '{"type": "desktop", "name": "Chrome on Windows", "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", "screen": "1920x1080", "custom_name": "Poste Admin Principal"}', '192.168.1.200', '2025-02-17 08:00:00', true);

-- =====================================================
-- FIN DU JEU DE DONNÉES
-- =====================================================

-- Vérification des données insérées
SELECT 'Utilisateurs créés:' as info, COUNT(*) as count FROM users;
SELECT 'Produits créés:' as info, COUNT(*) as count FROM products;
SELECT 'Images produits:' as info, COUNT(*) as count FROM product_images;
SELECT 'Adresses créées:' as info, COUNT(*) as count FROM addresses;
SELECT 'Méthodes de paiement:' as info, COUNT(*) as count FROM user_payment_methods;
SELECT 'Articles de panier:' as info, COUNT(*) as count FROM cart_items;
SELECT 'Commandes créées:' as info, COUNT(*) as count FROM orders;
SELECT 'Articles de commandes:' as info, COUNT(*) as count FROM order_items;
SELECT 'Sessions actives:' as info, COUNT(*) as count FROM user_sessions WHERE is_active = true;


