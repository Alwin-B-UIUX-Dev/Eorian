// src/services/user/UserProfileService.ts

import { ConflictError, UserError } from '@/exceptions';
import type {
  IUser,
  IUserProfile,
  IUserProfileRepository,
  IUserProfileService,
  IUserRepository
} from '@/interfaces';
import type { CreateUserProfileData, IUserProfileData, WithoutSystemFieldsType } from '@/types';
import { PasswordHasher } from '@/utils';

export class UserProfileService implements IUserProfileService {
  private readonly passwordHasher: PasswordHasher;

  constructor(
    private readonly userProfileRepository: IUserProfileRepository,
    private readonly userRepository: IUserRepository
  ) {
    this.passwordHasher = new PasswordHasher();
  }

  public async create(
    userId: string,
    profileData: {
      firstName: string;
      lastName: string;
      phone: string;
      birthDate: Date;
      avatarUrl?: string;
    }
  ): Promise<IUserProfile> {
    try {
      // ÉTAPE 1 : Vérifier qu'un profil n'existe pas déjà pour cet utilisateur
      // Note: Cette vérification pourrait être ajoutée si nécessaire

      // ÉTAPE 2 : Vérifier que le numéro de téléphone n'est pas déjà utilisé
      const phoneExists = await this.userProfileRepository.phoneExists(profileData.phone);
      if (phoneExists) {
        throw ConflictError.resourceExists('user_profile', 'phone', profileData.phone);
      }

      // ÉTAPE 3 : Création des données du profil
      const createProfileData: CreateUserProfileData = {
        userId,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        birthDate: profileData.birthDate,
        avatarUrl: profileData.avatarUrl || ''
      };

      // 💾 ÉTAPE 4 : Création du profil
      return await this.userProfileRepository.create(createProfileData);
    } catch (error) {
      // console.error('🚨 ERREUR TECHNIQUE DANS create():', error);

      // Si c'est déjà une ApiError, on la laisse passer
      if (error instanceof UserError || error instanceof ConflictError) {
        throw error;
      }

      // Sinon, on transforme l'erreur technique
      throw UserError.profileCreation(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  public async findAll(limit?: number, offset?: number): Promise<IUserProfile[]> {
    try {
      return await this.userProfileRepository.findAll(limit || 10, offset || 0);
    } catch (error) {
      // console.error('🚨 ERREUR TECHNIQUE DANS findAll():', error);
      throw UserError.profileFetchFailed(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  public async findOne(id: string): Promise<IUserProfile | null> {
    try {
      return await this.userProfileRepository.findById(id);
    } catch (error) {
      // console.error('🚨 ERREUR TECHNIQUE DANS findOne():', error);
      throw UserError.profileFetchFailed(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  public async update(
    id: string,
    data: Partial<WithoutSystemFieldsType<IUserProfileData>>
  ): Promise<IUserProfile> {
    try {
      const existingProfile = await this.userProfileRepository.findById(id);
      if (!existingProfile) {
        throw UserError.profileNotFound(id);
      }

      // Vérifier que le numéro de téléphone n'est pas déjà utilisé par un autre profil
      if (data.phone && data.phone !== existingProfile.getPhone()) {
        const phone = data.phone as string;
        const phoneExists = await this.userProfileRepository.phoneExists(
          phone,
          existingProfile.getUserId()
        );
        if (phoneExists) {
          throw ConflictError.resourceExists('user_profile', 'phone', phone);
        }
      }

      return await this.userProfileRepository.update(id, data);
    } catch (error) {
      // console.error('🚨 ERREUR TECHNIQUE DANS update():', error);

      if (error instanceof UserError || error instanceof ConflictError) {
        throw error;
      }

      throw UserError.profileUpdateFailed(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  public async remove(id: string): Promise<void> {
    try {
      const existingProfile = await this.userProfileRepository.findById(id);
      if (!existingProfile) {
        throw UserError.profileNotFound(id);
      }

      await this.userProfileRepository.delete(id);
    } catch (error) {
      // console.error('🚨 ERREUR TECHNIQUE DANS remove():', error);

      if (error instanceof UserError) {
        throw error;
      }

      throw UserError.profileDeleteFailed(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  // ===================================
  // GESTION DU COMPTE UTILISATEUR
  // ===================================

  public async changeEmail(
    userId: string,
    newEmail: string,
    currentPassword: string
  ): Promise<IUser> {
    try {
      // Vérifier que l'utilisateur existe
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw UserError.notFound(userId);
      }

      // Vérifier le mot de passe actuel
      const isPasswordValid = await this.passwordHasher.verify(
        user.getPasswordHash(),
        currentPassword
      );
      if (!isPasswordValid) {
        throw UserError.invalidCredentials();
      }

      // Vérifier que le nouvel email n'est pas déjà utilisé
      const emailExists = await this.userRepository.emailExists(newEmail, userId);
      if (emailExists) {
        throw ConflictError.resourceExists('user', 'email', newEmail);
      }

      // Mettre à jour l'email
      return await this.userRepository.update(userId, { email: newEmail });
    } catch (error) {
      if (error instanceof UserError || error instanceof ConflictError) {
        throw error;
      }

      throw UserError.updateFailed(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  public async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<IUser> {
    try {
      // Vérifier que l'utilisateur existe
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw UserError.notFound(userId);
      }

      // Vérifier le mot de passe actuel
      const isPasswordValid = await this.passwordHasher.verify(
        user.getPasswordHash(),
        currentPassword
      );
      if (!isPasswordValid) {
        throw UserError.invalidCredentials();
      }

      // Hasher le nouveau mot de passe
      const hashedNewPassword = await this.passwordHasher.hash(newPassword);

      // Mettre à jour le mot de passe
      return await this.userRepository.update(userId, { password: hashedNewPassword });
    } catch (error) {
      if (error instanceof UserError) {
        throw error;
      }

      throw UserError.updateFailed(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  public async changeUsername(
    userId: string,
    newUsername: string,
    currentPassword: string
  ): Promise<IUser> {
    try {
      // Vérifier que l'utilisateur existe
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw UserError.notFound(userId);
      }

      // Vérifier le mot de passe actuel
      const isPasswordValid = await this.passwordHasher.verify(
        user.getPasswordHash(),
        currentPassword
      );
      if (!isPasswordValid) {
        throw UserError.invalidCredentials();
      }

      // Vérifier que le nouveau nom d'utilisateur n'est pas déjà utilisé
      const usernameExists = await this.userRepository.usernameExists(newUsername, userId);
      if (usernameExists) {
        throw ConflictError.resourceExists('user', 'username', newUsername);
      }

      // Mettre à jour le nom d'utilisateur
      return await this.userRepository.update(userId, { username: newUsername });
    } catch (error) {
      if (error instanceof UserError || error instanceof ConflictError) {
        throw error;
      }

      throw UserError.updateFailed(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  public async deleteAccount(userId: string, password: string): Promise<void> {
    try {
      // Vérifier que l'utilisateur existe
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw UserError.notFound(userId);
      }

      // Vérifier le mot de passe
      const isPasswordValid = await this.passwordHasher.verify(user.getPasswordHash(), password);
      if (!isPasswordValid) {
        throw UserError.invalidCredentials();
      }

      // Supprimer le profil utilisateur s'il existe
      const profile = await this.userProfileRepository.findByUserId(userId);
      if (profile) {
        await this.userProfileRepository.delete(profile.getId());
      }

      // Supprimer l'utilisateur
      await this.userRepository.delete(userId);
    } catch (error) {
      if (error instanceof UserError) {
        throw error;
      }

      throw UserError.deleteFailed(error instanceof Error ? error.message : 'Unknown error');
    }
  }
}
