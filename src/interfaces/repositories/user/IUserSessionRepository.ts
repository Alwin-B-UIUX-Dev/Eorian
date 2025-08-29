import type { IDeviceInfoData, IUserSessionData } from '@/types';

export interface IUserSessionRepository {
  createSession(
    userId: string,
    refreshToken: string,
    deviceInfo?: IDeviceInfoData,
    ipAddress?: string
  ): Promise<void>;
  findValidSessionByToken(refreshToken: string): Promise<IUserSessionData>;

  revokeSession(refreshToken: string): Promise<void>;
  revokeAllUserSessions(userId: string): Promise<void>;
  cleanExpiredSessions(): Promise<void>;
}
