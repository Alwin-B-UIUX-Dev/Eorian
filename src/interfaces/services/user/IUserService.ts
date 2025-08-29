import type { CreateUserAdminDto } from '@/dtos';
import type { IUser } from '@/interfaces';
import type { IUserData, WithoutSystemFieldsType } from '@/types';

/**
 * Service de gestion des utilisateurs
 * Gère la création, lecture, mise à jour et suppression des utilisateurs
 */
export interface IUserService {
  /**
   * Création d'un utilisateur par un admin
   *
   * @param createUserAdminDto - DTO contenant les données de l'utilisateur
   *
   * @returns Utilisateur créé
   *
   * @throws {UserError} Si la création échoue
   */
  create(createUserAdminDto: CreateUserAdminDto): Promise<IUser>;

  /**
   * Récupération de tous les utilisateurs
   *
   * @param limit - Limite du nombre d'utilisateurs
   * @param offset - Décalage pour la pagination
   *
   * @returns Liste des utilisateurs
   */
  findAll(limit?: number, offset?: number): Promise<IUser[]>;

  /**
   * Récupération d'un utilisateur par son ID
   *
   * @param id - Identifiant de l'utilisateur
   *
   * @returns Utilisateur trouvé ou null
   */
  findOne(id: string): Promise<IUser>;

  /**
   * Mise à jour d'un utilisateur
   *
   * @param id - Identifiant de l'utilisateur
   * @param data - Données à mettre à jour
   *
   * @returns Utilisateur mis à jour
   *
   * @throws {UserError} Si la mise à jour échoue
   */
  update(id: string, data: Partial<WithoutSystemFieldsType<IUserData>>): Promise<IUser>;

  /**
   * Suppression d'un utilisateur
   *
   * @param id - Identifiant de l'utilisateur
   *
   * @throws {UserError} Si la suppression échoue
   */
  remove(id: string): Promise<void>;
}
