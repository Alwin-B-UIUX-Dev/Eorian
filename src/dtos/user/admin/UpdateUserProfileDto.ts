// src/dtos/user/admin/UpdateUserProfileDto.ts

import { z } from 'zod';
import { UserProfileConstants } from '@/constants';

export class UpdateUserProfileDto {
  public readonly firstName?: string;
  public readonly lastName?: string;
  public readonly phone?: string;
  public readonly birthDate?: Date;
  public readonly avatarUrl?: string;

  constructor(data: unknown) {
    const schema = z.object({
      firstName: UserProfileConstants.FIRST_NAME_SCHEMA.optional(),
      lastName: UserProfileConstants.LAST_NAME_SCHEMA.optional(),
      phone: UserProfileConstants.PHONE_SCHEMA.optional(),
      birthDate: UserProfileConstants.BIRTH_DATE_SCHEMA.optional(),
      avatarUrl: UserProfileConstants.AVATAR_URL_SCHEMA.optional()
    });

    const validatedData = schema.parse(data);

    if (validatedData.firstName !== undefined) this.firstName = validatedData.firstName;
    if (validatedData.lastName !== undefined) this.lastName = validatedData.lastName;
    if (validatedData.phone !== undefined) this.phone = validatedData.phone;
    if (validatedData.birthDate !== undefined) this.birthDate = validatedData.birthDate;
    if (validatedData.avatarUrl !== undefined) this.avatarUrl = validatedData.avatarUrl;
  }

  public getFirstName(): string | undefined {
    return this.firstName;
  }

  public getLastName(): string | undefined {
    return this.lastName;
  }

  public getPhone(): string | undefined {
    return this.phone;
  }

  public getBirthDate(): Date | undefined {
    return this.birthDate;
  }

  public getAvatarUrl(): string | undefined {
    return this.avatarUrl;
  }
}
