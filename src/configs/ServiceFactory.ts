// src/configs/ServiceFactory.ts
import {
  AddresseController,
  AuthController,
  CartItemController,
  OrderController,
  OrderItemController,
  ProductController,
  ProductImageController,
  TaxRateController,
  UserPaymentMethodController,
  UserProfileController,
  UserRoleController,
  UserSessionController
} from '@/controllers';
import type {
  IAddresseRepository,
  IAddresseService,
  IAuthService,
  ICartItemRepository,
  ICartItemService,
  ICookieManager,
  IOrderItemRepository,
  IOrderItemService,
  IOrderRepository,
  IOrderService,
  IPasswordHasher,
  IProductImageRepository,
  IProductImageService,
  IProductRepository,
  IProductService,
  ITaxRateRepository,
  ITaxRateService,
  ITokenManager,
  ITokenService,
  IUserPaymentMethodRepository,
  IUserPaymentMethodService,
  IUserProfileRepository,
  IUserProfileService,
  IUserRepository,
  IUserRoleRepository,
  IUserRoleService,
  IUserSessionRepository,
  IUserSessionService
} from '@/interfaces';
import {
  PostgresAddresseRepository,
  PostgresCartItemRepository,
  PostgresOrderItemRepository,
  PostgresOrderRepository,
  PostgresProductImageRepository,
  PostgresProductRepository,
  PostgresTaxRateRepository,
  PostgresUserPaymentMethodRepository,
  PostgresUserProfileRepository,
  PostgresUserRepository,
  PostgresUserRolesRepository,
  PostgresUserSessionRepository
} from '@/repositories';
import {
  AddresseService,
  AuthService,
  CartItemService,
  OrderItemService,
  OrderService,
  ProductImageService,
  ProductService,
  TaxRateService,
  TokenService,
  UserPaymentMethodService,
  UserProfilesService,
  UserRoleService,
  UserSessionsService
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

  private static orderItemController: OrderItemController;
  private static orderItemService: IOrderItemService;
  private static orderItemRepository: IOrderItemRepository;

  private static orderController: OrderController;
  private static orderService: IOrderService;
  private static orderRepository: IOrderRepository;

  private static productImageController: ProductImageController;
  private static productImageService: IProductImageService;
  private static productImageRepository: IProductImageRepository;

  private static userPaymentMethodController: UserPaymentMethodController;
  private static userPaymentMethodService: IUserPaymentMethodService;
  private static userPaymentMethodRepository: IUserPaymentMethodRepository;

  private static userProfileController: UserProfileController;
  private static userProfileService: IUserProfileService;
  private static userProfileRepository: IUserProfileRepository;

  private static userRoleController: UserRoleController;
  private static userRoleService: IUserRoleService;
  private static userRoleRepository: IUserRoleRepository;

  private static userSessionController: UserSessionController;
  private static userSessionService: IUserSessionService;
  private static userSessionRepository: IUserSessionRepository;

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

  public static getOrderItemRepository(): IOrderItemRepository {
    if (!ServiceFactory.orderItemRepository) {
      ServiceFactory.orderItemRepository = new PostgresOrderItemRepository();
    }
    return ServiceFactory.orderItemRepository;
  }

  public static getProductImageRepository(): IProductImageRepository {
    if (!ServiceFactory.productImageRepository) {
      ServiceFactory.productImageRepository = new PostgresProductImageRepository();
    }
    return ServiceFactory.productImageRepository;
  }

  public static getUserRoleRepository(): IUserRoleRepository {
    if (!ServiceFactory.userRoleRepository) {
      ServiceFactory.userRoleRepository = new PostgresUserRolesRepository();
    }
    return ServiceFactory.userRoleRepository;
  }

  public static getUserSessionRepository(): IUserSessionRepository {
    if (!ServiceFactory.userSessionRepository) {
      ServiceFactory.userSessionRepository = new PostgresUserSessionRepository();
    }
    return ServiceFactory.userSessionRepository;
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

  public static getOrderRepository(): IOrderRepository {
    if (!ServiceFactory.orderRepository) {
      ServiceFactory.orderRepository = new PostgresOrderRepository();
    }
    return ServiceFactory.orderRepository;
  }

  public static getUserPaymentMethodRepository(): IUserPaymentMethodRepository {
    if (!ServiceFactory.userPaymentMethodRepository) {
      ServiceFactory.userPaymentMethodRepository = new PostgresUserPaymentMethodRepository();
    }
    return ServiceFactory.userPaymentMethodRepository;
  }

  public static getUserProfileRepository(): IUserProfileRepository {
    if (!ServiceFactory.userProfileRepository) {
      ServiceFactory.userProfileRepository = new PostgresUserProfileRepository();
    }
    return ServiceFactory.userProfileRepository;
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

  public static getOrderItemService(): IOrderItemService {
    if (!ServiceFactory.orderItemService) {
      const orderItemRepository = ServiceFactory.getOrderItemRepository();
      ServiceFactory.orderItemService = new OrderItemService(orderItemRepository);
    }
    return ServiceFactory.orderItemService;
  }

  public static getOrderService(): IOrderService {
    if (!ServiceFactory.orderService) {
      const orderRepository = ServiceFactory.getOrderRepository();
      ServiceFactory.orderService = new OrderService(orderRepository);
    }
    return ServiceFactory.orderService;
  }

  public static getProductImageService(): IProductImageService {
    if (!ServiceFactory.productImageService) {
      const productImageRepository = ServiceFactory.getProductImageRepository();
      ServiceFactory.productImageService = new ProductImageService(productImageRepository);
    }
    return ServiceFactory.productImageService;
  }

  public static getUserPaymentMethodService(): IUserPaymentMethodService {
    if (!ServiceFactory.userPaymentMethodService) {
      const userPaymentMethodRepository = ServiceFactory.getUserPaymentMethodRepository();
      ServiceFactory.userPaymentMethodService = new UserPaymentMethodService(
        userPaymentMethodRepository
      );
    }
    return ServiceFactory.userPaymentMethodService;
  }

  public static getUserProfileService(): IUserProfileService {
    if (!ServiceFactory.userProfileService) {
      const userProfileRepository = ServiceFactory.getUserProfileRepository();
      ServiceFactory.userProfileService = new UserProfilesService(userProfileRepository);
    }
    return ServiceFactory.userProfileService;
  }

  public static getUserRoleService(): IUserRoleService {
    if (!ServiceFactory.userRoleService) {
      const userRoleRepository = ServiceFactory.getUserRoleRepository();
      ServiceFactory.userRoleService = new UserRoleService(userRoleRepository);
    }
    return ServiceFactory.userRoleService;
  }

  public static getUserSessionService(): IUserSessionService {
    if (!ServiceFactory.userSessionService) {
      const userSessionRepository = ServiceFactory.getUserSessionRepository();
      ServiceFactory.userSessionService = new UserSessionsService(userSessionRepository);
    }
    return ServiceFactory.userSessionService;
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

  public static getOrderItemController(): OrderItemController {
    if (!ServiceFactory.orderItemController) {
      console.log('🏭 Creating OrderItemController...');
      const orderItemService: IOrderItemService = ServiceFactory.getOrderItemService();
      // Vérifications debug
      console.log('🔧 Dependencies check', {
        hasAuthService: !!orderItemService
      });

      ServiceFactory.orderItemController = new OrderItemController(orderItemService);
    }
    return ServiceFactory.orderItemController;
  }

  public static getOrderController(): OrderController {
    if (!ServiceFactory.orderController) {
      console.log('🏭 Creating OrderController...');
      const orderService: IOrderService = ServiceFactory.getOrderService();
      // Vérifications debug
      console.log('🔧 Dependencies check', {
        hasAuthService: !!orderService
      });

      ServiceFactory.orderController = new OrderController(orderService);
    }
    return ServiceFactory.orderController;
  }

  public static getProductImageController(): ProductImageController {
    if (!ServiceFactory.productImageController) {
      console.log('🏭 Creating ProductImageController...');
      const productImageService: IProductImageService = ServiceFactory.getProductImageService();
      // Vérifications debug
      console.log('🔧 Dependencies check', {
        hasAuthService: !!productImageService
      });

      ServiceFactory.productImageController = new ProductImageController(productImageService);
    }
    return ServiceFactory.productImageController;
  }

  public static getUserPaymentMethodController(): UserPaymentMethodController {
    if (!ServiceFactory.userPaymentMethodController) {
      console.log('🏭 Creating UserPaymentMethodController...');
      const userPaymentMethodService: IUserPaymentMethodService =
        ServiceFactory.getUserPaymentMethodService();
      // Vérifications debug
      console.log('🔧 Dependencies check', {
        hasAuthService: !!userPaymentMethodService
      });

      ServiceFactory.userPaymentMethodController = new UserPaymentMethodController(
        userPaymentMethodService
      );
    }
    return ServiceFactory.userPaymentMethodController;
  }

  public static getUserProfileController(): UserProfileController {
    if (!ServiceFactory.userProfileController) {
      console.log('🏭 Creating UserProfileController...');
      const userProfileService: IUserProfileService = ServiceFactory.getUserProfileService();
      // Vérifications debug
      console.log('🔧 Dependencies check', {
        hasAuthService: !!userProfileService
      });

      ServiceFactory.userProfileController = new UserProfileController(userProfileService);
    }
    return ServiceFactory.userProfileController;
  }

  public static getUserRoleController(): UserRoleController {
    if (!ServiceFactory.userRoleController) {
      console.log('🏭 Creating UserRoleController...');
      const userRoleService: IUserRoleService = ServiceFactory.getUserRoleService();
      // Vérifications debug
      console.log('🔧 Dependencies check', {
        hasAuthService: !!userRoleService
      });

      ServiceFactory.userRoleController = new UserRoleController(userRoleService);
    }
    return ServiceFactory.userRoleController;
  }

  public static getUserSessionController(): UserSessionController {
    if (!ServiceFactory.userSessionController) {
      console.log('🏭 Creating UserSessionController...');
      const userSessionService: IUserSessionService = ServiceFactory.getUserSessionService();
      // Vérifications debug
      console.log('🔧 Dependencies check', {
        hasAuthService: !!userSessionService
      });

      ServiceFactory.userSessionController = new UserSessionController(userSessionService);
    }
    return ServiceFactory.userSessionController;
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
    ServiceFactory.orderItemController = undefined as unknown as OrderItemController;
    ServiceFactory.orderController = undefined as unknown as OrderController;
    ServiceFactory.productImageController = undefined as unknown as ProductImageController;
    ServiceFactory.userPaymentMethodController =
      undefined as unknown as UserPaymentMethodController;
    ServiceFactory.userProfileController = undefined as unknown as UserProfileController;
    ServiceFactory.userRoleController = undefined as unknown as UserRoleController;
    ServiceFactory.userSessionController = undefined as unknown as UserSessionController;
  }
}
