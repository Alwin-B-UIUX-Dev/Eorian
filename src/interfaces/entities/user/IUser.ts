import type { IEntity } from '@/interfaces';

export interface IUser extends IEntity {
  // === GETTERS COMPLETS ===
  getEmail(): string;
  getUsername(): string;
  getRoleId(): string;
  getRoleName(): string;
  getPasswordHash(): string;
  getIsActive(): boolean;
  getIsConnected(): boolean;
  getEmailVerified(): boolean;
  getGdprConsent(): boolean;
  getGdprConsentDate(): Date;
  getLastLoginAt(): Date | undefined;
  // === SETTERS COMPLETS ===
  setEmail(email: string): this;
  setUsername(username: string): this;
  setRoleId(roleId: string): this;
  setPasswordHash(passwordHash: string): this;
  setIsActive(isActive: boolean): this;
  setIsConnected(isConnected: boolean): this;
  setEmailVerified(emailVerified: boolean): this;
  setGdprConsent(gdprConsent: boolean): this;
  setGdprConsentDate(gdprConsentDate: Date): this;
  setLastLoginAt(lastLoginAt: Date | undefined): this;
  // === MÉTHODES MÉTIER ===
  canLogin(): boolean;
  getTimeSinceLastLogin(): number | null;
  isAdmin(): boolean;
  isCustomer(): boolean;
}
