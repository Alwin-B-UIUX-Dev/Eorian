import type { IUserSessions } from '@/interfaces';
import type { IUserSessionsData } from '@/types';
import { BaseEntity } from '../BaseEntity';
export class UserSessions extends BaseEntity implements IUserSessions {
  private userId: number;
  private refreshToken: string;
  private deviceType: string;
  private ipAddress: string;
  private expiresAt: Date;
  private isActive: boolean;
  private revokedAt: Date;

  constructor(data: IUserSessionsData) {
    super(data, 'userSessionId');
    this.userId = data.user_id;
    this.refreshToken = data.refresh_token;
    this.deviceType = data.device_type;
    this.ipAddress = data.ip_address;
    this.expiresAt = data.expires_at;
    this.isActive = data.is_active;
    this.revokedAt = data.revoked_at;
  }

  // === GETTERS ===
  public getUserId(): number {
    return this.userId;
  }

  public getRefreshToken(): string {
    return this.refreshToken;
  }

  public getDeviceType(): string {
    return this.deviceType;
  }

  public getIpAddress(): string {
    return this.ipAddress;
  }

  public getExpiresAt(): Date {
    return this.expiresAt;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getRevokedAt(): Date {
    return this.revokedAt;
  }

  // === SETTERS ===
  public setUserId(userId: number): this {
    this.userId = userId;
    this.updateTimestamp();
    return this;
  }

  public setRefreshToken(refreshToken: string): this {
    this.refreshToken = refreshToken;
    this.updateTimestamp();
    return this;
  }

  public setDeviceType(deviceType: string): this {
    this.deviceType = deviceType;
    this.updateTimestamp();
    return this;
  }

  public setIpAddress(ipAddress: string): this {
    this.ipAddress = ipAddress;
    this.updateTimestamp();
    return this;
  }

  public setExpiresAt(expiresAt: Date): this {
    this.expiresAt = expiresAt;
    this.updateTimestamp();
    return this;
  }

  public setIsActive(isActive: boolean): this {
    this.isActive = isActive;
    this.updateTimestamp();
    return this;
  }

  public setRevokedAt(revokedAt: Date): this {
    this.revokedAt = revokedAt;
    this.updateTimestamp();
    return this;
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      user_id: this.userId,
      refresh_token: this.refreshToken,
      device_type: this.deviceType,
      ip_address: this.ipAddress,
      expires_at: this.expiresAt,
      is_active: this.isActive,
      revoked_at: this.revokedAt
    };
  }
}
