import type { Response } from 'express';
/**
 * Interface de gestion des cookies d'authentification
 * Centralise la configuration des cookies JWT
 *
 * @interface ICookieManager
 */
export interface ICookieManager {
  /**
   * Configure les cookies d'authentification (access + refresh)
   *
   * @param res - Response HTTP du client contenant les cookies d'authentification (access + refresh)
   * @param accessToken - JWT access token (15min)
   * @param refreshToken - JWT refresh token (7j)
   *
   * @throws Error si la configuration des cookies d'authentification échoue
   */
  setAuthCookies(res: Response, accessToken?: string, refreshToken?: string): void;
  /**
   * Supprime les cookies d'authentification (access + refresh)
   *
   * @param res - Response HTTP du client contenant les cookies d'authentification (access + refresh)
   *
   * @throws Error si la suppression des cookies d'authentification échoue
   */
  clearAuthCookies(res: Response): void;
}
