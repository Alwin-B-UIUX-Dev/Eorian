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
  getGdprConsentDate(): Date;
  getLastLoginAt(): Date;
  // === SETTERS COMPLETS ===
  setUsername(username: string): this;
  setEmail(email: string): this;
  setPasswordHash(passwordHash: string): this;
  setRoleId(roleId: number): this;
  setIsActive(isActive: boolean): this;
  setIsConnected(isConnected: boolean): this;
  setEmailVerified(emailVerified: boolean): this;
  setGdprConsent(gdprConsent: boolean): this;
  setGdprConsentDate(gdprConsentDate: Date): this;
  setLastLoginAt(lastLoginAt: Date): this;
}
