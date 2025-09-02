// src/entities/UserRole.ts

import { RoleEnum } from '@/constants';
import { BaseEntity } from '@/entities/BaseEntity';
import type { IUserRole } from '@/interfaces/entities/user/IUserRole';
import type { IUserRoleData } from '@/types/entities/user';

/**
 * Classe metier User - Entité metier de User
 */
export class UserRole extends BaseEntity implements IUserRole {
  private roleName: string;
  private description: string;

  constructor(data: IUserRoleData) {
    super(data);
    this.roleName = data.roleName;
    this.description = data.description;
  }

  public getRoleName(): string {
    return this.roleName;
  }

  public getDescription(): string {
    return this.description;
  }

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

  public isAdmin(): boolean {
    return this.roleName === RoleEnum.ADMIN;
  }

  public isCustomer(): boolean {
    return this.roleName === RoleEnum.ADMIN;
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      userRoleId: this.id,
      roleName: this.roleName,
      description: this.description
    };
  }
}
