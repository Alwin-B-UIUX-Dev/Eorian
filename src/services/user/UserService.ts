import { RoleEnum } from '@/constants';
import type { CreateUserAdminDto } from '@/dtos';
import { ConflictError, UserError } from '@/exceptions';
import type { IPasswordHasher, IUser, IUserRepository, IUserService } from '@/interfaces';
import type { CreateUserData, IUserData, WithoutSystemFieldsType } from '@/types';
import { PasswordHasher } from '@/utils';

export class UserService implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  public async create(createUserAdminDto: CreateUserAdminDto): Promise<IUser> {
    try {
      // ÉTAPE 1 : Vérifications séparées pour messages d'erreur précis
      const existingUserByEmail: IUser = await this.userRepository.findByEmail(
        createUserAdminDto.getEmail()
      );

      if (existingUserByEmail) {
        throw UserError.emailExists(createUserAdminDto.getEmail());
      }

      const existingUserByUsername: IUser = await this.userRepository.findByUsername(
        createUserAdminDto.getUsername()
      );

      if (existingUserByUsername) {
        throw UserError.usernameExists(createUserAdminDto.getUsername());
      }

      // ÉTAPE 2 : Hash password si fourni, sinon générer un password temporaire
      let passwordHash: string;

      if (createUserAdminDto.password) {
        passwordHash = await this.passwordHasher.hash(createUserAdminDto.password);
      } else {
        // Générer un mot de passe temporaire pour l'admin
        const tempPassword: string = PasswordHasher.generateTempPassword();
        passwordHash = await this.passwordHasher.hash(tempPassword);
        console.log(`🔑 Mot de passe temporaire généré: ${tempPassword}`);
      }

      // ÉTAPE 3 : Création userData pour repository
      const userData: CreateUserData = {
        email: createUserAdminDto.getEmail(),
        username: createUserAdminDto.getUsername(),
        passwordHash: passwordHash,
        roleId: createUserAdminDto.role === 'Administrateur' ? RoleEnum.ADMIN : RoleEnum.CUSTOMER,
        isActive: true,
        isConnected: false,
        emailVerified: createUserAdminDto.isEmailVerified ?? false,
        gdprConsent: createUserAdminDto.gdprConsent ?? true,
        gdprConsentDate: new Date(),
        lastLoginAt: undefined
      };

      // 💾 ÉTAPE 4 : Création utilisateur
      return await this.userRepository.create(userData);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS create():', error);

      // Si c'est déjà une ApiError, on la laisse passer
      if (error instanceof UserError || error instanceof ConflictError) {
        throw error;
      }

      // Sinon, on transforme l'erreur technique
      throw UserError.creation(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  public async findAll(limit?: number, offset?: number): Promise<IUser[]> {
    try {
      return await this.userRepository.findAll(limit, offset);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS findAll():', error);
      throw UserError.fetchFailed(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  public async findOne(id: string): Promise<IUser> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS findOne():', error);
      throw UserError.fetchFailed(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  public async update(
    id: string,
    data: Partial<WithoutSystemFieldsType<IUserData>>
  ): Promise<IUser> {
    try {
      const existingUser: IUser = await this.userRepository.findById(id);
      if (!existingUser) {
        throw UserError.notFound(id);
      }

      return await this.userRepository.update(id, data);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS update():', error);

      if (error instanceof UserError) {
        throw error;
      }

      throw UserError.updateFailed(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  public async remove(id: string): Promise<void> {
    try {
      const existingUser: IUser = await this.userRepository.findById(id);
      if (!existingUser) {
        throw UserError.notFound(id);
      }

      await this.userRepository.delete(id);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS remove():', error);

      if (error instanceof UserError) {
        throw error;
      }

      throw UserError.deleteFailed(error instanceof Error ? error.message : 'Unknown error');
    }
  }
}
