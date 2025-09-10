// src/interfaces/repositories/IUserRepository.ts

import type { IUser } from '@/interfaces/entities/user';
import type { IBaseRepository } from '@/interfaces/repositories/IBaseRepository';
import type { IUserData } from '@/types/entities/user';

/**
 * Interface pour le repository de gestion des utilisateurs
 *
 * Hérite des opérations CRUD de base et ajoute des méthodes spécifiques
 * pour l'authentification et la gestion des utilisateurs.
 *
 * ISP : Contrat spécialisé pour les opérations utilisateur
 */
export interface IUserRepository extends IBaseRepository<IUser, IUserData> {
  // ===================================
  // OPÉRATIONS DE VÉRIFICATION EXISTENCE
  // ===================================

  /**
   * Rechercher un utilisateur par son email
   *
   * @param email - Adresse email de l'utilisateur
   * @returns Utilisateur trouvé ou null si inexistant
   *
   * @throws {DatabaseError} Si la requête échoue
   */
  findByEmail(email: string): Promise<IUser | null>;

  /**
   * Rechercher un utilisateur par son nom d'utilisateur
   *
   * @param username - Nom d'utilisateur unique
   * @returns Utilisateur trouvé ou null si inexistant
   *
   * @throws {DatabaseError} Si la requête échoue
   */
  findByUsername(username: string): Promise<IUser | null>;

  // ===================================
  // OPÉRATIONS D'AUTHENTIFICATION
  // ===================================

  /**
   * Rechercher un utilisateur par email ou nom d'utilisateur
   *
   * @param identifier - Email ou nom d'utilisateur
   * @returns Utilisateur trouvé ou null si inexistant
   *
   * @example
   * ```typescript
   * const user = await userRepo.findByEmailOrUsername('john@example.com');
   * const user = await userRepo.findByEmailOrUsername('john_doe');
   * ```
   *
   * @throws {DatabaseError} Si la requête échoue
   */
  findByEmailOrUsername(identifier: string): Promise<IUser | null>;

  // ===================================
  // OPÉRATIONS TECHNIQUES
  // ===================================

  /**
   * Mettre à jour le statut de connexion d'un utilisateur
   *
   * @param userId - Identifiant unique de l'utilisateur
   * @param isConnected - Statut de connexion (true/false)
   * @param lastLoginAt - Date et heure de la dernière connexion
   *
   * @throws {DatabaseError} Si la mise à jour échoue
   */
  updateLoginStatus(userId: string, isConnected: boolean, lastLoginAt: Date): Promise<void>;
}
