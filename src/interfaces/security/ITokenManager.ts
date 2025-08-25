import type { ITokenPayloadData } from '@/types/security';

export interface ITokenManager {
  generateAccessToken(payload: ITokenPayloadData): Promise<string>;
  generateRefreshToken(payload: ITokenPayloadData): Promise<string>;
  verifyToken(token: string): Promise<ITokenPayloadData>;
}
