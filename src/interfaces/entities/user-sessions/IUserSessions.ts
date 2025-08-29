import type { IEntity } from '@/interfaces';
export interface ICartItems extends IEntity {
  // === GETTERS COMPLETS ===
  getUserId(): number;
  getRefreshToken(): string;
  getDeviceType(): string;
  getIpAddress(): string;
  getExpiresAt(): Date;
  getIsActive(): boolean;
  getRevokedAt(): Date | null;
  // === SETTERS COMPLETS ===
  setUserId(userId: number): this;
  setRefreshToken(refreshToken: string): this;
  setDeviceType(deviceType: string): this;
  setIpAddress(ipAddress: string): this;
  setExpiresAt(expiresAt: Date): this;
  setIsActive(isActive: boolean): this;
  setRevokedAt(revokedAt: Date | null): this;
}
