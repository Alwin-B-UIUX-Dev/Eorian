import { z } from 'zod';

const roleNameRegex = /^(?:[a-z][a-z0-9_]*[a-z0-9]|[a-z])$/;

export class UserRoleConstants {
  public static readonly ROLE_NAME = z
    .string()
    .min(3, 'Le nom du rôle doit contenir au moins 3 caractères')
    .max(20, 'Le nom du rôle doit contenir au maximum 20 caractères')
    .regex(roleNameRegex, 'Format invalide: minuscules, chiffres et underscore seulement');

  public static readonly DESCRIPTION = z
    .string()
    .max(255, 'La description doit contenir au maximum 255 caractères')
    .optional();

  public static readonly CREATE_ROLE_SCHEMA = z.object({
    roleName: UserRoleConstants.ROLE_NAME,
    description: UserRoleConstants.DESCRIPTION.optional()
  });

  public static readonly UPDATE_ROLE_SCHEMA = z
    .object({
      roleName: UserRoleConstants.ROLE_NAME.optional(),
      description: UserRoleConstants.DESCRIPTION
    })
    .refine(obj => Object.keys(obj).length > 0, {
      message: 'Aucune donnée fournie pour la mise à jour'
    });

  public static validateCreateRole(data: unknown): CreateUserRoleSchemaType {
    return UserRoleConstants.CREATE_ROLE_SCHEMA.parse(data);
  }

  public static validateUpdateRole(data: unknown): UpdateUserRoleSchemaType {
    return UserRoleConstants.UPDATE_ROLE_SCHEMA.parse(data);
  }
}

export type CreateUserRoleSchemaType = z.infer<typeof UserRoleConstants.CREATE_ROLE_SCHEMA>;
export type UpdateUserRoleSchemaType = z.infer<typeof UserRoleConstants.UPDATE_ROLE_SCHEMA>;
