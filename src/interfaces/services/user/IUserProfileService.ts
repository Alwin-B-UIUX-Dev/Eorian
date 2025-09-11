import type { CreateUserProfileDto } from '@/dtos';
import type { IBaseService, IUserProfile } from '@/interfaces';
import type { IUserProfileData } from '@/types';

export interface IUserProfileService extends IBaseService<IUserProfile, IUserProfileData> {
  create(createUserAdminDto: CreateUserProfileDto): Promise<IUserProfile>;
}
