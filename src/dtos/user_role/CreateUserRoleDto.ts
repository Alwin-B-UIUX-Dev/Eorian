import { type CreateUserRoleSchemaType, UserRoleConstants } from '@/constants';

export class CreateUserRoleDto {
  public readonly roleName: string;
  public readonly description: string;

  constructor(data: unknown) {
    const validated: CreateUserRoleSchemaType = UserRoleConstants.validateCreateUserRole(data);
    this.roleName = validated.roleName;
    this.description = validated.description;
  }

  public getRoleName(): string {
    return this.roleName;
  }

  public getDescription(): string {
    return this.description;
  }
}
