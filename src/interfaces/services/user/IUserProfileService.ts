import type { IBaseService, IUserProfile } from '@/interfaces';
import type { IUserProfileData } from '@/types';

export interface IUserProfileService extends IBaseService<IUserProfile, IUserProfileData> {}
