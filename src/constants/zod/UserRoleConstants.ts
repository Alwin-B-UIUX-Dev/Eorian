import z from 'zod';

export class UserRoleConstants {
  public static readonly ID_SCHEMA = z.string().min(1);
  public static readonly ROLE_NAME = z
    .string()
    .min(1, 'Vous devez entrer un nom pour le role')
    .trim();
  public static readonly DESCRIPTION = z.string().trim();

  public static readonly CREATE_USER_ROLE_SCHEMA = z.object({
    roleName: UserRoleConstants.ROLE_NAME,
    description: UserRoleConstants.DESCRIPTION
  });

  public static readonly RESPONSE_USER_ROLE_SCHEMA = z.object({
    id: UserRoleConstants.ID_SCHEMA,
    roleName: UserRoleConstants.ROLE_NAME,
    description: UserRoleConstants.DESCRIPTION
  });

  public static validateCreateUserRole(data: unknown) {
    return UserRoleConstants.CREATE_USER_ROLE_SCHEMA.parse(data);
  }
  public static validateResponseUserRole(data: unknown) {
    return UserRoleConstants.RESPONSE_USER_ROLE_SCHEMA.parse(data);
  }
}

export type CreateUserRoleSchemaType = z.infer<typeof UserRoleConstants.CREATE_USER_ROLE_SCHEMA>;
export type ResponseUserRoleSchemaType = z.infer<
  typeof UserRoleConstants.RESPONSE_USER_ROLE_SCHEMA
>;
