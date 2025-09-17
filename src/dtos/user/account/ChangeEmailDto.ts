// src/dtos/user/account/ChangeEmailDto.ts

import { z } from 'zod';
import { UserConstants } from '@/constants';

export class ChangeEmailDto {
  public readonly newEmail: string;
  public readonly currentPassword: string;

  constructor(data: unknown) {
    const schema = z.object({
      newEmail: UserConstants.EMAIL_SCHEMA,
      currentPassword: z.string().min(1, 'Le mot de passe actuel est requis')
    });

    const validatedData = schema.parse(data);
    this.newEmail = validatedData.newEmail;
    this.currentPassword = validatedData.currentPassword;
  }

  public getNewEmail(): string {
    return this.newEmail;
  }

  public getCurrentPassword(): string {
    return this.currentPassword;
  }
}
