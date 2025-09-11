// src/configs/ServiceFactory.ts
import {
  AddresseController,
  AuthController,
  CartItemController,
  ProductController,
  TaxRateController
} from '@/controllers';
import type {
  IAddresseRepository,
  IAddresseService,
  IAuthService,
  ICartItemRepository,
  ICartItemService,
  ICookieManager,
  IPasswordHasher,
  IProductRepository,
  IProductService,
  ITaxRateRepository,
  ITaxRateService,
  ITokenManager,
  ITokenService,
  IUserRepository,
  IUserSessionRepository
} from '@/interfaces';
import {
  PostgresAddresseRepository,
  PostgresCartItemRepository,
  PostgresProductRepository,
  PostgresTaxRateRepository,
  PostgresUserRepository,
  PostgresUserSessionRepository
} from '@/repositories';
import {
  AddresseService,
  AuthService,
  CartItemService,
  ProductService,
  TaxRateService,
  TokenService
} from '@/services';
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

  private static taxRateController: TaxRateController;
  private static taxRateService: ITaxRateService;
  private static taxRateRepository: ITaxRateRepository;

  private static addresseController: AddresseController;
  private static addresseService: AddresseService;
  private static addresseRepository: IAddresseRepository;

  private static cartItemController: CartItemController;
  private static cartItemService: ICartItemService;
  private static cartItemRepository: ICartItemRepository;

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

  // TODO Ajouter les nouveau repository ICI pour chaque donné 2
  public static getProductRepository(): IProductRepository {
    if (!ServiceFactory.productRepository) {
      ServiceFactory.productRepository = new PostgresProductRepository();
    }
    return ServiceFactory.productRepository;
  }

  public static getTaxRateRepository(): ITaxRateRepository {
    if (!ServiceFactory.taxRateRepository) {
      ServiceFactory.taxRateRepository = new PostgresTaxRateRepository();
    }
    return ServiceFactory.taxRateRepository;
  }

  public static getAddresseRepository(): IAddresseRepository {
    if (!ServiceFactory.addresseRepository) {
      ServiceFactory.addresseRepository = new PostgresAddresseRepository();
    }
    return ServiceFactory.addresseRepository;
  }

  public static getCartItemRepository(): ICartItemRepository {
    if (!ServiceFactory.cartItemRepository) {
      ServiceFactory.cartItemRepository = new PostgresCartItemRepository();
    }
    return ServiceFactory.cartItemRepository;
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

  public static getTaxRateService(): ITaxRateService {
    if (!ServiceFactory.taxRateService) {
      const taxRateRepository = ServiceFactory.getTaxRateRepository();
      ServiceFactory.taxRateService = new TaxRateService(taxRateRepository);
    }
    return ServiceFactory.taxRateService;
  }

  public static getAddresseService(): IAddresseService {
    if (!ServiceFactory.addresseService) {
      const addresseRepository = ServiceFactory.getAddresseRepository();
      ServiceFactory.addresseService = new AddresseService(addresseRepository);
    }
    return ServiceFactory.addresseService;
  }

  public static getCartItemService(): ICartItemService {
    if (!ServiceFactory.cartItemService) {
      const cartItemRepository = ServiceFactory.getCartItemRepository();
      ServiceFactory.cartItemService = new CartItemService(cartItemRepository);
    }
    return ServiceFactory.cartItemService;
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

  public static getTaxRateController(): TaxRateController {
    if (!ServiceFactory.taxRateController) {
      console.log('🏭 Creating TaxRateController...');
      const taxRateService: ITaxRateService = ServiceFactory.getTaxRateService();
      // Vérifications debug
      console.log('🔧 Dependencies check', {
        hasAuthService: !!taxRateService
      });

      ServiceFactory.taxRateController = new TaxRateController(taxRateService);
    }
    return ServiceFactory.taxRateController;
  }

  public static getAddresseController(): AddresseController {
    if (!ServiceFactory.addresseController) {
      console.log('🏭 Creating AddresseController...');
      const addresseService: IAddresseService = ServiceFactory.getAddresseService();
      // Vérifications debug
      console.log('🔧 Dependencies check', {
        hasAuthService: !!addresseService
      });

      ServiceFactory.addresseController = new AddresseController(addresseService);
    }
    return ServiceFactory.addresseController;
  }

  public static getCartItemController(): CartItemController {
    if (!ServiceFactory.cartItemController) {
      console.log('🏭 Creating CartItemController...');
      const cartItemService: ICartItemService = ServiceFactory.getCartItemService();
      // Vérifications debug
      console.log('🔧 Dependencies check', {
        hasAuthService: !!cartItemService
      });

      ServiceFactory.cartItemController = new CartItemController(cartItemService);
    }
    return ServiceFactory.cartItemController;
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
    ServiceFactory.taxRateController = undefined as unknown as TaxRateController;
    ServiceFactory.addresseController = undefined as unknown as AddresseController;
    ServiceFactory.cartItemController = undefined as unknown as CartItemController;
  }
}
