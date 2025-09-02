import type { IUserRole } from '@/interfaces/entities';
import type { IBaseRepository } from '../IBaseRepository';

export interface IUserRolesRepository extends IBaseRepository<IUserRole, IUserRolesRepository>{}
