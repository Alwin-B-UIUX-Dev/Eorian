// src/services/AuthService.ts
import { RoleEnum } from '@/constants';
import type { LoginDto, RegisterUserDto } from '@/dtos';
import { ConflictError, UserError } from '@/exceptions';
import type { IAuthService, IPasswordHasher, IUser, IUserRepository } from '@/interfaces';
import type { CreateUserData } from '@/types';

export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  public async register(registerUserDto: RegisterUserDto): Promise<IUser> {
    try {
      // ÉTAPE 1 : Vérifications séparées pour messages d'erreur précis
      const existingUserByEmail: IUser = await this.userRepository.findByEmail(
        registerUserDto.getEmail()
      );

      if (existingUserByEmail) {
        throw UserError.emailExists(registerUserDto.getEmail());
      }

      const existingUserByUsername: IUser = await this.userRepository.findByUsername(
        registerUserDto.getUsername()
      );

      if (existingUserByUsername) {
        throw UserError.usernameExists(registerUserDto.getUsername());
      }
      // ÉTAPE 2 : Hash password
      const passwordHash: string = await this.passwordHasher.hash(registerUserDto.getPassword());

      // ÉTAPE 3 : Création userData pour repository
      const userData: CreateUserData = {
        email: registerUserDto.getEmail(),
        username: registerUserDto.getUsername(),
        passwordHash: passwordHash,
        roleId: RoleEnum.CUSTOMER,
        isActive: true,
        isConnected: false,
        emailVerified: false,
        gdprConsent: registerUserDto.getGdprConsent(),
        gdprConsentDate: new Date(),
        lastLoginAt: undefined
      };

      // ÉTAPE 4 : Création utilisateur
      return await this.userRepository.create(userData);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS register():', error);
      // Si c'est déjà une ApiError, on la laisse passer
      if (error instanceof UserError || error instanceof ConflictError) {
        throw error;
      }
      // Sinon, on transforme l'erreur technique
      throw UserError.creation(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  public async login(loginDto: LoginDto): Promise<IUser> {
    try {
      // 🔍 ÉTAPE 1 : Recherche utilisateur par email OU username
      const user: IUser = await this.userRepository.findByEmailOrUsername(
        loginDto.getIdentifier() // identifier = email OU username
      );

      if (!user) {
        throw UserError.invalidCredentials(); // ⚠️ Message générique sécurisé
      }

      console.log(
        'user.getPasswordHash()',
        user.getPasswordHash(),
        'loginDto.getPassword()',
        loginDto.getPassword()
      );
      // ÉTAPE 2 : Vérification mot de passe
      const isPasswordValid: boolean = await this.passwordHasher.verify(
        user.getPasswordHash(),
        loginDto.getPassword()
      );

      if (!isPasswordValid) {
        throw UserError.invalidCredentials(); // Même message = pas d'énumération
      }

      // ÉTAPE 3 : Vérifications état utilisateur
      if (!user.getIsActive()) {
        throw UserError.accountDeactivated();
      }

      if (!user.getEmailVerified()) {
        throw UserError.emailNotVerified();
      }

      // ÉTAPE 4 : Mise à jour statut connexion
      await this.userRepository.updateLoginStatus(
        user.getId(),
        true, // isConnected = true
        new Date() // lastLoginAt = now
      );

      // 🎯 ÉTAPE 5 : Retourner utilisateur authentifié
      return user;
    } catch (error) {
      console.error('ERREUR TECHNIQUE DANS login():', error);

      // Si c'est déjà une ApiError, on la laisse passer
      if (error instanceof UserError) {
        throw error;
      }

      // Sinon, on transforme l'erreur technique
      throw UserError.authenticationFailed(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  public async logout(userId: string): Promise<void> {
    try {
      await this.userRepository.updateLoginStatus(
        userId,
        false, // isConnected = false
        new Date() // lastLoginAt = now
      );
    } catch (error) {
      console.error('ERREUR TECHNIQUE DANS logout():', error);
      throw UserError.logoutFailed(error instanceof Error ? error.message : 'Unknown error');
    }
  }
}
