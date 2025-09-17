// src/dtos/user/account/ChangeUsernameDto.ts

import { z } from 'zod';
import { UserConstants } from '@/constants';

export class ChangeUsernameDto {
  public readonly newUsername: string;
  public readonly currentPassword: string;

  constructor(data: unknown) {
    const schema = z.object({
      newUsername: UserConstants.USERNAME_SCHEMA,
      currentPassword: z.string().min(1, 'Le mot de passe actuel est requis')
    });

    const validatedData = schema.parse(data);
    this.newUsername = validatedData.newUsername;
    this.currentPassword = validatedData.currentPassword;
  }

  public getNewUsername(): string {
    return this.newUsername;
  }

  public getCurrentPassword(): string {
    return this.currentPassword;
  }
}
