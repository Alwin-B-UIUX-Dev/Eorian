import type { IUserProfiles } from '@/interfaces';
import type { IUserProfilesData } from '@/types';
import { BaseEntity } from '../BaseEntity';
export class UserProfiles extends BaseEntity implements IUserProfiles {
  private userId: number;
  private firstName: string;
  private lastName: string;
  private phone: string;
  private birthDate: Date;
  private avatarUrl: string;

  constructor(data: IUserProfilesData) {
    super(data, 'userProfileId');
    this.userId = data.user_id;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.phone = data.phone;
    this.birthDate = data.birth_date;
    this.avatarUrl = data.avatar_url;
  }

  // === GETTERS ===
  public getUserId(): number {
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

  // === SETTERS ===
  public setUserId(userId: number): this {
    this.userId = userId;
    this.updateTimestamp();
    return this;
  }

  public setFirstName(firstName: string): this {
    this.firstName = firstName;
    this.updateTimestamp();
    return this;
  }

  public setLastName(lastName: string): this {
    this.lastName = lastName;
    this.updateTimestamp();
    return this;
  }

  public setPhone(phone: string): this {
    this.phone = phone;
    this.updateTimestamp();
    return this;
  }

  public setBirthDate(birthDate: Date): this {
    this.birthDate = birthDate;
    this.updateTimestamp();
    return this;
  }

  public setAvatarUrl(avatarUrl: string): this {
    this.avatarUrl = avatarUrl;
    this.updateTimestamp();
    return this;
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      user_id: this.userId,
      first_name: this.firstName,
      last_name: this.lastName,
      phone: this.phone,
      birth_date: this.birthDate,
      avatar_url: this.avatarUrl
    };
  }
}
