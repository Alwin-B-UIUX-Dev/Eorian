import type { IEntity } from '@/interfaces';
import type { IDeviceInfoData } from '@/types';
export interface IUserSession extends IEntity {
  getUserId(): string;
  getRefreshToken(): string;
  getDeviceInfo(): IDeviceInfoData;
  getIpAddress(): string;
  getExpiresAt(): Date;
  getIsActive(): boolean;
  getRevokedAt(): Date;
  setUserId(userId: string): this;
  setRefreshToken(refreshToken: string): this;
  setDeviceInfo(deviceInfo: IDeviceInfoData): this;
  setIpAddress(ipAddress: string): this;
  setExpiresAt(expiresAt: Date): this;
  setIsActive(isActive: boolean): this;
  setRevokedAt(revokedAt: Date): this;
}
