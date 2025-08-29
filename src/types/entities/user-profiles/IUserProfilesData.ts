import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface IUserProfilesData extends IBaseEntityData {
  user_id: number;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  birth_date: Date | null;
  avatar_url: string | null;
}

export type CreateUserProfilesData = WithoutSystemFieldsType<IUserProfilesData>;
export type UpdateUserProfilesData = PartialWithoutSystemFieldsType<IUserProfilesData>;
