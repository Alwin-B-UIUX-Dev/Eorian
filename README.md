# Bookstore API

> API E-commerce Bookstore avec Node.js, Express et TypeScript

## 📋 Table des matières

- [Description](#description)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)
- [Architecture](#architecture)
- [Base de données](#base-de-données)
- [Tests](#tests)
- [Sécurité](#sécurité)
- [Contribution](#contribution)
- [Licence](#licence)

## 🔍 Description

Cette API REST est construite pour gérer une librairie en ligne avec un système d'authentification robuste, de gestion des utilisateurs, des produits et des commandes. L'architecture suit les principes SOLID avec une approche en couches (Repository, Service, Controller).

## ⚡ Prérequis

- **Node.js** >= 22.0.0
- **PostgreSQL** (base de données)
- **npm** ou **yarn**

## 🚀 Installation

1. Clonez le repository :
```bash
git clone <url-du-repo>
cd nom-du-projet
```
2. Installez les dépendances :
npm install
3. Configurez la base de données :
Exécutez les scripts SQL dans database/setup/ et database/views/

## ⚙️ Configuration

Dupliquer le fichier `.env.exemple` à la racine du projet et renommer le `.env.development`

## 📝 Utilisation

### Démarrer le serveur de développement

`npm run dev`

### Démarrer le serveur de production

`npm run build`
`npm start`

## 🛠️ Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance le serveur en mode développement avec auto-reload |
| `npm run build` | Compile le TypeScript en JavaScript |
| `npm start` | Lance le serveur de production |
| `npm run lint` | Formate et corrige le code avec Biome |
| `npm run lint:check` | Vérifie le code sans le modifier |
| `npm run format` | Formate le code avec Biome |
| `npm test` | Validation complète du code |
| `npm run validate` | Lance les tests |
| `npm run test:watch` | Lance les tests en mode watch |
| `npm run test:coverage` | Lance les tests avec couverture de code |


## 🏗️ Structure du projet

```bash
src/
├── app.ts                # Configuration Express
├── server.ts             # Point d'entrée du serveur
├── configs/              # Configuration et singletons
├── constants/            # Constantes et enums
├── controllers/          # Contrôleurs HTTP
├── dtos/                 # Data Transfer Objects
├── entities/             # Entités métier
├── exceptions/           # Gestion d'erreurs personnalisées
├── interfaces/           # Interfaces contrat de méthodes
├── middlewares/          # Middlewares Express
├── repositories/         # Couche d'accès aux données
├── services/             # Logique métier
├── types/                # Types TypeScript
└── utils/                # Utilitaires
```

## 🏛️ Architecture

L'API suit une architecture en couches :

- **Controllers** : Gestion des requêtes HTTP
- **Services** : Logique métier
- **Repositories** : Accès aux données
- **Entities** : Modèles de données

**Patterns utilisés :**

- Singleton (Database, Logger)
- Factory (Services, Errors)
- Repository Pattern
- DTO Pattern

## 🗄️ Base de données

### Configuration PostgreSQL

Les scripts de configuration se trouvent dans `database/setup/` :

- `00_create_bookstore_database.sql` - Création de la base
- `01_create_bookstore_table.sql` - Création des tables

### Vues disponibles

- **Utilisateurs** : profils, adresses, sessions
- **Produits** : catalogue, catégories, images
- **Commandes** : résumés, détails, panier

## 🧪 Tests

### Lancer les tests

```bash
npm test                   # Tests une fois
npm run test:watch         # Mode watch
npm run test:coverage      # Avec couverture
```

### Outils de test

- **Vitest** : Framework de test
- **Supertest** : Tests d'intégration HTTP
- **@vitest/coverage-v8** : Couverture de code

## 🔒 Sécurité

### Fonctionnalités de sécurité

- JWT avec rotation des tokens
- Hachage des mots de passe (Argon2)
- Blacklist des tokens
- Sessions utilisateur
- Helmet pour les headers sécurisés
- CORS configuré
- Sanitization avec DOMPurify

### Authentication Flow

1. Login → JWT + Refresh Token
2. Token stocké en cookie httpOnly
3. Rotation automatique des tokens
4. Blacklist pour la déconnexion

## 🛠️ Outils de développement

- **TypeScript** : Typage statique
- **Biome** : Linting et formatage
- **Husky** : Git hooks
- **Commitlint** : Standardisation des commits
- **Nodemon** : Hot-reload en développement

## 📚 Documentation

La documentation complète se trouve dans le dossier `docs/` :

- Architecture générale
- Diagrammes UML/PlantUML
- Documentation de sécurité

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/amazing-feature`)
3. Commitez vos changements (`git commit -m 'feat: add amazing feature'`)
4. Push sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

### Standards de code

- Utilisez les commits conventionnels
- Respectez la configuration Biome
- Ajoutez des tests pour les nouvelles fonctionnalités

## 📄 Licence

ISC License - voir le fichier LICENSE pour plus de détails.

---

**Développé par Wisepanda.fr**

Pour plus d'informations, consultez la documentation complète.
