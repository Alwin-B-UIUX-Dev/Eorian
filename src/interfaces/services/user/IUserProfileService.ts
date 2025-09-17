// src/interfaces/services/user/IUserProfileService.ts

import type { IUser } from '@/interfaces/entities/user/IUser';
import type { IUserProfile } from '@/interfaces/entities/user/IUserProfile';
import type { WithoutSystemFieldsType } from '@/types/entities/BaseType';
import type { IUserProfileData } from '@/types/entities/user';

/**
 * Service de gestion des profils utilisateur
 * Gère la création, lecture, mise à jour et suppression des profils utilisateur
 */
export interface IUserProfileService {
  /**
   * Création d'un profil utilisateur
   *
   * @param userId - ID de l'utilisateur
   * @param profileData - Données du profil
   *
   * @returns Profil créé
   *
   * @throws {UserError} Si la création échoue
   */
  create(
    userId: string,
    profileData: {
      firstName: string;
      lastName: string;
      phone: string;
      birthDate: Date;
      avatarUrl?: string;
    }
  ): Promise<IUserProfile>;

  /**
   * Récupération de tous les profils
   *
   * @param limit - Limite du nombre de profils
   * @param offset - Décalage pour la pagination
   *
   * @returns Liste des profils
   */
  findAll(limit?: number, offset?: number): Promise<IUserProfile[]>;

  /**
   * Récupération d'un profil par son ID
   *
   * @param id - Identifiant du profil
   *
   * @returns Profil trouvé ou null
   */
  findOne(id: string): Promise<IUserProfile | null>;

  /**
   * Mise à jour d'un profil
   *
   * @param id - Identifiant du profil
   * @param data - Données à mettre à jour
   *
   * @returns Profil mis à jour
   *
   * @throws {UserError} Si la mise à jour échoue
   */
  update(
    id: string,
    data: Partial<WithoutSystemFieldsType<IUserProfileData>>
  ): Promise<IUserProfile>;

  /**
   * Suppression d'un profil
   *
   * @param id - Identifiant du profil
   *
   * @throws {UserError} Si la suppression échoue
   */
  remove(id: string): Promise<void>;

  // ===================================
  // GESTION DU COMPTE UTILISATEUR
  // ===================================

  /**
   * Changement d'email d'un utilisateur
   *
   * @param userId - ID de l'utilisateur
   * @param newEmail - Nouvel email
   * @param currentPassword - Mot de passe actuel pour vérification
   *
   * @returns Utilisateur mis à jour
   *
   * @throws {UserError} Si le changement échoue
   */
  changeEmail(userId: string, newEmail: string, currentPassword: string): Promise<IUser>;

  /**
   * Changement de mot de passe d'un utilisateur
   *
   * @param userId - ID de l'utilisateur
   * @param currentPassword - Mot de passe actuel
   * @param newPassword - Nouveau mot de passe
   *
   * @returns Utilisateur mis à jour
   *
   * @throws {UserError} Si le changement échoue
   */
  changePassword(userId: string, currentPassword: string, newPassword: string): Promise<IUser>;

  /**
   * Changement de nom d'utilisateur
   *
   * @param userId - ID de l'utilisateur
   * @param newUsername - Nouveau nom d'utilisateur
   * @param currentPassword - Mot de passe actuel pour vérification
   *
   * @returns Utilisateur mis à jour
   *
   * @throws {UserError} Si le changement échoue
   */
  changeUsername(userId: string, newUsername: string, currentPassword: string): Promise<IUser>;

  /**
   * Suppression du compte utilisateur
   *
   * @param userId - ID de l'utilisateur
   * @param password - Mot de passe pour vérification
   *
   * @throws {UserError} Si la suppression échoue
   */
  deleteAccount(userId: string, password: string): Promise<void>;
}
