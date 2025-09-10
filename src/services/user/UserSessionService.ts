import type { CreateUserSessionDto } from '@/dtos';
import type { IUserSession, IUserSessionRepository, IUserSessionService } from '@/interfaces';
import type { CreateUserSessionData, WithoutSystemFieldsType } from '@/types';

export class UserSessionsService implements IUserSessionService {
  constructor(private readonly UserSessionsRepository: IUserSessionRepository) {}

  public async create(CreateUserSessionDto: CreateUserSessionDto): Promise<IUserSession> {
    try {
      const userSessionData: CreateUserSessionData = {
        userId: CreateUserSessionDto.getUserId(),
        refreshToken: CreateUserSessionDto.getRefreshToken(),
        deviceInfo: CreateUserSessionDto.getDeviceInfo(),
        expiresAt: CreateUserSessionDto.getExpiresAt(),
        isActive: CreateUserSessionDto.getIsActive()
      };
      return await this.UserSessionsRepository.create(userSessionData);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS UserSession create():', error);
    }
    throw new Error('bug');
  }
  public async findAll(limit?: number, offset?: number): Promise<IUserSession[]> {
    throw new Error('Method not implemented.');
  }
  public async findOne(id: string): Promise<IUserSession> {
    throw new Error('Method not implemented.');
  }
  public async update(
    id: string,
    data: Partial<WithoutSystemFieldsType<IUserSession>>
  ): Promise<IUserSession> {
    throw new Error('Method not implemented.');
  }
  public async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
