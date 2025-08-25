import { type CreateUserAdminSchemaType, UserConstants } from '@/constants/zod/UserConstants';
import { BaseUserDto } from '@/dtos/user/BaseUserDto';

/**
 * Dto pour la création d'un utilisateur par l'administrateur
 */
export class CreateUserAdminDto extends BaseUserDto {
  public readonly password?: string | undefined;
  public readonly role?: string | undefined;
  public readonly isEmailVerified?: boolean | undefined;
  public readonly gdprConsent: boolean;

  constructor(data: unknown) {
    const validated: CreateUserAdminSchemaType = UserConstants.validateCreateUserAdmin(data);
    super(validated.email, validated.username);
    this.password = validated.password;
    this.role = validated.role;
    this.isEmailVerified = validated.isEmailVerified;
    this.gdprConsent = validated.gdprConsent;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string | undefined {
    return this.password;
  }

  getUsername(): string {
    return this.username;
  }

  getGdprConsent(): boolean {
    return this.gdprConsent;
  }
}
