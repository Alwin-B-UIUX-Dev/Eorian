import { UserProfileConstants } from '@/constants';
import type { IUserProfile } from '@/interfaces';

export class ResponseUserProfileDto {
  static fromUserProfile(UserProfile: IUserProfile): ResponseUserProfileDto {
    throw new Error('Method not implemented.');
  }
  public readonly id: string;
  public readonly userId: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly phone: string;
  public readonly birthDate: Date;
  public readonly avatarUrl: string;

  constructor(data: unknown) {
    const validated = UserProfileConstants.validateResponseUserProfile(data);
    this.id = validated.id;
    this.userId = validated.userId;
    this.firstName = validated.firstName;
    this.lastName = validated.lastName;
    this.phone = validated.phone;
    this.birthDate = new Date(validated.birthDate);
    this.avatarUrl = validated.avatarUrl;
  }

  // Getters
  public getId(): string {
    return this.id;
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
    return new Date(this.birthDate.getTime()); // Retourne une copie pour éviter les mutations
  }

  public getAvatarUrl(): string {
    return this.avatarUrl;
  }

  /**
   * Crée une instance de ResponseUserProfileDto à partir d'une entité métier
   * @param userProfile L'entité IUserProfile à convertir
   * @returns Une nouvelle instance de ResponseUserProfileDto
   */
  public static from(userProfile: IUserProfile): ResponseUserProfileDto {
    return new ResponseUserProfileDto({
      id: userProfile.getId().toString(), // Conversion de l'ID métier (ex: UUID)
      userId: userProfile.getUserId(),
      firstName: userProfile.getFirstName(),
      lastName: userProfile.getLastName(),
      phone: userProfile.getPhone(),
      birthDate: userProfile.getBirthDate(),
      avatarUrl: userProfile.getAvatarUrl()
    });
  }
}
