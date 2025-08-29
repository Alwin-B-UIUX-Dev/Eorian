import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface IUserProfilesData extends IBaseEntityData {
  user_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  birth_date: Date;
  avatar_url: string;
}

export type CreateUserProfilesData = WithoutSystemFieldsType<IUserProfilesData>;
export type UpdateUserProfilesData = PartialWithoutSystemFieldsType<IUserProfilesData>;
