import {
  type UpdateUserRoleSchemaType,
  UserRoleConstants
} from '@/constants/zod/UserRoleConstants';

export class UpdateUserRoleDto {
  public readonly roleName?: string | undefined;
  public readonly description?: string | undefined;

  constructor(data: unknown) {
    const validated: UpdateUserRoleSchemaType = UserRoleConstants.validateUpdateRole(data);
    this.roleName = validated.roleName;
    this.description = validated.description;
  }
}


