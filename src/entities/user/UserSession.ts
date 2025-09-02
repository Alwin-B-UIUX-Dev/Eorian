import { BaseEntity } from '@/entities/BaseEntity';
import type { IUserSession } from '@/interfaces';

import type { IDeviceInfoData, IUserSessionData } from '@/types';

export class UserSession extends BaseEntity implements IUserSession {
  private userId: string;
  private refreshToken: string;
  private deviceInfo: IDeviceInfoData;
  private ipAddress: string;
  private expiresAt: Date;
  private isActive: boolean;
  private revokedAt: Date;

  constructor(data: IUserSessionData) {
    super(data, 'userId');
    this.userId = data.userId;
    this.refreshToken = data.refreshToken;
    this.deviceInfo = data.deviceInfo;
    this.ipAddress = data.ipAddress;
    this.expiresAt = data.expiresAt;
    this.isActive = data.isActive;
    this.revokedAt = data.revokedAt;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getRefreshToken(): string {
    return this.refreshToken;
  }

  public getDeviceInfo(): IDeviceInfoData {
    return this.deviceInfo;
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

  public setUserId(userId: string): this {
    this.userId = userId;
    this.updateTimestamp();
    return this;
  }

  public setRefreshToken(refreshToken: string): this {
    this.refreshToken = refreshToken;
    this.updateTimestamp();
    return this;
  }

  public setDeviceInfo(deviceInfo: IDeviceInfoData): this {
    this.deviceInfo = deviceInfo;
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
      userId: this.userId,
      refreshToken: this.refreshToken,
      deviceInfo: this.deviceInfo,
      ipAddress: this.ipAddress,
      expiresAt: this.expiresAt,
      isActive: this.isActive,
      revokedAt: this.revokedAt
    };
  }
}
