import { type ResponseUserSessionSchemaType, UserSessionConstants } from '@/constants';
import type { IUserSession } from '@/interfaces';

export class ResponseUserSessionDto {
  static fromUserSession(UserSession: IUserSession): ResponseUserSessionDto {
    throw new Error('Method not implemented.');
  }
  public readonly id: string;
  public readonly userId: string;
  public readonly deviceInfo: string;
  public readonly expiresAt: Date;
  public readonly isActive: boolean;

  constructor(data: unknown) {
    const validated: ResponseUserSessionSchemaType =
      UserSessionConstants.validateResponseUserSession(data);
    this.id = validated.id;
    this.userId = validated.userId;
    this.deviceInfo = validated.deviceInfo;
    this.expiresAt = validated.expiresAt;
    this.isActive = validated.isActive;
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getUserId(): string {
    return this.userId;
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

  public static from(userSession: IUserSession): ResponseUserSessionDto {
    return new ResponseUserSessionDto({
      id: userSession.getId(),
      userId: userSession.getUserId(),
      deviceInfo: userSession.getDeviceInfo(),
      expiresAt: userSession.getExpiresAt(),
      isActive: userSession.getIsActive()
    });
  }
}
