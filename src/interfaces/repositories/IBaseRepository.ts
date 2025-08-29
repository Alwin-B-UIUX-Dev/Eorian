// src/interfaces/repositories/IBaseRepository.ts
import type { IEntity } from '@/interfaces';

/**
 * Interface pour le repository de base de gestion des entités
 *
 * Opérations CRUD (Create, Read, Update, Delete) pour toutes les entités.
 * Le CRUD représente 90% des requêtes HTTP REST
 *
 * ISP : Contrat générique pour wrapper les controllers
 */
export interface IBaseRepository<T extends IEntity, TData = unknown> {
  /**
   * Créer une nouvelle entité dans la base de données
   *
   * @param data - Données de l'entité à créer
   * @returns Entité nouvellement créée
   *
   * @throws {DatabaseError} Si la requête échoue
   */
  create(data: Omit<TData, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;

  /**
   * Rechercher une entité par son ID
   *
   * @param id - Identifiant unique de l'entité
   * @returns Entité trouvée ou null si inexistante
   *
   * @throws {DatabaseError} Si la requête échoue
   */
  findById(id: string): Promise<T>;

  /**
   * Récupérer toutes les entités avec pagination
   *
   * @param limit - Nombre maximum d'entités à retourner (défaut: toutes)
   * @param offset - Nombre d'entités à ignorer depuis le début (défaut: 0)
   * @returns Liste paginée des entités
   *
   * @example
   * ```typescript
   * // Page 1 : 10 premières entités
   * const entities = await repo.findAll(10, 0);
   *
   * // Page 2 : entités 11-20
   * const entities = await repo.findAll(10, 10);
   * ```
   *
   * @throws {DatabaseError} Si la requête échoue
   */
  findAll(limit?: number, offset?: number): Promise<T[]>;

  /**
   * Mettre à jour une entité
   *
   * @param id - Identifiant de l'entité à modifier
   * @param data - Données partielles pour la mise à jour
   * @returns Entité mise à jour
   *
   * @throws {DatabaseError} Si la requête échoue
   */
  update(id: string, data: Partial<TData>): Promise<T>;

  /**
   * Supprimer une entité
   *
   * @param id - Identifiant de l'entité à supprimer
   * @returns true si supprimée, false sinon
   *
   * @throws {DatabaseError} Si la requête échoue
   */
  delete(id: string): Promise<boolean>;
}
