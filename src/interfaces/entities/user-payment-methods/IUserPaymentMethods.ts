import type { IEntity } from '@/interfaces';

export interface IUserPaymentMethods extends IEntity {
  // === GETTERS COMPLETS ===
  getUserId(): number;
  getCardToken(): string;
  getCardLast4(): string;
  getCardBrand(): string;
  getCardType(): string;
  getCardholderName(): string | null;
  getExpiresMonth(): number | null;
  getExpiresYear(): number | null;
  getNickname(): string | null;
  getIsDefault(): boolean;
  getIsActive(): boolean;
  // === SETTERS COMPLETS ===
  setUserId(userId: number): this;
  setCardToken(cardToken: string): this;
  setCardLast4(cardLast4: string): this;
  setCardBrand(cardBrand: string): this;
  setCardType(cardType: string): this;
  setCardholderName(cardholderName: string | null): this;
  setExpiresMonth(expiresMonth: number | null): this;
  setExpiresYear(expiresYear: number | null): this;
  setNickname(nickname: string | null): this;
  setIsDefault(isDefault: boolean): this;
  setIsActive(isActive: boolean): this;
}
