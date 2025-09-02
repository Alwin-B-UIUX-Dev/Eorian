import type { IUserProfile } from '@/interfaces/entities';
import type { IBaseRepository } from '../IBaseRepository';

export interface IUserProfilesRepository
  extends IBaseRepository<IUserProfile, IUserProfilesRepository> {}
