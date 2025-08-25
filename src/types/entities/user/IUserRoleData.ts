// src/interfaces/entities/user/IUserRole.ts

import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

/**
 * Interface pour les rôles utilisateur
 * Mapping avec la table user_roles PostgreSQL
 */
export interface IUserRoleData extends IBaseEntityData {
  roleName: string;
  description: string;
}

export type CreateUserRoleData = WithoutSystemFieldsType<IUserRoleData>;
export type UpdateUserRoleData = PartialWithoutSystemFieldsType<IUserRoleData>;
