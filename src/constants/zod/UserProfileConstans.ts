import { z } from 'zod';

export class UserProfileConstants {
  public static readonly ID_SCHEMA = z.string().min(1);
  public static readonly USER_ID_SCHEMA = z.string().min(1);
  public static readonly FIRST_NAME_SCHEMA = z.string().max(100);
  public static readonly LAST_NAME_SCHEMA = z.string().max(100);
  public static readonly PHONE_SCHEMA = z.string().max(20);
  public static readonly BIRTH_DATE_SCHEMA = z.date();
  public static readonly AVATAR_URL_SCHEMA = z.string().max(500);

  public static readonly CREATE_USER_PROFILES_SCHEMA = z.object({
    userId: UserProfileConstants.USER_ID_SCHEMA,
    firstName: UserProfileConstants.FIRST_NAME_SCHEMA,
    lastName: UserProfileConstants.LAST_NAME_SCHEMA,
    phone: UserProfileConstants.PHONE_SCHEMA,
    birthDate: UserProfileConstants.BIRTH_DATE_SCHEMA,
    avatarUrl: UserProfileConstants.AVATAR_URL_SCHEMA
  });

  public static readonly RESPONSE_USER_PROFILES_SCHEMA = z.object({
    id: UserProfileConstants.ID_SCHEMA,
    userId: UserProfileConstants.USER_ID_SCHEMA,
    firstName: UserProfileConstants.FIRST_NAME_SCHEMA,
    lastName: UserProfileConstants.LAST_NAME_SCHEMA,
    phone: UserProfileConstants.PHONE_SCHEMA,
    birthDate: UserProfileConstants.BIRTH_DATE_SCHEMA,
    avatarUrl: UserProfileConstants.AVATAR_URL_SCHEMA
  });

  public static validateCreateUserProfile(data: unknown) {
    return UserProfileConstants.CREATE_USER_PROFILES_SCHEMA.parse(data);
  }

  public static validateResponseUserProfile(data: unknown) {
    return UserProfileConstants.RESPONSE_USER_PROFILES_SCHEMA.parse(data);
  }
}

export type CreateUserProfileSchemaType = z.infer<
  typeof UserProfileConstants.CREATE_USER_PROFILES_SCHEMA
>;
export type ResponseUserProfileSchemaType = z.infer<
  typeof UserProfileConstants.RESPONSE_USER_PROFILES_SCHEMA
>;
