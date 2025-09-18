// src/interfaces/services/user/IUserRoleService.ts

import type { IUserRole } from '@/interfaces/entities/user/IUserRole';
import type { CreateUserRoleData, UpdateUserRoleData } from '@/types/entities/user';

export interface IUserRoleService {
  create(data: CreateUserRoleData): Promise<IUserRole>;
  findAll(limit?: number, offset?: number): Promise<IUserRole[]>;
  findOne(id: string): Promise<IUserRole | null>;
  update(id: string, data: UpdateUserRoleData): Promise<IUserRole>;
  remove(id: string): Promise<void>;
}




