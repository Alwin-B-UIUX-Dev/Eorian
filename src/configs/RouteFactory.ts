// src/configs/RouteFactory.ts
import { Router } from 'express';
import { logger, ServiceFactory } from '@/configs';
import type { ITokenManager } from '@/interfaces';
import {
  AuthRoutes,
  CartItemRoutes,
  ProductRoutes,
  TaxeRateRoutes,
  UserRoleRoutes
} from '@/routes';

export class RouteFactory {
  private static router: Router;

  public static configureRoutes(): Router {
    if (RouteFactory.router) return RouteFactory.router;

    RouteFactory.router = Router();

    RouteFactory.registerAuthRoutes();
    RouteFactory.registerUserRoleRoutes();
    RouteFactory.registerTaxeRateRoutes();
    RouteFactory.registerProductRoutes();
    RouteFactory.registerCartItemRoutes();

    logger.info('🛣️ Routes configured');
    return RouteFactory.router;
  }

  private static registerAuthRoutes(): void {
    const authController = ServiceFactory.getAuthController();
    const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
    const authRoutes = new AuthRoutes(authController, tokenManager);

    RouteFactory.router.use('/api/v1', authRoutes.getRouter());
  }

  private static registerUserRoleRoutes(): void {
    const userRoleController = ServiceFactory.getUserRoleController();
    const userRoleRoutes = new UserRoleRoutes(userRoleController);
    RouteFactory.router.use('/api/v1', userRoleRoutes.getRouter());
  }

  private static registerTaxeRateRoutes(): void {
    const taxeRateController = ServiceFactory.getTaxeRateController();
    const taxeRateRoutes = new TaxeRateRoutes(taxeRateController);
    RouteFactory.router.use('/api/v1', taxeRateRoutes.getRouter());
  }

  private static registerProductRoutes(): void {
    const productController = ServiceFactory.getProductController();
    const productRoutes = new ProductRoutes(productController);
    RouteFactory.router.use('/api/v1', productRoutes.getRouter());
  }

  private static registerCartItemRoutes(): void {
    const cartItemController = ServiceFactory.getCartItemController();
    const cartItemRoutes = new CartItemRoutes(cartItemController);
    RouteFactory.router.use('/api/v1', cartItemRoutes.getRouter());
  }

  public static reset(): void {
    RouteFactory.router = undefined as unknown as Router;
  }
}
