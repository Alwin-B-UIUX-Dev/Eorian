import type { LoginDto, RegisterUserDto } from '@/dtos';
import type { IUser } from '@/interfaces';

/**
 * Service d'authentification
 * Gère les strategies de d'authentification
 */
export interface IAuthService {
  /**
   * Création d'un utilisateur
   *
   * @param registerUserDto - Dto contenant les données de l'utilisateur
   *
   * @returns Utilisateur créé
   *
   * @throws {UserError} Si la création échoue
   */
  register(registerUserDto: RegisterUserDto): Promise<IUser>;
  /**
   * Connexion d'un utilisateur
   *
   * @param identifier - Identifiant de l'utilisateur
   * @param password - Mot de passe de l'utilisateur
   *
   * @returns Utilisateur connecté
   *
   * @throws {UserError} si la connexion échoue
   */
  login(loginDto: LoginDto): Promise<IUser>;
  /**
   * Déconnexion d'un utilisateur
   *
   * @param userId - Identifiant de l'utilisateur déconnexion
   *
   * @throws {UserError} si la déconnexion échoue
   */
  logout(userId: string): Promise<void>;
  // refresh(refreshToken: string): Promise<void>;
}
