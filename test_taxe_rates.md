# Test du CRUD TaxeRates

## Endpoints disponibles

### 1. Lister tous les taux de taxe
```
GET /api/v1/tax-rates
```

### 2. Récupérer un taux de taxe par ID
```
GET /api/v1/tax-rates/:id
```

### 3. Créer un nouveau taux de taxe
```
POST /api/v1/tax-rates
Content-Type: application/json

{
  "name": "TVA Intermédiaire",
  "rate": 0.15,
  "description": "Taux intermédiaire 15%",
  "isActive": true
}
```

### 4. Mettre à jour un taux de taxe
```
PUT /api/v1/tax-rates/:id
Content-Type: application/json

{
  "name": "TVA Intermédiaire Modifiée",
  "rate": 0.16,
  "description": "Taux intermédiaire modifié 16%",
  "isActive": false
}
```

### 5. Supprimer un taux de taxe
```
DELETE /api/v1/tax-rates/:id
```

## Exemples de données

### Création d'un taux de taxe
```json
{
  "name": "TVA Export",
  "rate": 0.0,
  "description": "Taux zéro pour les exportations",
  "isActive": true
}
```

### Mise à jour partielle
```json
{
  "isActive": false
}
```

## Validation

- `name`: requis, 3-50 caractères
- `rate`: requis, entre 0 et 1 (0% à 100%)
- `description`: optionnel, max 255 caractères
- `isActive`: optionnel, boolean, défaut true

## Réponses

### Succès (201 - Création)
```json
{
  "success": true,
  "message": "Taxe rate created",
  "data": {
    "taxeRateId": "1",
    "name": "TVA Standard",
    "rate": 0.2,
    "description": "Taux normal 20%",
    "isActive": true,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

### Succès (200 - Mise à jour)
```json
{
  "success": true,
  "message": "Taxe rate updated",
  "data": {
    "taxeRateId": "1",
    "name": "TVA Standard Modifiée",
    "rate": 0.21,
    "description": "Taux normal modifié 21%",
    "isActive": true,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T11:00:00.000Z"
  }
}
```

### Erreur (400 - Validation)
```json
{
  "success": false,
  "message": "La valeur du taux ne peut pas dépasser 1 (100%)",
  "error": "400"
}
```

### Erreur (409 - Conflit)
```json
{
  "success": false,
  "message": "Resource already exists: tax_rate with name 'TVA Standard'",
  "error": "409"
}
```
