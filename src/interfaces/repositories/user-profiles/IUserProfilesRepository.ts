import type { IUserProfiles } from '@/interfaces/entities';
import type { IBaseRepository } from '../IBaseRepository';

export interface IUserProfilesRepository
  extends IBaseRepository<IUserProfiles, IUserProfilesRepository> {}
