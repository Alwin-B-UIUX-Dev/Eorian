import { errors, jwtVerify, SignJWT } from 'jose';
import { TokenError } from '@/exceptions';
import type { ITokenManager } from '@/interfaces';
import type { ITokenPayloadData } from '@/types';

export class TokenManager implements ITokenManager {
  readonly #secret: Uint8Array;
  private readonly accessTokenExpiresIn: string;
  private readonly refreshTokenExpiresIn: string;
  private readonly issuer: string;
  private readonly audience: string;

  constructor(secret?: string) {
    const secretToUse: string = secret ?? process.env.JWT_SECRET ?? 'test-secret';

    if (!secretToUse || secretToUse.trim().length === 0) {
      throw TokenError.invalidSecret().log();
    }
    this.#secret = new TextEncoder().encode(secretToUse);

    this.accessTokenExpiresIn = process.env.JWT_EXPIRES_IN ?? '15m';
    this.refreshTokenExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN ?? '7d';

    this.issuer = process.env.JWT_ISSUER ?? 'bookstore-api-dev';
    this.audience = process.env.JWT_AUDIENCE ?? 'bookstore-users-dev';
  }

  public async generateAccessToken(payload: ITokenPayloadData): Promise<string> {
    if (!payload || typeof payload !== 'object') {
      throw TokenError.invalidPayload().log();
    }
    try {
      const token: string = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setJti(crypto.randomUUID())
        .setIssuedAt()
        .setExpirationTime(this.accessTokenExpiresIn)
        .setIssuer(this.issuer)
        .setAudience(this.audience)
        .sign(this.#secret);

      return token;
    } catch (error) {
      throw TokenError.generation(error instanceof Error ? error.message : undefined).log();
    }
  }

  public async generateRefreshToken(payload: ITokenPayloadData): Promise<string> {
    if (!payload || typeof payload !== 'object') {
      throw TokenError.invalidPayload().log();
    }

    // 🔍 DEBUG À AJOUTER
    console.log('🔍 REFRESH TOKEN - payload:', payload);
    console.log('🔍 REFRESH TOKEN - secret exists:', !!this.#secret);
    console.log('🔍 REFRESH TOKEN - secret length:', this.#secret?.length);
    console.log('🔍 REFRESH TOKEN - expire time:', this.refreshTokenExpiresIn);
    try {
      const token: string = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setJti(crypto.randomUUID())
        .setIssuedAt()
        .setExpirationTime(this.refreshTokenExpiresIn)
        .setIssuer(this.issuer)
        .setAudience(this.audience)
        .sign(this.#secret);

      return token;
    } catch (error) {
      // 🚨 DEBUG L'ERREUR RÉELLE
      console.error('🚨 REFRESH TOKEN ERROR:', error);
      console.error('🔍 Error message:', error instanceof Error ? error.message : 'Unknown');
      throw TokenError.generation(error instanceof Error ? error.message : undefined).log();
    }
  }

  public async verifyToken(token: string): Promise<ITokenPayloadData> {
    if (!token || typeof token !== 'string') {
      throw TokenError.invalidFormat().log();
    }
    try {
      const { payload }: { payload: ITokenPayloadData } = await jwtVerify(token, this.#secret, {
        issuer: this.issuer,
        audience: this.audience
      });

      return payload;
    } catch (error: unknown) {
      if (error instanceof TokenError) {
        throw error;
      }
      if (error instanceof errors.JWTExpired) {
        throw TokenError.expired().log();
      }
      if (error instanceof errors.JWTInvalid) {
        throw TokenError.invalid().log();
      }
      if (error instanceof errors.JWTClaimValidationFailed) {
        throw TokenError.invalid().log();
      }
      if (error instanceof Error) {
        throw TokenError.verification(error.message).log();
      }
      throw TokenError.verification().log();
    }
  }
}
