// src/dtos/auth/LogoutDto.ts

import { AuthConstants, type LogoutSchemaType } from '@/constants/zod/AuthConstants';

/**
 * DTO pour la déconnexion utilisateur
 */
export class LogoutDto {
  public logoutAll: boolean;

  constructor(data: unknown) {
    const validatedData: LogoutSchemaType = AuthConstants.validateLogout(data);

    this.logoutAll = validatedData.logoutAll;
  }

  public getLogoutAll(): boolean {
    return this.logoutAll;
  }

  public isLogoutAllDevices(): boolean {
    return this.logoutAll;
  }

  public getLogoutStrategy(): 'single_device' | 'all_devices' {
    return this.logoutAll ? 'all_devices' : 'single_device';
  }

  /**
   * Informations pour les logs (RGPD compliant)
   */
  public getLogInfo(): object {
    return {
      logoutAll: this.logoutAll,
      strategy: this.getLogoutStrategy(),
      operation: this.logoutAll ? 'logout_all_devices' : 'logout_single_device'
    };
  }
}
