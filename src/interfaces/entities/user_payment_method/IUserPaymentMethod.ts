import type { IEntity } from '@/interfaces';

export interface IUserPaymentMethod extends IEntity {
  // === GETTERS COMPLETS ===
  getUserId(): string;
  getCardToken(): string;
  getCardLast4(): string;
  getCardBrand(): string;
  getCardType(): string;
  getCardholderName(): string;
  getExpiresMonth(): string;
  getExpiresYear(): string;
  getNickname(): string;
  getIsDefault(): boolean;
  getIsActive(): boolean;
  // === SETTERS COMPLETS ===
  setUserId(userId: string): this;
  setCardToken(cardToken: string): this;
  setCardLast4(cardLast4: string): this;
  setCardBrand(cardBrand: string): this;
  setCardType(cardType: string): this;
  setCardholderName(cardholderName: string): this;
  setExpiresMonth(expiresMonth: string): this;
  setExpiresYear(expiresYear: string): this;
  setNickname(nickname: string): this;
  setIsDefault(isDefault: boolean): this;
  setIsActive(isActive: boolean): this;
}
