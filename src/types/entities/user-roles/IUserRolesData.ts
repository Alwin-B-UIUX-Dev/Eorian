import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface IUserRolesData extends IBaseEntityData {
  role_name: string;
  description: string | null;
}

export type CreateUserRolesData = WithoutSystemFieldsType<IUserRolesData>;
export type UpdateUserRolesData = PartialWithoutSystemFieldsType<IUserRolesData>;
