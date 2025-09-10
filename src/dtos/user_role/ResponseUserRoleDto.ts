import { type ResponseUserRoleSchemaType, UserRoleConstants } from '@/constants';
import type { IUserRole } from '@/interfaces';

export class ResponseUserRoleDto {
  static fromUserRole(UserRole: IUserRole): ResponseUserRoleDto {
    throw new Error('Method not implemented.');
  }
  public readonly id: string;
  public readonly roleName: string;
  public readonly description: string;

  constructor(data: unknown) {
    const validated: ResponseUserRoleSchemaType = UserRoleConstants.validateResponseUserRole(data);
    this.id = validated.id;
    this.roleName = validated.roleName;
    this.description = validated.description;
  }

  public getId(): string {
    return this.id;
  }

  public getRoleName(): string {
    return this.roleName;
  }

  public getDescription(): string {
    return this.description;
  }

  public static from(userRole: IUserRole): ResponseUserRoleDto {
    return new ResponseUserRoleDto({
      id: userRole.getId(),
      roleName: userRole.getRoleName(),
      description: userRole.getDescription()
    });
  }
}
