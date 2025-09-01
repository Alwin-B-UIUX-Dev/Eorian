import type { IUsers } from '@/interfaces';
import type { IBaseRepository } from '../IBaseRepository';

export interface IUsersRepository extends IBaseRepository<IUsers, IUsersRepository> {}
