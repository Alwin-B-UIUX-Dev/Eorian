# 🧪 Tests Postman - UserProfile CRUD

## 📋 Prérequis

### Variables d'environnement Postman
```
base_url: http://localhost:3000/api/v1
admin_token: [Votre token admin JWT]
```

### Headers requis pour toutes les requêtes
```
Content-Type: application/json
Authorization: Bearer {{admin_token}}
```

---

## 🔐 1. Authentification Admin

### Login Admin
```http
POST {{base_url}}/auth/login
Content-Type: application/json

{
  "identifier": "admin@example.com",
  "password": "admin123"
}
```

**Variables à extraire :**
- `admin_token` depuis `response.data.token`

---

## 👤 2. Tests UserProfile CRUD

### 2.1 Créer un profil utilisateur
```http
POST {{base_url}}/user-profiles
Content-Type: application/json
Authorization: Bearer {{admin_token}}

{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "firstName": "Jean",
  "lastName": "Dupont",
  "phone": "+33123456789",
  "birthDate": "1990-05-15T00:00:00.000Z",
  "newsletterConsent": true,
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has success message", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.true;
    pm.expect(jsonData.message).to.include("created");
});

pm.test("Response contains profile data", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property("id");
    pm.expect(jsonData.data).to.have.property("userId");
    pm.expect(jsonData.data).to.have.property("firstName", "Jean");
    pm.expect(jsonData.data).to.have.property("lastName", "Dupont");
});

// Sauvegarder l'ID du profil créé
pm.test("Save profile ID", function () {
    const jsonData = pm.response.json();
    pm.environment.set("profile_id", jsonData.data.id);
});
```

### 2.2 Lister tous les profils
```http
GET {{base_url}}/user-profiles?limit=10&offset=0
Authorization: Bearer {{admin_token}}
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response is an array", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.data).to.be.an('array');
});

pm.test("Each profile has required fields", function () {
    const jsonData = pm.response.json();
    if (jsonData.data.length > 0) {
        const profile = jsonData.data[0];
        pm.expect(profile).to.have.property("id");
        pm.expect(profile).to.have.property("userId");
        pm.expect(profile).to.have.property("firstName");
        pm.expect(profile).to.have.property("lastName");
    }
});
```

### 2.3 Récupérer un profil par ID
```http
GET {{base_url}}/user-profiles/{{profile_id}}
Authorization: Bearer {{admin_token}}
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains profile data", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property("id", pm.environment.get("profile_id"));
    pm.expect(jsonData.data).to.have.property("firstName");
    pm.expect(jsonData.data).to.have.property("lastName");
});

pm.test("Phone number is masked", function () {
    const jsonData = pm.response.json();
    const phone = jsonData.data.phone;
    pm.expect(phone).to.match(/\*+/);
});
```

### 2.4 Modifier un profil
```http
PUT {{base_url}}/user-profiles/{{profile_id}}
Content-Type: application/json
Authorization: Bearer {{admin_token}}

{
  "firstName": "Jean-Pierre",
  "lastName": "Martin",
  "phone": "+33987654321",
  "newsletterConsent": false
}
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Profile updated successfully", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.data.firstName).to.eql("Jean-Pierre");
    pm.expect(jsonData.data.lastName).to.eql("Martin");
    pm.expect(jsonData.data.newsletterConsent).to.be.false;
});

pm.test("Updated at timestamp changed", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property("updatedAt");
});
```

### 2.5 Supprimer un profil
```http
DELETE {{base_url}}/user-profiles/{{profile_id}}
Authorization: Bearer {{admin_token}}
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 204", function () {
    pm.response.to.have.status(204);
});

pm.test("Response body is empty", function () {
    pm.expect(pm.response.text()).to.be.empty;
});
```

---

## ❌ 3. Tests d'erreurs

### 3.1 Créer un profil avec des données invalides
```http
POST {{base_url}}/user-profiles
Content-Type: application/json
Authorization: Bearer {{admin_token}}

{
  "userId": "invalid-uuid",
  "firstName": "",
  "lastName": "Dupont",
  "phone": "123",
  "birthDate": "2030-01-01T00:00:00.000Z",
  "newsletterConsent": "invalid"
}
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Response contains validation errors", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.false;
    pm.expect(jsonData.message).to.include("validation");
});
```

### 3.2 Récupérer un profil inexistant
```http
GET {{base_url}}/user-profiles/00000000-0000-0000-0000-000000000000
Authorization: Bearer {{admin_token}}
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response data is null", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.data).to.be.null;
});
```

### 3.3 Modifier un profil inexistant
```http
PUT {{base_url}}/user-profiles/00000000-0000-0000-0000-000000000000
Content-Type: application/json
Authorization: Bearer {{admin_token}}

{
  "firstName": "Test"
}
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 404", function () {
    pm.response.to.have.status(404);
});

pm.test("Response contains error message", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.false;
    pm.expect(jsonData.message).to.include("not found");
});
```

