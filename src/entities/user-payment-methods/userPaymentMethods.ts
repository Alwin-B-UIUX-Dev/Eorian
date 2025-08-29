import type { IUserPaymentMethods } from '@/interfaces/entities/user-payment-methods';
import type { IUserPaymentMethodsData } from '@/types';
import { BaseEntity } from '../BaseEntity';
export class UserPaymentMethods extends BaseEntity implements IUserPaymentMethods {
  private userId: number;
  private cardToken: string;
  private cardLast4: string;
  private cardBrand: string;
  private cardType: string;
  private cardholderName: string;
  private expiresMonth: number;
  private expiresYear: number;
  private nickname: string;
  private isDefault: boolean;
  private isActive: boolean;

  constructor(data: IUserPaymentMethodsData) {
    super(data, 'paymentMethodId');
    this.userId = data.user_id;
    this.cardToken = data.card_token;
    this.cardLast4 = data.card_last4;
    this.cardBrand = data.card_brand;
    this.cardType = data.card_type;
    this.cardholderName = data.cardholder_name;
    this.expiresMonth = data.expires_month;
    this.expiresYear = data.expires_year;
    this.nickname = data.nickname;
    this.isDefault = data.is_default;
    this.isActive = data.is_active;
  }

  // === GETTERS ===
  public getUserId(): number {
    return this.userId;
  }

  public getCardToken(): string {
    return this.cardToken;
  }

  public getCardLast4(): string {
    return this.cardLast4;
  }

  public getCardBrand(): string {
    return this.cardBrand;
  }

  public getCardType(): string {
    return this.cardType;
  }

  public getCardholderName(): string {
    return this.cardholderName;
  }

  public getExpiresMonth(): number {
    return this.expiresMonth;
  }

  public getExpiresYear(): number {
    return this.expiresYear;
  }

  public getNickname(): string {
    return this.nickname;
  }

  public getIsDefault(): boolean {
    return this.isDefault;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  // === SETTERS ===
  public setUserId(userId: number): this {
    this.userId = userId;
    this.updateTimestamp();
    return this;
  }

  public setCardToken(cardToken: string): this {
    this.cardToken = cardToken;
    this.updateTimestamp();
    return this;
  }

  public setCardLast4(cardLast4: string): this {
    this.cardLast4 = cardLast4;
    this.updateTimestamp();
    return this;
  }

  public setCardBrand(cardBrand: string): this {
    this.cardBrand = cardBrand;
    this.updateTimestamp();
    return this;
  }

  public setCardType(cardType: string): this {
    this.cardType = cardType;
    this.updateTimestamp();
    return this;
  }

  public setCardholderName(cardholderName: string): this {
    this.cardholderName = cardholderName;
    this.updateTimestamp();
    return this;
  }

  public setExpiresMonth(expiresMonth: number): this {
    this.expiresMonth = expiresMonth;
    this.updateTimestamp();
    return this;
  }

  public setExpiresYear(expiresYear: number): this {
    this.expiresYear = expiresYear;
    this.updateTimestamp();
    return this;
  }

  public setNickname(nickname: string): this {
    this.nickname = nickname;
    this.updateTimestamp();
    return this;
  }

  public setIsDefault(isDefault: boolean): this {
    this.isDefault = isDefault;
    this.updateTimestamp();
    return this;
  }

  public setIsActive(isActive: boolean): this {
    this.isActive = isActive;
    this.updateTimestamp();
    return this;
  }

  protected getEntityData(): Record<string, unknown> {
    return {
      user_id: this.userId,
      card_token: this.cardToken,
      card_last4: this.cardLast4,
      card_brand: this.cardBrand,
      card_type: this.cardType,
      cardholder_name: this.cardholderName,
      expires_month: this.expiresMonth,
      expires_year: this.expiresYear,
      nickname: this.nickname,
      is_default: this.isDefault,
      is_active: this.isActive
    };
  }
}
