// src/dtos/user/admin/ResponseUserProfileDto.ts

import type { IUserProfile } from '@/interfaces/entities/user/IUserProfile';

export class ResponseUserProfileDto {
  public readonly id: string;
  public readonly userId: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly phone: string;
  public readonly birthDate: Date;
  public readonly avatarUrl: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(userProfile: IUserProfile) {
    this.id = userProfile.getId().toString();
    this.userId = userProfile.getUserId();
    this.firstName = userProfile.getFirstName();
    this.lastName = userProfile.getLastName();
    this.phone = userProfile.getPhone();
    this.birthDate = userProfile.getBirthDate();
    this.avatarUrl = userProfile.getAvatarUrl();
    this.createdAt = userProfile.getCreatedAt();
    this.updatedAt = userProfile.getUpdatedAt();
  }

  public toObject(): Record<string, unknown> {
    return {
      id: this.id,
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      birthDate: this.birthDate,
      avatarUrl: this.avatarUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
