import type { IUserRoles } from '@/interfaces/entities/user-roles/IUserRoles';
import type { IUserRolesData } from '@/types';
import { BaseEntity } from '../BaseEntity';
export class UserRoles extends BaseEntity implements IUserRoles {
  private roleName: string;
  private description: string;

  constructor(data: IUserRolesData) {
    super(data, 'roleId');
    this.roleName = data.role_name;
    this.description = data.description;
  }

  // === GETTERS ===
  public getRoleName(): string {
    return this.roleName;
  }

  public getDescription(): string {
    return this.description;
  }

  // === SETTERS ===
  public setRoleName(roleName: string): this {
    this.roleName = roleName;
    this.updateTimestamp();
    return this;
  }

  public setDescription(description: string): this {
    this.description = description;
    this.updateTimestamp();
    return this;
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      role_name: this.roleName,
      description: this.description
    };
  }
}
