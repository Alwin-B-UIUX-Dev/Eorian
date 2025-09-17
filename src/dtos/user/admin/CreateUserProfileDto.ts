// src/dtos/user/admin/CreateUserProfileDto.ts

import { z } from 'zod';
import { UserProfileConstants } from '@/constants';

export class CreateUserProfileDto {
  public readonly userId: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly phone: string;
  public readonly birthDate: Date;
  public readonly avatarUrl?: string;

  constructor(data: unknown) {
    const schema = z.object({
      userId: UserProfileConstants.USER_ID_SCHEMA,
      firstName: UserProfileConstants.FIRST_NAME_SCHEMA,
      lastName: UserProfileConstants.LAST_NAME_SCHEMA,
      phone: UserProfileConstants.PHONE_SCHEMA,
      birthDate: UserProfileConstants.BIRTH_DATE_SCHEMA,
      avatarUrl: UserProfileConstants.AVATAR_URL_SCHEMA.optional()
    });

    const validatedData = schema.parse(data);

    this.userId = validatedData.userId;
    this.firstName = validatedData.firstName;
    this.lastName = validatedData.lastName;
    this.phone = validatedData.phone;
    this.birthDate = validatedData.birthDate;
    this.avatarUrl = validatedData.avatarUrl || '';
  }

  public getUserId(): string {
    return this.userId;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getPhone(): string {
    return this.phone;
  }

  public getBirthDate(): Date {
    return this.birthDate;
  }

  public getAvatarUrl(): string | undefined {
    return this.avatarUrl;
  }
}
