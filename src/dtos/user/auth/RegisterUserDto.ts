import { type CreateUserSchemaType, UserConstants } from '@/constants/zod/UserConstants';
import { BaseUserDto } from '@/dtos/user/BaseUserDto';

/**
 * Dto pour la création d'un compte par l'utilisateur
 */
export class RegisterUserDto extends BaseUserDto {
  public readonly password: string;
  public readonly gdprConsent: boolean;

  constructor(data: unknown) {
    const validated: CreateUserSchemaType = UserConstants.validateCreateUser(data);
    super(validated.email, validated.username);
    this.password = validated.password;
    this.gdprConsent = validated.gdprConsent;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getUsername(): string {
    return this.username;
  }

  getGdprConsent(): boolean {
    return this.gdprConsent;
  }
}
