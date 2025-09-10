import type { CreateUserProfileDto } from '@/dtos';
import type { IUserProfile, IUserProfileRepository, IUserProfileService } from '@/interfaces';
import type { CreateUserProfileData, WithoutSystemFieldsType } from '@/types';
export class UserProfilesService implements IUserProfileService {
  constructor(private readonly UserProfilesRepository: IUserProfileRepository) {}

  public async create(CreateUserProfileDto: CreateUserProfileDto): Promise<IUserProfile> {
    try {
      const userProfileData: CreateUserProfileData = {
        userId: CreateUserProfileDto.getUserId(),
        firstName: CreateUserProfileDto.getFirstName(),
        lastName: CreateUserProfileDto.getLastName(),
        phone: CreateUserProfileDto.getPhone(),
        birthDate: CreateUserProfileDto.getBirthDate(),
        avatarUrl: CreateUserProfileDto.getAvatarUrl()
      };
      return await this.UserProfilesRepository.create(userProfileData);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS UserProfile create():', error);
    }
    throw new Error('bug');
  }

  public async findAll(limit?: number, offset?: number): Promise<IUserProfile[]> {
    throw new Error('Method not implemented.');
  }
  public async findOne(id: string): Promise<IUserProfile> {
    throw new Error('Method not implemented.');
  }
  public async update(
    id: string,
    data: Partial<WithoutSystemFieldsType<IUserProfile>>
  ): Promise<IUserProfile> {
    throw new Error('Method not implemented.');
  }
  public async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
