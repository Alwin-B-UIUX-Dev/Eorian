import type { IUser } from '@/interfaces/entities';
import type { IBaseRepository } from '../IBaseRepository';

export interface IUserRepository extends IBaseRepository<IUser, IUserRepository> {}
