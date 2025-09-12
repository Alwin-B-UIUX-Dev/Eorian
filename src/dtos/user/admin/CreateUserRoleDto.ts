import {
  type CreateUserRoleSchemaType,
  UserRoleConstants
} from '@/constants/zod/UserRoleConstants';

export class CreateUserRoleDto {
  public readonly roleName: string;
  public readonly description?: string | undefined;

  constructor(data: unknown) {
    const validated: CreateUserRoleSchemaType = UserRoleConstants.validateCreateRole(data);
    this.roleName = validated.roleName;
    this.description = validated.description;
  }
}


