// src/entities/User.ts

import { RoleDisplayLabels, RoleEnum } from '@/constants';
import { BaseEntity } from '@/entities/BaseEntity';
import type { IUser } from '@/interfaces';
import type { IUserData } from '@/types';

/**
 * Classe metier User - Entité metier de User
 */
export class User extends BaseEntity implements IUser {
  private email: string;
  private username: string;
  private roleId: string;
  private readonly roleName: string;
  #passwordHash: string;
  private isActive: boolean;
  private isConnected: boolean;
  private emailVerified: boolean;
  private gdprConsent: boolean;
  private gdprConsentDate: Date;
  private lastLoginAt?: Date | undefined;

  constructor(data: IUserData) {
    super(data, 'userId');
    this.email = data.email;
    this.username = data.username;
    this.roleId = data.roleId;
    this.roleName = data.roleName;
    this.#passwordHash = data.passwordHash;
    this.isActive = data.isActive ?? false;
    this.isConnected = data.isConnected ?? false;
    this.emailVerified = data.emailVerified ?? false;
    this.gdprConsent = data.gdprConsent;
    this.gdprConsentDate = data.gdprConsentDate ?? new Date();
    this.lastLoginAt = data.lastLoginAt;
    this.#passwordHash = data.passwordHash;
  }

  // === GETTERS COMPLETS ===
  public getEmail(): string {
    return this.email;
  }
  public getUsername(): string {
    return this.username;
  }
  public getRoleId(): string {
    return this.roleId; // Pour les relations/FK
  }
  public getRoleName(): RoleEnum {
    return this.roleName as RoleEnum; // Pour la logique métier
  }
  public getPasswordHash(): string {
    return this.#passwordHash;
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
  public getLastLoginAt(): Date | undefined {
    return this.lastLoginAt;
  }

  // === SETTERS COMPLETS ===
  public setEmail(email: string): this {
    this.email = email;
    this.updateTimestamp();
    return this;
  }

  public setUsername(username: string): this {
    this.username = username;
    this.updateTimestamp();
    return this;
  }

  public setRoleId(roleId: string): this {
    this.roleId = roleId;
    this.updateTimestamp();
    return this;
  }

  public setPasswordHash(passwordHash: string): this {
    this.#passwordHash = passwordHash;
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
    if (isConnected) {
      this.lastLoginAt = new Date();
    }
    this.updateTimestamp();
    return this;
  }

  public setEmailVerified(emailVerified: boolean): this {
    this.emailVerified = emailVerified;
    this.updateTimestamp();
    return this;
  }

  public setGdprConsent(consent: boolean): this {
    this.gdprConsent = consent;
    this.gdprConsentDate = new Date();
    this.updateTimestamp();
    return this;
  }

  public setGdprConsentDate(date: Date): this {
    this.gdprConsentDate = date;
    this.updateTimestamp();
    return this;
  }

  public setLastLoginAt(date: Date): this {
    this.lastLoginAt = date;
    this.updateTimestamp();
    return this;
  }

  // === MÉTHODES MÉTIER ===
  public canLogin(): boolean {
    return this.isActive && this.emailVerified && this.gdprConsent && !this.isConnected;
  }

  public getTimeSinceLastLogin(): number | null {
    return this.lastLoginAt ? Date.now() - this.lastLoginAt.getTime() : null;
  }

  public isAdmin(): boolean {
    return this.roleId === RoleEnum.ADMIN;
  }

  public isCustomer(): boolean {
    return this.roleId === RoleEnum.CUSTOMER;
  }

  /**
   * Retourne les données formatées pour la réponse API
   * Convertit automatiquement les IDs de rôles en labels d'affichage français
   */
  public toResponseObject(): { id: string; email: string; username: string; role: string } {
    return {
      id: this.id.toString(),
      email: this.email,
      username: this.username,
      role: RoleDisplayLabels[this.roleId]
    };
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      userId: this.id,
      email: this.email,
      username: this.username,
      roleId: this.roleId,
      roleName: this.roleName,
      isActive: this.isActive,
      isConnected: this.isConnected,
      emailVerified: this.emailVerified,
      gdprConsent: this.gdprConsent,
      gdprConsentDate: this.gdprConsentDate,
      lastLoginAt: this.lastLoginAt
    };
  }
}
