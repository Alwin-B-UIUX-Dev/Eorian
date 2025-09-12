import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface IUserRoleData extends IBaseEntityData {
  roleName: string;
  description: string;
}

export type CreateUserRoleData = WithoutSystemFieldsType<IUserRoleData>;
export type UpdateUserRoleData = PartialWithoutSystemFieldsType<IUserRoleData>;
