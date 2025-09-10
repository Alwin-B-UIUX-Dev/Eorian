// src/configs/ServiceFactory.ts
import { AuthController, ProductController } from '@/controllers';
import type {
  IAuthService,
  ICookieManager,
  IPasswordHasher,
  IProductRepository,
  IProductService,
  ITokenManager,
  ITokenService,
  IUserRepository,
  IUserSessionRepository
} from '@/interfaces';
import { PostgresProductRepository } from '@/repositories';
import { PostgresUserRepository, PostgresUserSessionRepository } from '@/repositories/user';
import { AuthService, ProductService, TokenService } from '@/services';
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

  // TODO Ajouter les nouveau services ICI pour chaque donné 1
  private static productController: ProductController;
  private static productService: IProductService;
  private static productRepository: IProductRepository;

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

  // TODO Ajouter les nouveau services ICI pour chaque donné 2
  public static getProductRepository(): IProductRepository {
    if (!ServiceFactory.productRepository) {
      ServiceFactory.productRepository = new PostgresProductRepository();
    }
    return ServiceFactory.productRepository;
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

  // TODO Ajouter les nouveau services ICI pour chaque donné 3
  public static getProductService(): IProductService {
    if (!ServiceFactory.productService) {
      const productRepository = ServiceFactory.getProductRepository();
      ServiceFactory.productService = new ProductService(productRepository);
    }
    return ServiceFactory.productService;
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

  // TODO Ajouter les nouveau services ICI pour chaque donné 4
  public static getProductController(): ProductController {
    if (!ServiceFactory.productController) {
      console.log('🏭 Creating ProductController...');
      const productService: IProductService = ServiceFactory.getProductService();
      // Vérifications debug
      console.log('🔧 Dependencies check', {
        hasAuthService: !!productService
      });

      ServiceFactory.productController = new ProductController(productService);
    }
    return ServiceFactory.productController;
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

  // TODO Ajouter les nouveau services ICI pour chaque donné 5
    ServiceFactory.productController = undefined as unknown as ProductController;
  }
}
