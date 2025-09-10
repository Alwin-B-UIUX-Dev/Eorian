import { type CreateUserSessionSchemaType, UserSessionConstants } from '@/constants';

export class CreateUserSessionDto {
  public readonly userId: string;
  public readonly refreshToken: string;
  public readonly deviceInfo: string;
  public readonly expiresAt: Date;
  public readonly isActive: boolean;

  constructor(data: unknown) {
    const validated: CreateUserSessionSchemaType =
      UserSessionConstants.validateCreateUserSession(data);
    this.userId = validated.userId;
    this.refreshToken = validated.refreshToken;
    this.deviceInfo = validated.deviceInfo;
    this.expiresAt = validated.expiresAt;
    this.isActive = validated.isActive;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getRefreshToken(): string {
    return this.refreshToken;
  }

  public getDeviceInfo(): string {
    return this.deviceInfo;
  }

  public getExpiresAt(): Date {
    return this.expiresAt;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }
}
