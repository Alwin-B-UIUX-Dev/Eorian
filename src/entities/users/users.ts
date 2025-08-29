import type { IUsers } from '@/interfaces';
import type { IUsersData } from '@/types';
import { BaseEntity } from '../BaseEntity';
export class Users extends BaseEntity implements IUsers {
  private username: string;
  private email: string;
  private passwordHash: string;
  private roleId: number;
  private isActive: boolean;
  private isConnected: boolean;
  private emailVerified: boolean;
  private gdprConsent: boolean;
  private gdprConsentDate: Date;
  private lastLoginAt: Date;

  constructor(data: IUsersData) {
    super(data, 'userId');
    this.username = data.username;
    this.email = data.email;
    this.passwordHash = data.password_hash;
    this.roleId = data.role_id;
    this.isActive = data.is_active;
    this.isConnected = data.is_connected;
    this.emailVerified = data.email_verified;
    this.gdprConsent = data.gdpr_consent;
    this.gdprConsentDate = data.gdpr_consent_date;
    this.lastLoginAt = data.last_login_at;
  }

  // === GETTERS ===
  public getUsername(): string {
    return this.username;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPasswordHash(): string {
    return this.passwordHash;
  }

  public getRoleId(): number {
    return this.roleId;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getIsConnected(): boolean {
    return this.isConnected;
  }

  public getEmailVerified(): boolean {
    return this.emailVerified;
  }

  public getGdprConsent(): boolean {
    return this.gdprConsent;
  }

  public getGdprConsentDate(): Date {
    return this.gdprConsentDate;
  }

  public getLastLoginAt(): Date {
    return this.lastLoginAt;
  }

  // === SETTERS ===
  public setUsername(username: string): this {
    this.username = username;
    this.updateTimestamp();
    return this;
  }

  public setEmail(email: string): this {
    this.email = email;
    this.updateTimestamp();
    return this;
  }

  public setPasswordHash(passwordHash: string): this {
    this.passwordHash = passwordHash;
    this.updateTimestamp();
    return this;
  }

  public setRoleId(roleId: number): this {
    this.roleId = roleId;
    this.updateTimestamp();
    return this;
  }

  public setIsActive(isActive: boolean): this {
    this.isActive = isActive;
    this.updateTimestamp();
    return this;
  }

  public setIsConnected(isConnected: boolean): this {
    this.isConnected = isConnected;
    this.updateTimestamp();
    return this;
  }

  public setEmailVerified(emailVerified: boolean): this {
    this.emailVerified = emailVerified;
    this.updateTimestamp();
    return this;
  }

  public setGdprConsent(gdprConsent: boolean): this {
    this.gdprConsent = gdprConsent;
    this.updateTimestamp();
    return this;
  }

  public setGdprConsentDate(gdprConsentDate: Date): this {
    this.gdprConsentDate = gdprConsentDate;
    this.updateTimestamp();
    return this;
  }

  public setLastLoginAt(lastLoginAt: Date): this {
    this.lastLoginAt = lastLoginAt;
    this.updateTimestamp();
    return this;
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      username: this.username,
      email: this.email,
      password_hash: this.passwordHash,
      role_id: this.roleId,
      is_active: this.isActive,
      is_connected: this.isConnected,
      email_verified: this.emailVerified,
      gdpr_consent: this.gdprConsent,
      gdpr_consent_date: this.gdprConsentDate,
      last_login_at: this.lastLoginAt
    };
  }
}
