// src/configs/ServiceFactory.ts
import { AuthController, TaxeRateController } from '@/controllers';
import { UserRoleController } from '@/controllers/user/UserRoleController';
import type {
  IAuthService,
  ICookieManager,
  IPasswordHasher,
  ITaxeRateRepository,
  ITaxeRateService,
  ITokenManager,
  ITokenService,
  IUserRepository,
  IUserSessionRepository
} from '@/interfaces';
import type { IUserRoleRepository } from '@/interfaces/repositories/user/IUserRoleRepository';
import type { IUserRoleService } from '@/interfaces/services/user/IUserRoleService';
import { PostgresTaxeRateRepository } from '@/repositories';
import {
  PostgresUserRepository,
  PostgresUserRoleRepository,
  PostgresUserSessionRepository
} from '@/repositories/user';
import { AuthService, TaxeRateService, TokenService } from '@/services';
import { UserRoleService } from '@/services/user/UserRoleService';
import { CookieManager, PasswordHasher, TokenManager } from '@/utils';

export class ServiceFactory {
  // Cache simple avec interfaces
  private static userRepository: IUserRepository;
  private static sessionRepository: IUserSessionRepository;
  private static passwordHasher: IPasswordHasher;
  private static tokenManager: ITokenManager;
  private static cookieManager: ICookieManager;
  private static authService: IAuthService;
  private static tokenService: ITokenService;
  private static authController: AuthController;
  private static userRoleController: UserRoleController;
  private static userRoleRepository: IUserRoleRepository;
  private static userRoleService: IUserRoleService;

  private static taxeRateController: TaxeRateController;
  private static taxeRateRepository: ITaxeRateRepository;
  private static taxeRateService: ITaxeRateService;

  // Repositories
  public static getUserRepository(): IUserRepository {
    if (!ServiceFactory.userRepository) {
      ServiceFactory.userRepository = new PostgresUserRepository();
    }
    return ServiceFactory.userRepository;
  }

  public static getSessionRepository(): IUserSessionRepository {
    if (!ServiceFactory.sessionRepository) {
      ServiceFactory.sessionRepository = new PostgresUserSessionRepository();
    }
    return ServiceFactory.sessionRepository;
  }

  // User Roles
  public static getUserRoleRepository(): IUserRoleRepository {
    if (!ServiceFactory.userRoleRepository) {
      ServiceFactory.userRoleRepository = new PostgresUserRoleRepository();
    }
    return ServiceFactory.userRoleRepository;
  }

  public static getUserRoleService(): IUserRoleService {
    if (!ServiceFactory.userRoleService) {
      ServiceFactory.userRoleService = new UserRoleService(ServiceFactory.getUserRoleRepository());
    }
    return ServiceFactory.userRoleService;
  }

  public static getUserRoleController(): UserRoleController {
    if (!ServiceFactory.userRoleController) {
      ServiceFactory.userRoleController = new UserRoleController(
        ServiceFactory.getUserRoleService()
      );
    }
    return ServiceFactory.userRoleController;
  }

  // Taxe Rates
  public static getTaxeRateRepository(): ITaxeRateRepository {
    if (!ServiceFactory.taxeRateRepository) {
      ServiceFactory.taxeRateRepository = new PostgresTaxeRateRepository();
    }
    return ServiceFactory.taxeRateRepository;
  }

  public static getTaxeRateService(): ITaxeRateService {
    if (!ServiceFactory.taxeRateService) {
      ServiceFactory.taxeRateService = new TaxeRateService(ServiceFactory.getTaxeRateRepository());
    }
    return ServiceFactory.taxeRateService;
  }

  public static getTaxeRateController(): TaxeRateController {
    if (!ServiceFactory.taxeRateController) {
      ServiceFactory.taxeRateController = new TaxeRateController(
        ServiceFactory.getTaxeRateService()
      );
    }
    return ServiceFactory.taxeRateController;
  }

  // Utils
  public static getPasswordHasher(): IPasswordHasher {
    if (!ServiceFactory.passwordHasher) {
      ServiceFactory.passwordHasher = new PasswordHasher();
    }
    return ServiceFactory.passwordHasher;
  }

  public static getTokenManager(): ITokenManager {
    if (!ServiceFactory.tokenManager) {
      ServiceFactory.tokenManager = new TokenManager();
    }
    return ServiceFactory.tokenManager;
  }

  public static getCookieManager(): ICookieManager {
    if (!ServiceFactory.cookieManager) {
      ServiceFactory.cookieManager = new CookieManager();
    }
    return ServiceFactory.cookieManager;
  }

  // Services
  public static getAuthService(): IAuthService {
    if (!ServiceFactory.authService) {
      console.log('🏭 Creating AuthService...');

      const userRepository: IUserRepository = ServiceFactory.getUserRepository();
      const passwordHasher: IPasswordHasher = ServiceFactory.getPasswordHasher();
      console.log('🔧 AuthService dependencies', {
        hasUserRepo: !!userRepository,
        hasPasswordHasher: !!passwordHasher
      });
      ServiceFactory.authService = new AuthService(userRepository, passwordHasher);
    }
    return ServiceFactory.authService;
  }

  public static getTokenService(): ITokenService {
    if (!ServiceFactory.tokenService) {
      const tokenManager = ServiceFactory.getTokenManager();
      const sessionRepository = ServiceFactory.getSessionRepository();
      ServiceFactory.tokenService = new TokenService(tokenManager, sessionRepository);
    }
    return ServiceFactory.tokenService;
  }

  // Controllers
  public static getAuthController(): AuthController {
    if (!ServiceFactory.authController) {
      console.log('🏭 Creating AuthController...');
      const authService: IAuthService = ServiceFactory.getAuthService();
      const tokenService: ITokenService = ServiceFactory.getTokenService();
      const cookieManager: ICookieManager = ServiceFactory.getCookieManager();
      // Vérifications debug
      console.log('🔧 Dependencies check', {
        hasAuthService: !!authService,
        hasTokenService: !!tokenService,
        hasCookieManager: !!cookieManager
      });

      ServiceFactory.authController = new AuthController(authService, tokenService, cookieManager);
    }
    return ServiceFactory.authController;
  }

  // Reset pour les tests
  public static reset(): void {
    ServiceFactory.userRepository = undefined as unknown as IUserRepository;
    ServiceFactory.sessionRepository = undefined as unknown as IUserSessionRepository;
    ServiceFactory.passwordHasher = undefined as unknown as IPasswordHasher;
    ServiceFactory.tokenManager = undefined as unknown as ITokenManager;
    ServiceFactory.cookieManager = undefined as unknown as ICookieManager;
    ServiceFactory.authService = undefined as unknown as IAuthService;
    ServiceFactory.tokenService = undefined as unknown as ITokenService;
    ServiceFactory.authController = undefined as unknown as AuthController;
    ServiceFactory.userRoleController = undefined as unknown as UserRoleController;
    ServiceFactory.userRoleRepository = undefined as unknown as IUserRoleRepository;
    ServiceFactory.userRoleService = undefined as unknown as IUserRoleService;
    ServiceFactory.taxeRateController = undefined as unknown as TaxeRateController;
    ServiceFactory.taxeRateRepository = undefined as unknown as ITaxeRateRepository;
    ServiceFactory.taxeRateService = undefined as unknown as ITaxeRateService;
  }
}
