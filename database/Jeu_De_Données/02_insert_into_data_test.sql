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
(8, 'Alexandre', 'Simon', '+33999888777', '1993-08-17', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face');

-- =====================================================
-- 2. ILLUSTRATIONS PAPIER
-- =====================================================

INSERT INTO products (name, slug, sku, short_description, description, price_cents, tax_rate_id, stock_quantity, low_stock_threshold, meta_title, meta_description, is_active, created_by) VALUES
('Aquarelle "Paysage Provençal"', 'aquarelle-paysage-provencal', 'AQ-PROV-001', 'Aquarelle originale 30x40cm représentant un paysage de Provence', 'Cette magnifique aquarelle originale capture l''essence de la Provence avec ses champs de lavande et ses cyprès. Réalisée sur papier Canson 300g/m², cette œuvre unique mesure 30x40cm et est signée par l''artiste. Parfaite pour décorer un salon ou un bureau.', 45000, 1, 1, 1, 'Aquarelle Paysage Provençal - Œuvre d''art originale', 'Aquarelle originale 30x40cm représentant un paysage de Provence. Œuvre unique signée par l''artiste.', true, 1),

('Dessin au Fusain "Portrait de Femme"', 'dessin-fusain-portrait-femme', 'FUS-PORT-002', 'Dessin au fusain sur papier 25x35cm, portrait réaliste', 'Portrait au fusain d''une grande finesse, réalisé sur papier Canson blanc 180g/m². Ce dessin de 25x35cm capture l''émotion et la profondeur du regard. Technique maîtrisée avec des dégradés subtils et des contrastes saisissants. Œuvre encadrée disponible.', 32000, 1, 1, 1, 'Dessin au Fusain Portrait de Femme - Art original', 'Portrait au fusain 25x35cm sur papier Canson. Dessin réaliste avec technique maîtrisée.', true, 1),

('Illustration Botanique "Fleurs des Champs"', 'illustration-botanique-fleurs-champs', 'BOT-FLEUR-003', 'Illustration botanique aquarelle 20x30cm, étude de fleurs', 'Illustration botanique détaillée réalisée à l''aquarelle sur papier Arches 300g/m². Cette étude de 20x30cm présente diverses fleurs des champs avec une précision scientifique et une beauté artistique. Parfaite pour les amateurs de botanique et d''art naturaliste.', 28000, 1, 2, 1, 'Illustration Botanique Fleurs des Champs - Aquarelle', 'Illustration botanique aquarelle 20x30cm. Étude détaillée de fleurs des champs sur papier Arches.', true, 1),

('Croquis Urbain "Paris Montmartre"', 'croquis-urbain-paris-montmartre', 'CROQ-PARIS-004', 'Croquis à l''encre de Chine 18x25cm, scène de rue parisienne', 'Croquis urbain capturant l''ambiance de Montmartre, réalisé à l''encre de Chine sur papier Bristol. Format 18x25cm, ce dessin saisit l''instant avec des traits vifs et expressifs. L''artiste a su restituer l''âme de ce quartier parisien emblématique.', 22000, 1, 3, 1, 'Croquis Urbain Paris Montmartre - Dessin à l''encre', 'Croquis à l''encre de Chine 18x25cm. Scène de rue parisienne à Montmartre, traits expressifs.', true, 1),

('Pastel "Coucher de Soleil Maritime"', 'pastel-coucher-soleil-maritime', 'PAS-MER-005', 'Pastel sec sur papier 35x50cm, paysage maritime', 'Magnifique pastel sec sur papier Canson Mi-Teintes 35x50cm. Cette œuvre capture la magie d''un coucher de soleil sur la mer avec des couleurs chaudes et des dégradés subtils. Technique maîtrisée pour un rendu lumineux et poétique.', 55000, 1, 1, 1, 'Pastel Coucher de Soleil Maritime - Art original', 'Pastel sec 35x50cm sur papier Canson. Coucher de soleil maritime aux couleurs chaudes.', true, 1),

('Encre de Chine "Architecture Gothique"', 'encre-chine-architecture-gothique', 'ENC-GOTH-006', 'Dessin à l''encre de Chine 40x60cm, architecture gothique', 'Dessin architectural à l''encre de Chine sur papier aquarelle 40x60cm. Cette œuvre détaillée représente une cathédrale gothique avec une précision remarquable. Jeu d''ombres et de lumières pour créer une atmosphère mystique et majestueuse.', 48000, 1, 1, 1, 'Encre de Chine Architecture Gothique - Dessin original', 'Dessin à l''encre 40x60cm. Architecture gothique avec jeux d''ombres et de lumières.', true, 1),

('Crayon de Couleur "Nature Morte"', 'crayon-couleur-nature-morte', 'CC-NAT-007', 'Dessin aux crayons de couleur 25x35cm, nature morte', 'Nature morte aux crayons de couleur sur papier Canson 25x35cm. Composition harmonieuse avec des fruits et des objets du quotidien. Technique de superposition des couleurs pour un rendu réaliste et vibrant. Œuvre encadrée sur demande.', 35000, 1, 2, 1, 'Crayon de Couleur Nature Morte - Dessin original', 'Nature morte aux crayons de couleur 25x35cm. Technique de superposition pour rendu réaliste.', true, 1),

('Aquarelle "Forêt Automnale"', 'aquarelle-foret-automnale', 'AQ-FORET-008', 'Aquarelle 30x45cm, paysage de forêt en automne', 'Aquarelle sur papier Arches 30x45cm capturant la beauté d''une forêt en automne. Palette de couleurs chaudes avec des rouges, oranges et jaunes éclatants. Technique humide sur humide pour des effets de transparence et de fluidité remarquables.', 42000, 1, 1, 1, 'Aquarelle Forêt Automnale - Paysage original', 'Aquarelle 30x45cm sur papier Arches. Forêt automnale aux couleurs chaudes et éclatantes.', true, 1),

('Sanguine "Étude de Nu"', 'sanguine-etude-nu', 'SANG-NU-009', 'Dessin à la sanguine 20x30cm, étude académique', 'Étude académique à la sanguine sur papier Ingres 20x30cm. Ce dessin de nu démontre une maîtrise parfaite de l''anatomie et des proportions. Technique traditionnelle avec des dégradés subtils et une ligne expressive. Œuvre d''art classique.', 38000, 1, 1, 1, 'Sanguine Étude de Nu - Dessin académique original', 'Étude de nu à la sanguine 20x30cm. Technique académique avec maîtrise de l''anatomie.', true, 1),

('Gouache "Village de Montagne"', 'gouache-village-montagne', 'GOU-MONT-010', 'Peinture à la gouache 25x40cm, village alpin', 'Peinture à la gouache sur papier 25x40cm représentant un charmant village de montagne. Couleurs vives et contrastées typiques de cette technique. Architecture traditionnelle alpine avec des toits enneigés et une atmosphère chaleureuse.', 33000, 1, 2, 1, 'Gouache Village de Montagne - Peinture originale', 'Peinture à la gouache 25x40cm. Village alpin aux couleurs vives et architecture traditionnelle.', true, 1);

-- =====================================================
-- 3. IMAGES DES ILLUSTRATIONS
-- =====================================================

INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order, uploaded_by) VALUES
(1, 'https://eorian.fr/wp-content/uploads/2025/10/image-11.png', 'Aquarelle Paysage Provençal - Vue d''ensemble', true, 1, 9),
(1, 'https://eorian.fr/wp-content/uploads/2025/10/image-10.png', 'Aquarelle Paysage Provençal - Détail lavande', false, 2, 9),
(1, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop', 'Aquarelle Paysage Provençal - Signature artiste', false, 3, 9),
(2, 'https://eorian.fr/wp-content/uploads/2025/10/image-9.png', 'Dessin au Fusain Portrait de Femme - Vue principale', true, 1, 9),
(2, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop', 'Dessin au Fusain Portrait de Femme - Détail visage', false, 2, 9),
(3, 'https://eorian.fr/wp-content/uploads/2025/10/image-10.png', 'Illustration Botanique Fleurs des Champs - Vue générale', true, 1, 9),
(3, 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop', 'Illustration Botanique Fleurs des Champs - Détail fleurs', false, 2, 9),
(4, 'https://eorian.fr/wp-content/uploads/2025/10/image-7.png', 'Croquis Urbain Paris Montmartre - Scène de rue', true, 1, 9),
(4, 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop', 'Croquis Urbain Paris Montmartre - Détail architecture', false, 2, 9),
(5, 'https://eorian.fr/wp-content/uploads/2025/10/image-6.png', 'Pastel Coucher de Soleil Maritime - Vue d''ensemble', true, 1, 9),
(5, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'Pastel Coucher de Soleil Maritime - Détail couleurs', false, 2, 9),
(6, 'https://eorian.fr/wp-content/uploads/2025/10/image-4.png', 'Encre de Chine Architecture Gothique - Vue principale', true, 1, 9),
(6, 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=600&fit=crop', 'Encre de Chine Architecture Gothique - Détail façade', false, 2, 9),
(7, 'https://eorian.fr/wp-content/uploads/2025/10/image-3.png', 'Crayon de Couleur Nature Morte - Composition', true, 1, 9),
(7, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', 'Crayon de Couleur Nature Morte - Détail fruits', false, 2, 9),
(8, 'https://eorian.fr/wp-content/uploads/2025/10/illustration_eorian_8_1x.webp', 'Aquarelle Forêt Automnale - Paysage complet', true, 1, 9),
(8, 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop', 'Aquarelle Forêt Automnale - Détail feuillage', false, 2, 9),
(9, 'https://eorian.fr/wp-content/uploads/2025/10/illustration_eorian_7_1x.webp', 'Sanguine Étude de Nu - Dessin principal', true, 1, 9),
(9, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop', 'Sanguine Étude de Nu - Détail anatomie', false, 2, 9),
(10, 'https://eorian.fr/wp-content/uploads/2025/10/illustration_eorian_5_1x.webp', 'Gouache Village de Montagne - Vue d''ensemble', true, 1, 9),
(10, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'Gouache Village de Montagne - Détail architecture', false, 2, 9);

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
(1, 1, 1, '2025-01-15 10:30:00'),  -- Marie veut l'aquarelle provençale
(1, 3, 1, '2025-01-15 10:35:00'),  -- Marie veut aussi l'illustration botanique

(2, 2, 1, '2025-01-16 14:20:00'),  -- Pierre veut le portrait au fusain
(2, 9, 1, '2025-01-16 14:25:00'), -- Pierre veut aussi l'étude de nu

(3, 5, 1, '2025-01-17 09:15:00'),  -- Sophie veut le pastel maritime

(4, 6, 1, '2025-01-18 16:45:00'),  -- Jean veut l'architecture gothique
(4, 10, 1, '2025-01-18 16:50:00'),  -- Jean veut aussi le village de montagne

(5, 8, 1, '2025-01-19 11:30:00'),  -- Claire veut la forêt automnale

(6, 7, 1, '2025-01-20 13:20:00'),  -- Thomas veut la nature morte

(7, 4, 1, '2025-01-21 15:10:00'),  -- Laura veut le croquis de Montmartre

(8, 1, 1, '2025-01-22 08:45:00');  -- Alexandre veut l'aquarelle provençale

-- =====================================================
-- 7. COMMANDES
-- =====================================================

INSERT INTO orders (order_number, user_id, shipping_address_id, billing_address_id, status, subtotal_cents, tax_amount_cents, shipping_cents, total_cents, payment_status, payment_method, payment_reference, shipping_method, tracking_number, customer_notes, created_at, shipped_at, delivered_at) VALUES
('EOR-20250101-001', 1, 1, 2, 'delivered', 73000, 14600, 0, 87600, 'paid', 'card', 'pi_1234567890', 'Colissimo', '1A234567890FR', 'Livraison en point relais si possible', '2025-01-01 10:30:00', '2025-01-02 14:20:00', '2025-01-04 16:45:00'),
('EOR-20250102-002', 2, 3, 4, 'shipped', 70000, 14000, 0, 84000, 'paid', 'card', 'pi_2345678901', 'Chronopost', '2B345678901FR', NULL, '2025-01-02 14:20:00', '2025-01-03 09:15:00', NULL),
('EOR-20250103-003', 3, 5, 6, 'processing', 55000, 11000, 0, 66000, 'paid', 'card', 'pi_3456789012', 'Colissimo', NULL, 'Livraison en entreprise', '2025-01-03 09:15:00', NULL, NULL),
('EOR-20250104-004', 4, 7, 8, 'pending', 81000, 16200, 0, 97200, 'pending', 'card', NULL, 'Colissimo', NULL, NULL, '2025-01-04 16:45:00', NULL, NULL),
('EOR-20250105-005', 5, 9, 10, 'cancelled', 42000, 8400, 0, 50400, 'refunded', 'card', 'pi_4567890123', 'Colissimo', NULL, 'Commande annulée par le client', '2025-01-05 11:30:00', NULL, NULL),
('EOR-20250106-006', 6, 11, 12, 'delivered', 35000, 7000, 0, 42000, 'paid', 'card', 'pi_5678901234', 'Chronopost', '3C456789012FR', NULL, '2025-01-06 13:20:00', '2025-01-07 10:30:00', '2025-01-09 14:15:00'),
('EOR-20250107-007', 7, 13, 14, 'shipped', 22000, 4400, 0, 26400, 'paid', 'card', 'pi_6789012345', 'Colissimo', '4D567890123FR', NULL, '2025-01-07 15:10:00', '2025-01-08 11:45:00', NULL),
('EOR-20250108-008', 8, 15, 16, 'processing', 45000, 9000, 0, 54000, 'paid', 'card', 'pi_7890123456', 'Chronopost', NULL, 'Livraison urgente demandée', '2025-01-08 08:45:00', NULL, NULL);

-- =====================================================
-- 8. ARTICLES DE COMMANDES
-- =====================================================

INSERT INTO order_items (order_id, product_id, product_name, product_sku, unit_price_cents, tax_rate, quantity, line_subtotal_cents, line_tax_cents, line_total_cents) VALUES
(1, 1, 'Aquarelle "Paysage Provençal"', 'AQ-PROV-001', 45000, 0.2000, 1, 45000, 9000, 54000),
(1, 3, 'Illustration Botanique "Fleurs des Champs"', 'BOT-FLEUR-003', 28000, 0.2000, 1, 28000, 5600, 33600),
(2, 2, 'Dessin au Fusain "Portrait de Femme"', 'FUS-PORT-002', 32000, 0.2000, 1, 32000, 6400, 38400),
(2, 9, 'Sanguine "Étude de Nu"', 'SANG-NU-009', 38000, 0.2000, 1, 38000, 7600, 45600),
(3, 5, 'Pastel "Coucher de Soleil Maritime"', 'PAS-MER-005', 55000, 0.2000, 1, 55000, 11000, 66000),
(4, 6, 'Encre de Chine "Architecture Gothique"', 'ENC-GOTH-006', 48000, 0.2000, 1, 48000, 9600, 57600),
(4, 10, 'Gouache "Village de Montagne"', 'GOU-MONT-010', 33000, 0.2000, 1, 33000, 6600, 39600),
(5, 8, 'Aquarelle "Forêt Automnale"', 'AQ-FORET-008', 42000, 0.2000, 1, 42000, 8400, 50400),
(6, 7, 'Crayon de Couleur "Nature Morte"', 'CC-NAT-007', 35000, 0.2000, 1, 35000, 7000, 42000),
(7, 4, 'Croquis Urbain "Paris Montmartre"', 'CROQ-PARIS-004', 22000, 0.2000, 1, 22000, 4400, 26400),
(8, 1, 'Aquarelle "Paysage Provençal"', 'AQ-PROV-001', 45000, 0.2000, 1, 45000, 9000, 54000);

-- =====================================================
-- 9. SESSIONS UTILISATEURS (exemples)
-- =====================================================

INSERT INTO user_sessions (user_id, refresh_token, device_info, ip_address, expires_at, is_active) VALUES
(1, 'rt_marie_dupont_20250117_001', '{"type": "desktop", "name": "Chrome on Windows", "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", "screen": "1920x1080", "custom_name": "Ordinateur de bureau"}', '192.168.1.100', '2026-02-17 10:30:00', true),
(1, 'rt_marie_dupont_20250117_002', '{"type": "mobile", "name": "Safari on iPhone", "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)", "screen": "390x844", "custom_name": "iPhone de Marie"}', '192.168.1.101', '2026-02-17 15:45:00', true),
(2, 'rt_pierre_martin_20250117_001', '{"type": "desktop", "name": "Firefox on macOS", "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0", "screen": "2560x1440", "custom_name": "MacBook Pro"}', '192.168.1.102', '2026-02-17 14:20:00', true),
(3, 'rt_sophie_bernard_20250117_001', '{"type": "tablet", "name": "Safari on iPad", "user_agent": "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)", "screen": "1024x1366", "custom_name": "iPad de Sophie"}', '192.168.1.103', '2026-02-17 09:15:00', true),
(9, 'rt_admin_eorian_20250117_001', '{"type": "desktop", "name": "Chrome on Windows", "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", "screen": "1920x1080", "custom_name": "Poste Admin Principal"}', '192.168.1.200', '2026-02-17 08:00:00', true);

-- =====================================================
-- FIN DU JEU DE DONNÉES ILLUSTRATIONS PAPIER
-- =====================================================

-- Vérification des données insérées
SELECT 'Utilisateurs créés:' as info, COUNT(*) as count FROM users;
SELECT 'Illustrations créées:' as info, COUNT(*) as count FROM products;
SELECT 'Images illustrations:' as info, COUNT(*) as count FROM product_images;
SELECT 'Adresses créées:' as info, COUNT(*) as count FROM addresses;
SELECT 'Méthodes de paiement:' as info, COUNT(*) as count FROM user_payment_methods;
SELECT 'Articles de panier:' as info, COUNT(*) as count FROM cart_items;
SELECT 'Commandes créées:' as info, COUNT(*) as count FROM orders;
SELECT 'Articles de commandes:' as info, COUNT(*) as count FROM order_items;
SELECT 'Sessions actives:' as info, COUNT(*) as count FROM user_sessions WHERE is_active = true;
