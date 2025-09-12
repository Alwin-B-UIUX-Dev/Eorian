// src/interfaces/repositories/user/IUserRoleRepository.ts

import type { IUserRole } from '@/interfaces/entities/user/IUserRole';
import type { IBaseRepository } from '@/interfaces/repositories/IBaseRepository';
import type { IUserRoleData } from '@/types/entities/user';

export interface IUserRoleRepository extends IBaseRepository<IUserRole, IUserRoleData> {
  findByRoleName(roleName: string): Promise<IUserRole | null>;
}




