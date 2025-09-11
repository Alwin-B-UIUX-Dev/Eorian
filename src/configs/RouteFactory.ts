// src/configs/RouteFactory.ts
import { Router } from 'express';
import { logger } from '@/configs';
import { ServiceFactory } from '@/configs/ServiceFactory';
import type { ITokenManager } from '@/interfaces';
import {
  AddresseRoutes,
  AuthRoutes,
  CartItemRoutes,
  OrderItemRoutes,
  OrderRoutes,
  ProductImageRoutes,
  ProductRoutes,
  TaxRateRoutes,
  UserPaymentMethodRoutes,
  UserProfileRoutes,
  UserRoleRoutes,
  UserSessionRoutes
} from '@/routes';

export class RouteFactory {
  private static router: Router;

  public static configureRoutes(): Router {
    if (RouteFactory.router) return RouteFactory.router;

    RouteFactory.router = Router();

    // Enregistrement des routes
    RouteFactory.registerAuthRoutes();
    // RouteFactory.registerUserRoutes();

    // TODO Ajouter les nouveau services ICI pour chaque donné 1
    RouteFactory.registerProductRoutes();
    RouteFactory.registerTaxRateRoutes();
    RouteFactory.registerAddresseRoutes();
    RouteFactory.registerCartItemRoutes();
    RouteFactory.registerOrderItemRoutes();
    RouteFactory.registerOrderRoutes();
    RouteFactory.registerProductImageRoutes();
    RouteFactory.registerUserPaymentMethodRoutes();
    RouteFactory.registerUserProfileRoutes();
    RouteFactory.registerUserRoleRoutes();
    RouteFactory.registerUserSessionRoutes();

    logger.info('🛣️ Routes configured');
    return RouteFactory.router;
  }

  private static registerAuthRoutes(): void {
    const authController = ServiceFactory.getAuthController();
    const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
    const authRoutes = new AuthRoutes(authController, tokenManager);

    RouteFactory.router.use('/api/v1', authRoutes.getRouter());
  }

  // TODO Ajouter les nouveau services ICI pour chaque donné 2
  private static registerProductRoutes(): void {
    const productController = ServiceFactory.getProductController();
    // const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
    const productRoutes = new ProductRoutes(productController);

    RouteFactory.router.use('/api/v1', productRoutes.getRouter());
  }

  private static registerTaxRateRoutes(): void {
    const taxRateController = ServiceFactory.getTaxRateController();
    // const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
    const taxRateRoutes = new TaxRateRoutes(taxRateController);
    RouteFactory.router.use('/api/v1', taxRateRoutes.getRouter());
  }

  private static registerAddresseRoutes(): void {
    const addresseController = ServiceFactory.getAddresseController();
    // const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
    const addresseRoutes = new AddresseRoutes(addresseController);

    RouteFactory.router.use('/api/v1', addresseRoutes.getRouter());
  }

  private static registerCartItemRoutes(): void {
    const cartItemController = ServiceFactory.getCartItemController();
    // const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
    const cartItemRoutes = new CartItemRoutes(cartItemController);

    RouteFactory.router.use('/api/v1', cartItemRoutes.getRouter());
  }

  private static registerOrderItemRoutes(): void {
    const orderItemController = ServiceFactory.getOrderItemController();
    // const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
    const orderItemRoutes = new OrderItemRoutes(orderItemController);

    RouteFactory.router.use('/api/v1', orderItemRoutes.getRouter());
  }

  private static registerOrderRoutes(): void {
    const orderController = ServiceFactory.getOrderController();
    // const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
    const orderRoutes = new OrderRoutes(orderController);

    RouteFactory.router.use('/api/v1', orderRoutes.getRouter());
  }

  private static registerProductImageRoutes(): void {
    const productImageController = ServiceFactory.getProductImageController();
    // const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
    const productImageRoutes = new ProductImageRoutes(productImageController);

    RouteFactory.router.use('/api/v1', productImageRoutes.getRouter());
  }

  private static registerUserPaymentMethodRoutes(): void {
    const userPaymentMethodController = ServiceFactory.getUserPaymentMethodController();
    // const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
    const userPaymentMethodRoutes = new UserPaymentMethodRoutes(userPaymentMethodController);

    RouteFactory.router.use('/api/v1', userPaymentMethodRoutes.getRouter());
  }

  private static registerUserProfileRoutes(): void {
    const userProfileController = ServiceFactory.getUserProfileController();
    // const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
    const userProfileRoutes = new UserProfileRoutes(userProfileController);

    RouteFactory.router.use('/api/v1', userProfileRoutes.getRouter());
  }

  private static registerUserRoleRoutes(): void {
    const userRoleController = ServiceFactory.getUserRoleController();
    // const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
    const userRoleRoutes = new UserRoleRoutes(userRoleController);

    RouteFactory.router.use('/api/v1', userRoleRoutes.getRouter());
  }

  private static registerUserSessionRoutes(): void {
    const userRoleController = ServiceFactory.getUserSessionController();
    // const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
    const userRoleRoutes = new UserSessionRoutes(userRoleController);

    RouteFactory.router.use('/api/v1', userRoleRoutes.getRouter());
  }

  public static reset(): void {
    RouteFactory.router = undefined as unknown as Router;
  }
}
