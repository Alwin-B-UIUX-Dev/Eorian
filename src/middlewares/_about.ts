/**
 * middlewares/
 * Rôle:                    intergiciels exécutés avant/pendant/après le passage dans les contrôleurs.
 * Fonctionnement:          appliquent des règles transversales (authentification, quotas, logs, validation générique, erreurs).
 * But:                     factoriser la logique commune à plusieurs routes sans dupliquer le code.
 * Bénéfices:               code plus sec (DRY), sécurité et conformité appliquées de manière uniforme.
 */