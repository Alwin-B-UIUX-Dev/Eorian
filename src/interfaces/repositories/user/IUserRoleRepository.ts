import type { IBaseRepository, IUserRole } from '@/interfaces';
import type { IUserData } from '@/types';

export interface IUserRoleRepository extends IBaseRepository<IUserRole, IUserData> {}
