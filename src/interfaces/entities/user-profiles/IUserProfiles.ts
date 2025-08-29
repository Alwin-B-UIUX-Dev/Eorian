import type { IEntity } from '@/interfaces';

export interface IUserProfiles extends IEntity {
  // === GETTERS COMPLETS ===
  getUserId(): number;
  getFirstName(): string | null;
  getLastName(): string | null;
  getPhone(): string | null;
  getBirthDate(): Date | null;
  getAvatarUrl(): string | null;
  // === SETTERS COMPLETS ===
  setUserId(userId: number): this;
  setFirstName(firstName: string | null): this;
  setLastName(lastName: string | null): this;
  setPhone(phone: string | null): this;
  setBirthDate(birthDate: Date | null): this;
  setAvatarUrl(avatarUrl: string | null): this;
}
