import { type CreateUserPaymentMethodSchemaType, UserPaymentMethodConstants } from '@/constants';

export class CreateUserPaymentMethodDto {
  public readonly userId: string;
  public readonly cardToken: string;
  public readonly cardLast4: string;
  public readonly cardBrand: string;
  public readonly cardType: string;
  public readonly cardholderName: string;
  public readonly expiresMonth: string;
  public readonly expiresYear: string;
  public readonly nickname: string;
  public readonly isDefault: boolean;
  public readonly isActive: boolean;

  constructor(data: unknown) {
    const validated: CreateUserPaymentMethodSchemaType =
      UserPaymentMethodConstants.validateCreateUserPaymentMethod(data);
    this.userId = validated.userId;
    this.cardToken = validated.cardToken;
    this.cardLast4 = validated.cardLast4;
    this.cardBrand = validated.cardBrand;
    this.cardType = validated.cardType;
    this.cardholderName = validated.cardholderName;
    this.expiresMonth = validated.expiresMonth;
    this.expiresYear = validated.expiresYear;
    this.nickname = validated.nickname;
    this.isDefault = validated.isDefault;
    this.isActive = validated.isActive;
  }

  // Getters
  public getUserId(): string {
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
  public getExpiresMonth(): string {
    return this.expiresMonth;
  }
  public getExpiresYear(): string {
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
}