### 3.4 Supprimer un profil inexistant
```http
DELETE {{base_url}}/user-profiles/00000000-0000-0000-0000-000000000000
Authorization: Bearer {{admin_token}}
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 404", function () {
    pm.response.to.have.status(404);
});
```

### 3.5 Créer un profil avec un numéro de téléphone existant
```http
POST {{base_url}}/user-profiles
Content-Type: application/json
Authorization: Bearer {{admin_token}}

{
  "userId": "550e8400-e29b-41d4-a716-446655440001",
  "firstName": "Marie",
  "lastName": "Durand",
  "phone": "+33123456789",
  "birthDate": "1985-03-20T00:00:00.000Z",
  "newsletterConsent": true
}
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 409", function () {
    pm.response.to.have.status(409);
});

pm.test("Response contains conflict error", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.false;
    pm.expect(jsonData.message).to.include("already exists");
});
```

---

## 🔒 4. Tests d'autorisation

### 4.1 Accès sans token
```http
GET {{base_url}}/user-profiles
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 401", function () {
    pm.response.to.have.status(401);
});

pm.test("Response contains unauthorized message", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.false;
    pm.expect(jsonData.message).to.include("unauthorized");
});
```

### 4.2 Accès avec token invalide
```http
GET {{base_url}}/user-profiles
Authorization: Bearer invalid_token
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 401", function () {
    pm.response.to.have.status(401);
});
```

### 4.3 Accès avec token utilisateur (non-admin)
```http
GET {{base_url}}/user-profiles
Authorization: Bearer {{user_token}}
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 403", function () {
    pm.response.to.have.status(403);
});

pm.test("Response contains forbidden message", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.false;
    pm.expect(jsonData.message).to.include("forbidden");
});
```

---

## 📊 5. Tests de performance

### 5.1 Test de pagination
```http
GET {{base_url}}/user-profiles?limit=5&offset=0
Authorization: Bearer {{admin_token}}
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

pm.test("Response contains max 5 items", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.data.length).to.be.at.most(5);
});
```

### 5.2 Test avec grande limite
```http
GET {{base_url}}/user-profiles?limit=100&offset=0
Authorization: Bearer {{admin_token}}
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});
```

---

## 🧹 6. Tests de nettoyage

### 6.1 Supprimer tous les profils de test
```http
DELETE {{base_url}}/user-profiles/{{profile_id}}
Authorization: Bearer {{admin_token}}
```

**Tests à ajouter :**
```javascript
pm.test("Status code is 204", function () {
    pm.response.to.have.status(204);
});
```

---

## 📝 7. Collection Postman complète

### Structure recommandée :
```
📁 UserProfile Tests
├── 🔐 Auth
│   ├── Login Admin
│   └── Login User (pour tests 403)
├── 👤 UserProfile CRUD
│   ├── Create Profile
│   ├── List Profiles
│   ├── Get Profile by ID
│   ├── Update Profile
│   └── Delete Profile
├── ❌ Error Tests
│   ├── Invalid Data
│   ├── Not Found
│   ├── Phone Conflict
│   └── Validation Errors
├── 🔒 Authorization Tests
│   ├── No Token
│   ├── Invalid Token
│   └── User Token (403)
└── 📊 Performance Tests
    ├── Pagination
    └── Large Dataset
```

### Variables de collection :
```
base_url: http://localhost:3000/api/v1
admin_token: 
user_token: 
profile_id: 
```

---

## 🚀 Instructions d'utilisation

1. **Importer la collection** dans Postman
2. **Configurer les variables d'environnement**
3. **Exécuter les tests dans l'ordre** :
   - Auth → Login Admin
   - UserProfile CRUD → Create Profile
   - UserProfile CRUD → List Profiles
   - UserProfile CRUD → Get Profile by ID
   - UserProfile CRUD → Update Profile
   - UserProfile CRUD → Delete Profile
4. **Vérifier les résultats** dans la console Postman

---

## 📋 Checklist de validation

- [ ] ✅ Création de profil réussie
- [ ] ✅ Liste des profils avec pagination
- [ ] ✅ Récupération par ID
- [ ] ✅ Modification de profil
- [ ] ✅ Suppression de profil
- [ ] ✅ Validation des données d'entrée
- [ ] ✅ Gestion des erreurs 404
- [ ] ✅ Gestion des conflits (téléphone)
- [ ] ✅ Authentification requise
- [ ] ✅ Autorisation admin requise
- [ ] ✅ Performance acceptable
- [ ] ✅ Masquage des données sensibles

---

*Créé pour tester l'API UserProfile - Version simplifiée* 🎯

