// src/configs/ServiceFactory.ts

import { logger } from '@/configs';
import {
  AddressController,
  AuthController,
  CartItemController,
  OrderController,
  OrderItemController,
  ProductController,
  TaxeRateController,
  UserController,
  UserProfileController,
  UserRoleController
} from '@/controllers';
import type {
  IAddressRepository,
  IAddressService,
  IAuthService,
  ICartItemRepository,
  ICartItemService,
  ICookieManager,
  IOrderItemRepository,
  IOrderItemService,
  IOrderRepository,
  IOrderService,
  IPasswordHasher,
  IProductRepository,
  IProductService,
  ITaxeRateRepository,
  ITaxeRateService,
  ITokenManager,
  ITokenService,
  IUserProfileRepository,
  IUserProfileService,
  IUserRepository,
  IUserRoleRepository,
  IUserService,
  IUserSessionRepository
} from '@/interfaces';
import type { IUserRoleService } from '@/interfaces/services/user/IUserRoleService';
import {
  PostgresAddressRepository,
  PostgresCartItemRepository,
  PostgresOrderItemRepository,
  PostgresOrderRepository,
  PostgresProductRepository,
  PostgresTaxeRateRepository,
  PostgresUserProfileRepository,
  PostgresUserRepository,
  PostgresUserRoleRepository,
  PostgresUserSessionRepository
} from '@/repositories';
import {
  AddressService,
  AuthService,
  CartItemService,
  OrderItemService,
  OrderService,
  ProductService,
  TaxeRateService,
  TokenService,
  UserService
} from '@/services';
import { UserProfileService } from '@/services/user/UserProfileService';
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
  private static userService: IUserService;
  private static userController: UserController;

  private static userProfileController: UserProfileController;
  private static userProfileRepository: IUserProfileRepository;
  private static userProfileService: IUserProfileService;

  private static userRoleController: UserRoleController;
  private static userRoleRepository: IUserRoleRepository;
  private static userRoleService: IUserRoleService;

  private static taxeRateController: TaxeRateController;
  private static taxeRateRepository: ITaxeRateRepository;
  private static taxeRateService: ITaxeRateService;

  private static productController: ProductController;
  private static productRepository: IProductRepository;
  private static productService: IProductService;

  private static cartItemController: CartItemController;
  private static cartItemRepository: ICartItemRepository;
  private static cartItemService: ICartItemService;

  private static addressController: AddressController;
  private static addressRepository: IAddressRepository;
  private static addressService: IAddressService;

  private static orderController: OrderController;
  private static orderRepository: IOrderRepository;
  private static orderService: IOrderService;

  private static orderItemController: OrderItemController;
  private static orderItemRepository: IOrderItemRepository;
  private static orderItemService: IOrderItemService;

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

  // User Profiles
  public static getUserProfileRepository(): IUserProfileRepository {
    if (!ServiceFactory.userProfileRepository) {
      ServiceFactory.userProfileRepository = new PostgresUserProfileRepository();
    }
    return ServiceFactory.userProfileRepository;
  }

  public static getUserProfileService(): IUserProfileService {
    if (!ServiceFactory.userProfileService) {
      ServiceFactory.userProfileService = new UserProfileService(
        ServiceFactory.getUserProfileRepository()
      );
    }
    return ServiceFactory.userProfileService;
  }

  public static getUserProfileController(): UserProfileController {
    if (!ServiceFactory.userProfileController) {
      ServiceFactory.userProfileController = new UserProfileController(
        ServiceFactory.getUserProfileService()
      );
    }
    return ServiceFactory.userProfileController;
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

  // Products
  public static getProductRepository(): IProductRepository {
    if (!ServiceFactory.productRepository) {
      ServiceFactory.productRepository = new PostgresProductRepository();
    }
    return ServiceFactory.productRepository;
  }

  public static getProductService(): IProductService {
    if (!ServiceFactory.productService) {
      ServiceFactory.productService = new ProductService(ServiceFactory.getProductRepository());
    }
    return ServiceFactory.productService;
  }

  public static getProductController(): ProductController {
    if (!ServiceFactory.productController) {
      ServiceFactory.productController = new ProductController(ServiceFactory.getProductService());
    }
    return ServiceFactory.productController;
  }

  // Cart Items
  public static getCartItemRepository(): ICartItemRepository {
    if (!ServiceFactory.cartItemRepository) {
      ServiceFactory.cartItemRepository = new PostgresCartItemRepository();
    }
    return ServiceFactory.cartItemRepository;
  }

  public static getCartItemService(): ICartItemService {
    if (!ServiceFactory.cartItemService) {
      ServiceFactory.cartItemService = new CartItemService(ServiceFactory.getCartItemRepository());
    }
    return ServiceFactory.cartItemService;
  }

  public static getCartItemController(): CartItemController {
    if (!ServiceFactory.cartItemController) {
      ServiceFactory.cartItemController = new CartItemController(
        ServiceFactory.getCartItemService()
      );
    }
    return ServiceFactory.cartItemController;
  }

  // Addresses
  public static getAddressRepository(): IAddressRepository {
    if (!ServiceFactory.addressRepository) {
      ServiceFactory.addressRepository = new PostgresAddressRepository();
    }
    return ServiceFactory.addressRepository;
  }

  public static getAddressService(): IAddressService {
    if (!ServiceFactory.addressService) {
      ServiceFactory.addressService = new AddressService(ServiceFactory.getAddressRepository());
    }
    return ServiceFactory.addressService;
  }

  public static getAddressController(): AddressController {
    if (!ServiceFactory.addressController) {
      ServiceFactory.addressController = new AddressController(ServiceFactory.getAddressService());
    }
    return ServiceFactory.addressController;
  }

  // Orders
  public static getOrderRepository(): IOrderRepository {
    if (!ServiceFactory.orderRepository) {
      ServiceFactory.orderRepository = new PostgresOrderRepository();
    }
    return ServiceFactory.orderRepository;
  }

  public static getOrderService(): IOrderService {
    if (!ServiceFactory.orderService) {
      ServiceFactory.orderService = new OrderService(ServiceFactory.getOrderRepository());
    }
    return ServiceFactory.orderService;
  }

  public static getOrderController(): OrderController {
    if (!ServiceFactory.orderController) {
      ServiceFactory.orderController = new OrderController(ServiceFactory.getOrderService());
    }
    return ServiceFactory.orderController;
  }

  // Order Items
  public static getOrderItemRepository(): IOrderItemRepository {
    if (!ServiceFactory.orderItemRepository) {
      ServiceFactory.orderItemRepository = new PostgresOrderItemRepository();
    }
    return ServiceFactory.orderItemRepository;
  }

  public static getOrderItemService(): IOrderItemService {
    if (!ServiceFactory.orderItemService) {
      ServiceFactory.orderItemService = new OrderItemService(
        ServiceFactory.getOrderItemRepository()
      );
    }
    return ServiceFactory.orderItemService;
  }

  public static getOrderItemController(): OrderItemController {
    if (!ServiceFactory.orderItemController) {
      ServiceFactory.orderItemController = new OrderItemController(
        ServiceFactory.getOrderItemService()
      );
    }
    return ServiceFactory.orderItemController;
  }

  // Services
  public static getAuthService(): IAuthService {
    if (!ServiceFactory.authService) {
      logger.info('🏭 Creating AuthService...');

      const userRepository: IUserRepository = ServiceFactory.getUserRepository();
      const passwordHasher: IPasswordHasher = ServiceFactory.getPasswordHasher();
      logger.info('🔧 AuthService dependencies', {
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
      logger.info('🏭 Creating AuthController...');
      const authService: IAuthService = ServiceFactory.getAuthService();
      const tokenService: ITokenService = ServiceFactory.getTokenService();
      const cookieManager: ICookieManager = ServiceFactory.getCookieManager();
      // Vérifications debug
      logger.info('🔧 Dependencies check', {
        hasAuthService: !!authService,
        hasTokenService: !!tokenService,
        hasCookieManager: !!cookieManager
      });

      ServiceFactory.authController = new AuthController(authService, tokenService, cookieManager);
    }
    return ServiceFactory.authController;
  }

  // User Service
  public static getUserService(): IUserService {
    if (!ServiceFactory.userService) {
      logger.info('🏭 Creating UserService...');
      const userRepository: IUserRepository = ServiceFactory.getUserRepository();
      const passwordHasher: IPasswordHasher = ServiceFactory.getPasswordHasher();
      logger.info('🔧 UserService dependencies', {
        hasUserRepo: !!userRepository,
        hasPasswordHasher: !!passwordHasher
      });
      ServiceFactory.userService = new UserService(userRepository, passwordHasher);
    }
    return ServiceFactory.userService;
  }

  // User Controller
  public static getUserController(): UserController {
    if (!ServiceFactory.userController) {
      logger.info('🏭 Creating UserController...');
      const userService: IUserService = ServiceFactory.getUserService();
      logger.info('🔧 UserController dependencies', {
        hasUserService: !!userService
      });
      ServiceFactory.userController = new UserController(userService);
    }
    return ServiceFactory.userController;
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
    ServiceFactory.userService = undefined as unknown as IUserService;
    ServiceFactory.userController = undefined as unknown as UserController;
    ServiceFactory.userProfileController = undefined as unknown as UserProfileController;
    ServiceFactory.userProfileRepository = undefined as unknown as IUserProfileRepository;
    ServiceFactory.userProfileService = undefined as unknown as IUserProfileService;
    ServiceFactory.userRoleController = undefined as unknown as UserRoleController;
    ServiceFactory.userRoleRepository = undefined as unknown as IUserRoleRepository;
    ServiceFactory.userRoleService = undefined as unknown as IUserRoleService;
    ServiceFactory.taxeRateController = undefined as unknown as TaxeRateController;
    ServiceFactory.taxeRateRepository = undefined as unknown as ITaxeRateRepository;
    ServiceFactory.taxeRateService = undefined as unknown as ITaxeRateService;
    ServiceFactory.productController = undefined as unknown as ProductController;
    ServiceFactory.productRepository = undefined as unknown as IProductRepository;
    ServiceFactory.productService = undefined as unknown as IProductService;
    ServiceFactory.cartItemController = undefined as unknown as CartItemController;
    ServiceFactory.cartItemRepository = undefined as unknown as ICartItemRepository;
    ServiceFactory.cartItemService = undefined as unknown as ICartItemService;
    ServiceFactory.addressController = undefined as unknown as AddressController;
    ServiceFactory.addressRepository = undefined as unknown as IAddressRepository;
    ServiceFactory.addressService = undefined as unknown as IAddressService;
    ServiceFactory.orderController = undefined as unknown as OrderController;
    ServiceFactory.orderRepository = undefined as unknown as IOrderRepository;
    ServiceFactory.orderService = undefined as unknown as IOrderService;
    ServiceFactory.orderItemController = undefined as unknown as OrderItemController;
    ServiceFactory.orderItemRepository = undefined as unknown as IOrderItemRepository;
    ServiceFactory.orderItemService = undefined as unknown as IOrderItemService;
  }
}
