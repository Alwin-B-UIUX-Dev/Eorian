import { BaseEntity } from '@/entities/BaseEntity';
import type { IUserProfileData } from '@/types';

export class UserProfile extends BaseEntity {
  private userId: string;
  private firstName: string;
  private lastName: string;
  private phone: string;
  private birthDate: Date;
  private newsletterConsent: boolean;
  private newsletterConsentDate: Date;
  private avatarUrl: string;
  constructor(data: IUserProfileData) {
    super(data, 'userId');
    this.userId = data.userId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phone = data.phone;
    this.birthDate = data.birthDate;
    this.newsletterConsent = data.newsletterConsent;
    this.newsletterConsentDate = data.newsletterConsentDate;
    this.avatarUrl = data.avatarUrl;
  }

  public getUserId(): string {
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

  public getNewsletterConsent(): boolean {
    return this.newsletterConsent;
  }

  public getNewsletterConsentDate(): Date {
    return this.newsletterConsentDate;
  }

  public getAvatarUrl(): string {
    return this.avatarUrl;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public setUserId(userId: string): this {
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

  public setNewsletterConsent(newsletterConsent: boolean): this {
    this.newsletterConsent = newsletterConsent;
    this.updateTimestamp();
    return this;
  }

  public setNewsletterConsentDate(newsletterConsent_date: Date): this {
    this.newsletterConsentDate = newsletterConsent_date;
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
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      birthDate: this.birthDate,
      newsletterConsent: this.newsletterConsent,
      newsletterConsentDate: this.newsletterConsentDate,
      avatarUrl: this.avatarUrl
    };
  }
}
