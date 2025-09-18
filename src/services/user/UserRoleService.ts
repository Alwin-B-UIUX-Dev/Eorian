// src/services/user/UserRoleService.ts
import { ConflictError, UserError } from '@/exceptions';
import type { IUserRole } from '@/interfaces/entities/user/IUserRole';
import type { IUserRoleRepository } from '@/interfaces/repositories/user/IUserRoleRepository';
import type { IUserRoleService } from '@/interfaces/services/user/IUserRoleService';
import type { CreateUserRoleData, UpdateUserRoleData } from '@/types/entities/user';

export class UserRoleService implements IUserRoleService {
  constructor(private readonly repository: IUserRoleRepository) {}

  public async create(data: CreateUserRoleData): Promise<IUserRole> {
    const roleName: string = String(data.roleName);
    const existing = await this.repository.findByRoleName(roleName);
    if (existing) {
      throw ConflictError.resourceExists('user_role', 'roleName', roleName);
    }
    return await this.repository.create({
      ...data,
      roleName
    });
  }

  public async findAll(limit?: number, offset?: number): Promise<IUserRole[]> {
    return await this.repository.findAll(limit, offset);
  }

  public async findOne(id: string): Promise<IUserRole | null> {
    return await this.repository.findById(id);
  }

  public async update(id: string, data: UpdateUserRoleData): Promise<IUserRole> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw UserError.notFound(id);
    }
    if (data.roleName) {
      const roleName: string = String(data.roleName);
      const duplicate = await this.repository.findByRoleName(roleName);
      if (duplicate && duplicate.getId() !== id) {
        throw ConflictError.resourceExists('user_role', 'roleName', roleName);
      }
    }
    const updatePayload: UpdateUserRoleData = {
      ...data,
      ...(data.roleName !== undefined ? { roleName: String(data.roleName) } : {})
    };
    return await this.repository.update(id, updatePayload);
  }

  public async remove(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw UserError.notFound(id);
    }
    await this.repository.delete(id);
  }
}
