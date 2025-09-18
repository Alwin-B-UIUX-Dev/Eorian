// src/interfaces/repositories/user/IUserProfileRepository.ts

import type { IUserProfile } from '@/interfaces/entities/user/IUserProfile';
import type { IBaseRepository } from '@/interfaces/repositories/IBaseRepository';
import type { IUserProfileData } from '@/types/entities/user';

/**
 * Interface pour le repository de gestion des profils utilisateur
 *
 * Hérite des opérations CRUD de base et ajoute des méthodes spécifiques
 * pour la gestion des profils utilisateur.
 */
export interface IUserProfileRepository extends IBaseRepository<IUserProfile, IUserProfileData> {
  // ===================================
  // OPÉRATIONS SPÉCIFIQUES AU PROFIL
  // ===================================

  /**
   * Vérifier si un numéro de téléphone existe déjà
   *
   * @param phone - Numéro de téléphone à vérifier
   * @param excludeUserId - ID utilisateur à exclure de la recherche
   * @returns true si le numéro existe, false sinon
   *
   * @throws {DatabaseError} Si la requête échoue
   */
  phoneExists(phone: string, excludeUserId?: string): Promise<boolean>;

  /**
   * Rechercher un profil par l'ID de l'utilisateur
   *
   * @param userId - ID de l'utilisateur
   * @returns Profil trouvé ou null si inexistant
   *
   * @throws {DatabaseError} Si la requête échoue
   */
  findByUserId(userId: string): Promise<IUserProfile | null>;
}
