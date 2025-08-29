import type { IEntity } from '@/interfaces';

export interface IUserRoles extends IEntity {
  // === GETTERS COMPLETS ===
  getRoleName(): string;
  getDescription(): string;
  // === SETTERS COMPLETS ===
  setRoleName(roleName: string): this;
  setDescription(description: string): this;
}
