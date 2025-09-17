// src/dtos/user/account/ChangePasswordDto.ts

import { z } from 'zod';
import { UserConstants } from '@/constants';

export class ChangePasswordDto {
  public readonly currentPassword: string;
  public readonly newPassword: string;
  public readonly confirmPassword: string;

  constructor(data: unknown) {
    const schema = z
      .object({
        currentPassword: z.string().min(1, 'Le mot de passe actuel est requis'),
        newPassword: UserConstants.PASSWORD_SCHEMA,
        confirmPassword: z.string().min(1, 'La confirmation du mot de passe est requise')
      })
      .refine(data => data.newPassword === data.confirmPassword, {
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmPassword']
      });

    const validatedData = schema.parse(data);
    this.currentPassword = validatedData.currentPassword;
    this.newPassword = validatedData.newPassword;
    this.confirmPassword = validatedData.confirmPassword;
  }

  public getCurrentPassword(): string {
    return this.currentPassword;
  }

  public getNewPassword(): string {
    return this.newPassword;
  }

  public getConfirmPassword(): string {
    return this.confirmPassword;
  }
}
