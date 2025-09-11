import type { CreateUserRoleDto } from '@/dtos';
import type { IBaseService, IUserRole } from '@/interfaces';
import type { IUserRoleData } from '@/types';

export interface IUserRoleService extends IBaseService<IUserRole, IUserRoleData> {
  create(createUserAdminDto: CreateUserRoleDto): Promise<IUserRole>;
}
