import type { IEntity } from '@/interfaces';
import type { IDeviceInfoData } from '@/types';
export interface IUserSession extends IEntity {
  getUserId(): string;
  getRefreshToken(): string;
  getDeviceInfo(): IDeviceInfoData;
  getExpiresAt(): Date;
  getIsActive(): boolean;
  setUserId(userId: string): this;
  setRefreshToken(refreshToken: string): this;
  setDeviceInfo(deviceInfo: IDeviceInfoData): this;
  setExpiresAt(expiresAt: Date): this;
  setIsActive(isActive: boolean): this;
}
