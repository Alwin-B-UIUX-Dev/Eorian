CREATE TABLE Rôle_utilisateur(
   id SERIAL,
   role_name VARCHAR(20)  NOT NULL,
   description VARCHAR(255) ,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY(id),
   UNIQUE(role_name)
);

CREATE TABLE Utilisatriceurs(
   id SERIAL,
   username CITEXT NOT NULL,
   email CITEXT NOT NULL,
   password_hash VARCHAR(255)  NOT NULL,
   is_active BOOLEAN DEFAULT TRUE,
   is_connected BOOLEAN DEFAULT FALSE,
   email_verified BOOLEAN DEFAULT FALSE,
   gdpr_consent BOOLEAN NOT NULL DEFAULT FALSE,
   gdpr_consent_date TIMESTAMP,
   last_login_at TIMESTAMP,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP NOT NULL,
   role_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(username),
   UNIQUE(email),
   FOREIGN KEY(role_id) REFERENCES Rôle_utilisateur(id)
);

CREATE TABLE Sessions_utilisateur(
   id SERIAL,
   refresh_token VARCHAR(255)  NOT NULL,
   device_type VARCHAR(20)  NOT NULL,
   expires_at TIMESTAMP NOT NULL,
   is_active BOOLEAN DEFAULT TRUE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP,
   user_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(refresh_token),
   FOREIGN KEY(user_id) REFERENCES Utilisatriceurs(id)
);

CREATE TABLE Taux_d_imposition(
   id SERIAL,
   name VARCHAR(50)  NOT NULL,
   rate NUMERIC(5,4)   NOT NULL,
   description TEXT,
   is_active BOOLEAN DEFAULT TRUE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP,
   PRIMARY KEY(id),
   UNIQUE(name)
);

CREATE TABLE Produits(
   id SERIAL,
   name CITEXT NOT NULL,
   slug CITEXT NOT NULL,
   sku VARCHAR(100) ,
   author CITEXT,
   isbn VARCHAR(17) ,
   page_count INTEGER,
   publication_year INTEGER,
   language_ VARCHAR(10)  DEFAULT 'fr',
   publisher CITEXT,
   short_description TEXT,
   description TEXT,
   price_cents INTEGER NOT NULL,
   stock_quantity INTEGER NOT NULL DEFAULT 0,
   low_stock_threshold INTEGER DEFAULT 10,
   manage_stock BOOLEAN DEFAULT TRUE,
   meta_title CITEXT,
   meta_description TEXT,
   is_active BOOLEAN DEFAULT TRUE,
   is_featured BOOLEAN DEFAULT FALSE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   created_by INTEGER NOT NULL,
   tax_rate_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(slug),
   UNIQUE(sku),
   UNIQUE(isbn),
   FOREIGN KEY(created_by) REFERENCES Utilisatriceurs(id),
   FOREIGN KEY(tax_rate_id) REFERENCES Taux_d_imposition(id)
);

CREATE TABLE Avis_produits(
   id SERIAL,
   anonymous_name VARCHAR(100) ,
   rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
   title VARCHAR(200) ,
   comment TEXT,
   is_verified_purchase BOOLEAN DEFAULT FALSE,
   is_moderated BOOLEAN DEFAULT FALSE,
   is_published BOOLEAN DEFAULT TRUE,
   is_anonymous BOOLEAN DEFAULT FALSE,
   anonymized_at TIMESTAMP,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   user_id INTEGER,
   product_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(user_id) REFERENCES Utilisatriceurs(id),
   FOREIGN KEY(product_id) REFERENCES Produits(id)
);

CREATE TABLE Profile_utilisateur(
   id SERIAL,
   first_name VARCHAR(100) ,
   last_name VARCHAR(100) ,
   phone VARCHAR(20) ,
   birth_date DATE,
   newsletter_consent BOOLEAN DEFAULT FALSE,
   newsletter_consent_date TIMESTAMP,
   avatar_url VARCHAR(500) ,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   user_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(user_id),
   FOREIGN KEY(user_id) REFERENCES Utilisatriceurs(id)
);

CREATE TABLE Méthode_de_paiement(
   id SERIAL,
   card_token VARCHAR(255)  NOT NULL,
   card_last4 VARCHAR(4)  NOT NULL,
   card_brand VARCHAR(20)  NOT NULL,
   card_type VARCHAR(10)  DEFAULT 'card',
   cardholder_name VARCHAR(100) ,
   expires_month SMALLINT,
   expires_year SMALLINT,
   nickname VARCHAR(50) ,
   is_default BOOLEAN DEFAULT FALSE,
   is_active BOOLEAN DEFAULT TRUE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   user_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(user_id) REFERENCES Utilisatriceurs(id)
);

