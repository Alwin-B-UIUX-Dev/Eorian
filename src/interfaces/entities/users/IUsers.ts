import type { IEntity } from '@/interfaces';

export interface IUsers extends IEntity {
  // === GETTERS COMPLETS ===
  getUsername(): string;
  getEmail(): string;
  getPasswordHash(): string;
  getRoleId(): number;
  getIsActive(): boolean;
  getIsConnected(): boolean;
  getEmailVerified(): boolean;
  getGdprConsent(): boolean;
  getGdprConsentDate(): Date | null;
  getLastLoginAt(): Date | null;
  // === SETTERS COMPLETS ===
  setUsername(username: string): this;
  setEmail(email: string): this;
  setPasswordHash(passwordHash: string): this;
  setRoleId(roleId: number): this;
  setIsActive(isActive: boolean): this;
  setIsConnected(isConnected: boolean): this;
  setEmailVerified(emailVerified: boolean): this;
  setGdprConsent(gdprConsent: boolean): this;
  setGdprConsentDate(gdprConsentDate: Date | null): this;
  setLastLoginAt(lastLoginAt: Date | null): this;
}
