// src/utils/CookieManager.ts

import type { Response } from 'express';
import { decodeJwt } from 'jose';
import { logger } from '@/configs';
import type { ICookieManager } from '@/interfaces';

/**
 * Service de gestion des cookies d'authentification
 * Centralise la configuration sécurisée des cookies JWT
 */
export class CookieManager implements ICookieManager {
  private readonly logger = logger;
  private readonly isProduction: boolean = process.env.NODE_ENV === 'production';

  // ===== CONSTANTES DE CONFIGURATION =====
  private readonly COOKIE_CONFIG = {
    ACCESS_TOKEN: {
      name: 'accessToken'
    },
    REFRESH_TOKEN: {
      name: 'refreshToken'
    },
    OPTIONS: {
      httpOnly: true,
      secure: this.isProduction, // ✅ Cohérent avec isProduction
      sameSite: this.isProduction ? 'none' : ('lax' as const), // ✅ Cohérent
      path: '/'
    }
  } as const;

  private getJWTExpiration(token: string): Date | undefined {
    try {
      const payload = decodeJwt(token);
      return payload.exp ? new Date(payload.exp * 1000) : undefined;
    } catch {
      return undefined; // Si le token est malformé
    }
  }

  /**
   * Configure les cookies d'authentification
   * 🎯 NOUVEAU : Gère "AccessToken OU RefreshToken" (jamais les 2)
   */
  public setAuthCookies(res: Response, accessToken?: string, refreshToken?: string): void {
    try {
      // 🛡️ VALIDATION : Pas les 2 à la fois
      if (accessToken && refreshToken) {
        this.logger.warn('Both tokens provided - should be exclusive', {
          operation: 'set_auth_cookies_warning'
        });
      }

      const sessionType = refreshToken ? 'stateful' : 'stateless';

      this.logger.debug('Setting auth cookies', {
        operation: 'set_auth_cookies',
        secure: this.isProduction,
        sessionType,
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken
      });

      // 🍪 ACCESS TOKEN (session stateless - 15min)
      if (accessToken) {
        const accessExpires = this.getJWTExpiration(accessToken);
        res.cookie(this.COOKIE_CONFIG.ACCESS_TOKEN.name, accessToken, {
          ...this.COOKIE_CONFIG.OPTIONS,
          expires: accessExpires // Synchronisé avec JWT (15min)
        });

        // 🧹 NETTOYER le refreshToken cookie si il existe
        this.clearRefreshTokenCookie(res);
      }

      // 🍪 REFRESH TOKEN (session stateful - 7j)
      if (refreshToken) {
        const refreshExpires = this.getJWTExpiration(refreshToken);
        res.cookie(this.COOKIE_CONFIG.REFRESH_TOKEN.name, refreshToken, {
          ...this.COOKIE_CONFIG.OPTIONS,
          expires: refreshExpires // Synchronisé avec JWT (7j)
        });

        // 🧹 NETTOYER l'accessToken cookie si il existe
        this.clearAccessTokenCookie(res);
      }
    } catch (error) {
      this.logger.error('Failed to set auth cookies', {
        operation: 'set_auth_cookies_failed',
        error: error instanceof Error ? error.message : 'unknown'
      });
      throw error;
    }
  }

  /**
   * Supprime tous les cookies d'authentification (logout)
   */
  public clearAuthCookies(res: Response): void {
    try {
      this.logger.debug('Clearing auth cookies', {
        operation: 'clear_auth_cookies'
      });

      this.clearAccessTokenCookie(res);
      this.clearRefreshTokenCookie(res);
    } catch (error) {
      this.logger.error('Failed to clear auth cookies', {
        operation: 'clear_auth_cookies_failed',
        error: error instanceof Error ? error.message : 'unknown'
      });
      throw error;
    }
  }

  // ===== MÉTHODES PRIVÉES DE NETTOYAGE =====

  /**
   * Supprime uniquement le cookie accessToken
   */
  private clearAccessTokenCookie(res: Response): void {
    res.clearCookie(this.COOKIE_CONFIG.ACCESS_TOKEN.name, {
      path: this.COOKIE_CONFIG.OPTIONS.path,
      httpOnly: this.COOKIE_CONFIG.OPTIONS.httpOnly,
      secure: this.COOKIE_CONFIG.OPTIONS.secure,
      sameSite: this.COOKIE_CONFIG.OPTIONS.sameSite
    });
  }

  /**
   * Supprime uniquement le cookie refreshToken
   */
  private clearRefreshTokenCookie(res: Response): void {
    res.clearCookie(this.COOKIE_CONFIG.REFRESH_TOKEN.name, {
      path: this.COOKIE_CONFIG.OPTIONS.path,
      httpOnly: this.COOKIE_CONFIG.OPTIONS.httpOnly,
      secure: this.COOKIE_CONFIG.OPTIONS.secure,
      sameSite: this.COOKIE_CONFIG.OPTIONS.sameSite
    });
  }
}
