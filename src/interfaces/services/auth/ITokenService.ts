// src/interfaces/security/ITokenService.ts

import type { IUser } from '@/interfaces';
import type { IDeviceInfoData } from '@/types';

/**
 * Service de gestion des tokens JWT
 * Gère les stratégies stateless (JWT uniquement) et stateful (JWT + DB)
 */
export interface ITokenService {
  /**
   * Génération d'un access token (stateless)
   *
   * @param user - Utilisateur connecté
   *
   * @returns JWT access token
   *
   * @throws Error si la generation d'un access token échoue
   */
  generateAccessToken(user: IUser): Promise<string>;

  /**
   * Génération d'un refresh token (stateful)
   *
   * @param user - Utilisateur connecté
   *
   * @returns JWT refresh token
   *
   * @throws Error si la generation d'un refresh token échoue
   */
  generateRefreshToken(
    user: IUser,
    deviceInfo?: IDeviceInfoData,
    clientIP?: string
  ): Promise<string>;

  /**
   * Révoque un refresh token (logout)
   *
   * @param refreshToken - Token à révoquer
   *
   * @description
   * - Si token "stateful" : supprime de la DB
   * - Si token "stateless" : operation silencieuse (pas d'erreur)
   *
   * @throws Error si l'opération de révocation échoue
   */
  revokeRefreshToken(refreshToken: string): Promise<void>;

  /**
   * Révoque tous les refresh tokens d'un utilisateur
   *
   * @param userId - Identifiant de l'utilisateur
   *
   * @throws Error si l'opération de révocation échoue
   */
  revokeAllUserRefreshTokens(userId: string): Promise<void>;
}
