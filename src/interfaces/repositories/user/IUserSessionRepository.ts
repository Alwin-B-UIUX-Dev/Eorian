import type { IDeviceInfoData, IUserSessionData } from '@/types';

export interface IUserSessionRepository {
  createSession(
    userId: string,
    refreshToken: string,
    deviceInfo?: IDeviceInfoData,
    ipAddress?: string
  ): Promise<void>;
  findValidSessionByToken(refreshToken: string): Promise<IUserSessionData | null>;

  revokeSession(refreshToken: string): Promise<void>;
  revokeAllUserSession(userId: string): Promise<void>;
  cleanExpiredSessions(): Promise<void>;
}
