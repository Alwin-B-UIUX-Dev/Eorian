import { z } from 'zod';

export class UserSessionConstants {
  public static readonly ID_SCHEMA = z.string().min(1);
  public static readonly USER_ID_SCHEMA = z.string().min(1);
  public static readonly REFRESH_TOKEN_SCHEMA = z.string().min(1).max(255);
  public static readonly DEVICE_INFO_SCHEMA = z.string().min(1).max(20);
  public static readonly EXPIRES_AT_SCHEMA = z.date().min(1);
  public static readonly IS_ACTIVE_SCHEMA = z.boolean().default(true);

  public static readonly CREATE_USER_SESSIONS_SCHEMA = z.object({
    userId: UserSessionConstants.USER_ID_SCHEMA,
    refreshToken: UserSessionConstants.REFRESH_TOKEN_SCHEMA,
    deviceInfo: UserSessionConstants.DEVICE_INFO_SCHEMA,
    expiresAt: UserSessionConstants.EXPIRES_AT_SCHEMA,
    isActive: UserSessionConstants.IS_ACTIVE_SCHEMA
  });

  public static readonly RESPONSE_USER_SESSIONS_SCHEMA = z.object({
    id: UserSessionConstants.ID_SCHEMA,
    userId: UserSessionConstants.USER_ID_SCHEMA,
    refreshToken: UserSessionConstants.REFRESH_TOKEN_SCHEMA,
    deviceInfo: UserSessionConstants.DEVICE_INFO_SCHEMA,
    expiresAt: UserSessionConstants.EXPIRES_AT_SCHEMA,
    isActive: UserSessionConstants.IS_ACTIVE_SCHEMA
  });

  public static validateCreateUserSession(data: unknown) {
    return UserSessionConstants.CREATE_USER_SESSIONS_SCHEMA.parse(data);
  }

  public static validateResponseUserSession(data: unknown) {
    return UserSessionConstants.RESPONSE_USER_SESSIONS_SCHEMA.parse(data);
  }
}

export type CreateUserSessionSchemaType = z.infer<
  typeof UserSessionConstants.CREATE_USER_SESSIONS_SCHEMA
>;
export type ResponseUserSessionSchemaType = z.infer<
  typeof UserSessionConstants.RESPONSE_USER_SESSIONS_SCHEMA
>;
