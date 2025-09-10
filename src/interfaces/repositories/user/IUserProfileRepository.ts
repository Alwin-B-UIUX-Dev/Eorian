import type { IBaseRepository, IUserProfile } from '@/interfaces';
import type { IUserProfileData } from '@/types';

export interface IUserProfileRepository extends IBaseRepository<IUserProfile, IUserProfileData> {}
