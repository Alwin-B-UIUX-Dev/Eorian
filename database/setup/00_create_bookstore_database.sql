-- Active: 1753172326626@@127.0.0.1@5432@postgres
-- =====================================================
-- E-COMMERCE DATABASE - PostgreSQL 17 - VERSION COMPLÈTE
-- Version KISS : Simple, Fonctionnelle, Évolutive avec RLS et VUES
-- PRINCIPE : Séparation claire des responsabilités
-- - USERS : Authentification pure (customers + admins)
-- - USER_PROFILES : Données personnelles étendues
-- - ADMIN crée et gère les PRODUCTS
-- - CUSTOMERS naviguent et achètent
-- =====================================================

-- D'ABORD supprimer la base de données si elle existait déjà
-- DROP DATABASE IF EXISTS bookstore_fr_db;

-- ENSUITE supprimer tous les objets possédés par les rôles, si ils existent
DROP OWNED BY admin_bookstore;

DROP OWNED BY customer_bookstore;

DROP OWNED BY api_service_bookstore;

-- PUIS supprimer les rôles si ils existent
DROP ROLE IF EXISTS admin_bookstore;

DROP ROLE IF EXISTS customer_bookstore;

DROP ROLE IF EXISTS api_service_bookstore;

-- ENFIN créer la base de données
CREATE DATABASE bookstore_fr_db
WITH
    ENCODING 'UTF8' LC_COLLATE = 'fr_FR.UTF-8' LC_CTYPE = 'fr_FR.UTF-8' TEMPLATE template0;

-- \c bookstore_fr_db; commande à réaliser en ligne de commande pour accéder à la base de données créée
