import type { IEntity } from '@/interfaces';

export interface IUserProfiles extends IEntity {
  // === GETTERS COMPLETS ===
  getUserId(): number;
  getFirstName(): string;
  getLastName(): string;
  getPhone(): string;
  getBirthDate(): Date;
  getAvatarUrl(): string;
  // === SETTERS COMPLETS ===
  setUserId(userId: number): this;
  setFirstName(firstName: string): this;
  setLastName(lastName: string): this;
  setPhone(phone: string): this;
  setBirthDate(birthDate: Date): this;
  setAvatarUrl(avatarUrl: string): this;
}
