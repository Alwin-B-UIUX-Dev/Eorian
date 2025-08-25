import type { IEntity } from '@/interfaces';
export interface IUserRole extends IEntity {
  getRoleName(): string;
  getDescription(): string;
  setRoleName(roleName: string): this;
  setDescription(description: string): this;
  isAdmin(): boolean;
  isCustomer(): boolean;
}