CREATE TABLE Catégories(
   id SERIAL,
   name CITEXT NOT NULL,
   slug CITEXT NOT NULL,
   description TEXT,
   level INTEGER DEFAULT 0,
   sort_order INTEGER DEFAULT 0,
   meta_title VARCHAR(200) ,
   meta_description VARCHAR(300) ,
   is_active BOOLEAN DEFAULT TRUE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP,
   parent_id INTEGER,
   PRIMARY KEY(id),
   UNIQUE(slug),
   FOREIGN KEY(parent_id) REFERENCES Catégories(id)
);

CREATE TABLE Adresses(
   id SERIAL,
   type VARCHAR(20)  DEFAULT 'shipping',
   first_name VARCHAR(100)  NOT NULL,
   last_name VARCHAR(100)  NOT NULL,
   company VARCHAR(150) ,
   phone VARCHAR(20)  NOT NULL,
   address_line_1 VARCHAR(200)  NOT NULL,
   address_line_2 VARCHAR(200) ,
   city VARCHAR(100)  NOT NULL,
   postal_code VARCHAR(10)  NOT NULL,
   state_region VARCHAR(100) ,
   country CHAR(2)  DEFAULT 'FR',
   is_default BOOLEAN DEFAULT FALSE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   user_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(user_id) REFERENCES Utilisatriceurs(id)
);

CREATE TABLE Commande(
   id SERIAL,
   order_number VARCHAR(50)  NOT NULL,
   status VARCHAR(20)  DEFAULT 'pending',
   subtotal_cents INTEGER NOT NULL,
   tax_amount_cents INTEGER NOT NULL,
   shipping_cents INTEGER DEFAULT 0,
   total_cents INTEGER NOT NULL,
   payment_status VARCHAR(20)  DEFAULT 'pending',
   payment_method VARCHAR(50) ,
   payment_reference VARCHAR(200) ,
   shipping_method VARCHAR(100) ,
   tracking_number VARCHAR(100) ,
   customer_notes TEXT,
   admin_notes TEXT,
   shipped_at TIMESTAMP,
   delivered_at TIMESTAMP,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   billing_address_id INTEGER,
   shipping_address_id INTEGER,
   user_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(order_number),
   FOREIGN KEY(billing_address_id) REFERENCES Adresses(id),
   FOREIGN KEY(shipping_address_id) REFERENCES Adresses(id),
   FOREIGN KEY(user_id) REFERENCES Utilisatriceurs(id)
);

CREATE TABLE Articles_commandés(
   id SERIAL,
   product_name VARCHAR(200)  NOT NULL,
   product_sku VARCHAR(100) ,
   unit_price_cents INTEGER NOT NULL,
   tax_rate NUMERIC(5,4)   NOT NULL DEFAULT 0.2000,
   quantity INTEGER NOT NULL,
   line_subtotal_cents INTEGER NOT NULL,
   line_tax_cents INTEGER NOT NULL,
   line_total_cents INTEGER NOT NULL,
   created_at TIMESTAMP,
   updated_at TIMESTAMP,
   product_id INTEGER,
   order_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(product_id) REFERENCES Produits(id),
   FOREIGN KEY(order_id) REFERENCES Commande(id)
);

CREATE TABLE Image_produit(
   id SERIAL,
   image_url VARCHAR(500)  NOT NULL,
   alt_text VARCHAR(200) ,
   is_primary BOOLEAN DEFAULT FALSE,
   sort_order INTEGER DEFAULT 0,
   uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   created_at TIMESTAMP,
   updated_at TIMESTAMP,
   uploaded_by INTEGER NOT NULL,
   product_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(uploaded_by) REFERENCES Utilisatriceurs(id),
   FOREIGN KEY(product_id) REFERENCES Produits(id)
);

CREATE TABLE Articles_du_panier(
   id SERIAL,
   quantity INTEGER NOT NULL,
   added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   created_at TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   product_id INTEGER NOT NULL,
   user_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(user_id, product_id),
   FOREIGN KEY(product_id) REFERENCES Produits(id),
   FOREIGN KEY(user_id) REFERENCES Utilisatriceurs(id)
);

CREATE TABLE Catégories_de_produits(
   product_id INTEGER,
   category_id INTEGER,
   is_primary BOOLEAN DEFAULT FALSE,
   sort_order INTEGER DEFAULT 0,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP,
   PRIMARY KEY(product_id, category_id),
   FOREIGN KEY(product_id) REFERENCES Produits(id),
   FOREIGN KEY(category_id) REFERENCES Catégories(id)
);
