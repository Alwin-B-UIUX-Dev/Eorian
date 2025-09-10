import type { CreateUserRoleDto } from '@/dtos';
import type { IUserRole, IUserRoleRepository, IUserRoleService } from '@/interfaces';
import type { CreateUserRoleData, WithoutSystemFieldsType } from '@/types';
export class UserRoleService implements IUserRoleService {
  constructor(private readonly UserRoleRepository: IUserRoleRepository) {}

  public async create(CreateUserRoleDto: CreateUserRoleDto): Promise<IUserRole> {
    try {
      const userRoleData: CreateUserRoleData = {
        roleName: CreateUserRoleDto.getRoleName(),
        description: CreateUserRoleDto.getDescription()
      };
      return await this.UserRoleRepository.create(userRoleData);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS UserRole create():', error);
    }
    throw new Error('bug');
  }

  public async findAll(limit?: number, offset?: number): Promise<IUserRole[]> {
    throw new Error('Method not implemented.');
  }
  public async findOne(id: string): Promise<IUserRole> {
    throw new Error('Method not implemented.');
  }
  public async update(
    id: string,
    data: Partial<WithoutSystemFieldsType<IUserRole>>
  ): Promise<IUserRole> {
    throw new Error('Method not implemented.');
  }
  public async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
