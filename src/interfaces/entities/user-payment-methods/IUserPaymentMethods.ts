import type { IEntity } from '@/interfaces';

export interface IUserPaymentMethods extends IEntity {
  // === GETTERS COMPLETS ===
  getUserId(): number;
  getCardToken(): string;
  getCardLast4(): string;
  getCardBrand(): string;
  getCardType(): string;
  getCardholderName(): string;
  getExpiresMonth(): number;
  getExpiresYear(): number;
  getNickname(): string;
  getIsDefault(): boolean;
  getIsActive(): boolean;
  // === SETTERS COMPLETS ===
  setUserId(userId: number): this;
  setCardToken(cardToken: string): this;
  setCardLast4(cardLast4: string): this;
  setCardBrand(cardBrand: string): this;
  setCardType(cardType: string): this;
  setCardholderName(cardholderName: string): this;
  setExpiresMonth(expiresMonth: number): this;
  setExpiresYear(expiresYear: number): this;
  setNickname(nickname: string): this;
  setIsDefault(isDefault: boolean): this;
  setIsActive(isActive: boolean): this;
}
