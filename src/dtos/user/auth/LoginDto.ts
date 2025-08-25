// src/dtos/auth/LoginDto.ts

import { AuthConstants, type LoginSchemaType } from '@/constants/zod/AuthConstants';

/**
 * Dto pour l'authentification
 */
export class LoginDto {
  public identifier: string;
  public password: string;
  public rememberMe: boolean;

  constructor(data: unknown) {
    const validatedData: LoginSchemaType = AuthConstants.validateLogin(data);

    this.identifier = validatedData.identifier;
    this.password = validatedData.password;
    this.rememberMe = validatedData.rememberMe;
  }

  public getIdentifier(): string {
    return this.identifier;
  }

  public getPassword(): string {
    return this.password;
  }

  public getRememberMe(): boolean {
    return this.rememberMe;
  }

  public isEmail(): boolean {
    return AuthConstants.isEmail(this.identifier);
  }

  public getIdentifierType(): 'email' | 'username' {
    return AuthConstants.validateIdentifier(this.identifier).type;
  }
}
