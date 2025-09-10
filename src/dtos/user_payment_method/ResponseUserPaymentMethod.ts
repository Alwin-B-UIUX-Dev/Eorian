import { type ResponseUserPaymentMethodSchemaType, UserPaymentMethodConstants } from '@/constants';
import type { IUserPaymentMethod } from '@/interfaces';

export class ResponseUserPaymentMethodDto {
  static fromUserPaymentMethod(
    UserPaymentMethod: IUserPaymentMethod
  ): ResponseUserPaymentMethodDto {
    throw new Error('Method not implemented.');
  }
  public readonly id: string;
  public readonly userId: string;
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
    const validated: ResponseUserPaymentMethodSchemaType =
      UserPaymentMethodConstants.validateResponseUserPaymentMethod(data);
    this.id = validated.id;
    this.userId = validated.userId;
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
  public getId(): string {
    return this.id;
  }

  public getUserId(): string {
    return this.userId;
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

  public static from(paymentMethod: IUserPaymentMethod): ResponseUserPaymentMethodDto {
    return new ResponseUserPaymentMethodDto({
      id: paymentMethod.getId().toString(),
      userId: paymentMethod.getUserId(),
      cardLast4: paymentMethod.getCardLast4(),
      cardBrand: paymentMethod.getCardBrand(),
      cardType: paymentMethod.getCardType(),
      cardholderName: paymentMethod.getCardholderName(),
      expiresMonth: paymentMethod.getExpiresMonth(),
      expiresYear: paymentMethod.getExpiresYear(),
      nickname: paymentMethod.getNickname(),
      isDefault: paymentMethod.getIsDefault(),
      isActive: paymentMethod.getIsActive(),
      createdAt: paymentMethod.getCreatedAt().toISOString(),
      updatedAt: paymentMethod.getUpdatedAt().toISOString()
    });
  }
}
