import { type CreateUserProfileSchemaType, UserProfileConstants } from '@/constants';

export class CreateUserProfileDto {
  public readonly userId: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly phone: string;
  public readonly birthDate: Date;
  public readonly avatarUrl: string;

  constructor(data: unknown) {
    const validated: CreateUserProfileSchemaType =
      UserProfileConstants.validateCreateUserProfile(data);
    this.userId = validated.userId;
    this.firstName = validated.firstName;
    this.lastName = validated.lastName;
    this.phone = validated.phone;
    this.birthDate = validated.birthDate;
    this.avatarUrl = validated.avatarUrl;
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
  public getAvatarUrl(): string {
    return this.avatarUrl;
  }
}
