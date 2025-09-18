import type { IEntity } from '@/interfaces';
export interface IUserProfile extends IEntity {
  getUserId(): string;
  getFirstName(): string;
  getLastName(): string;
  getPhone(): string;
  getBirthDate(): Date;
  getAvatarUrl(): string;
  getFullName(): string;

  setUserId(userId: string): this;
  setFirstName(firstName: string): this;
  setLastName(lastName: string): this;
  setPhone(phone: string): this;
  setBirthDate(birthDate: Date): this;
  setAvatarUrl(avatarUrl: string): this;
}
