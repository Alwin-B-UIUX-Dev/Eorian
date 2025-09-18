# Eorian E-commerce API

> API E-commerce avec Node.js, Express et TypeScript


## 🔍 Description

Cette API REST est construite pour gérer un E coomerce en ligne avec un système d'authentification robuste, de gestion des utilisateurs, des produits et des commandes. L'architecture suit les principes SOLID avec une approche en couches (Repository, Service, Controller).

## ⚡ Prérequis

- **Node.js** >= 22.0.0
- **PostgreSQL** (base de données)
- **npm**

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
- **Commitlint** : Standardisation des commits
- **Nodemon** : Hot-reload en développement

## 📄 Licence

ISC License - voir le fichier LICENSE pour plus de détails.
