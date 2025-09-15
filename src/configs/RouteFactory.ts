// src/configs/RouteFactory.ts
import { Router } from 'express';
import { logger } from '@/configs';
import { ServiceFactory } from '@/configs/ServiceFactory';
import type { ITokenManager } from '@/interfaces';
import { AuthRoutes, ProductRoutes, TaxeRateRoutes } from '@/routes';
import { UserRoleRoutes } from '@/routes/UserRoleRoutes';

export class RouteFactory {
  private static router: Router;

  public static configureRoutes(): Router {
    if (RouteFactory.router) return RouteFactory.router;

    RouteFactory.router = Router();

    // Enregistrement des routes
    RouteFactory.registerAuthRoutes();
    RouteFactory.registerUserRoleRoutes();
    RouteFactory.registerTaxeRateRoutes();
    RouteFactory.registerProductRoutes();
    // RouteFactory.registerUserRoutes();
    // RouteFactory.registerProductRoutes();

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

  // private static registerUserRoutes(): void {
  //   const userController = ServiceFactory.getUserController();
  //   const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
  //   const userRoutes = new UserRoutes(userController, tokenManager);

  //   RouteFactory.router.use('/api/v1', userRoutes.getRouter());
  // }

  public static reset(): void {
    RouteFactory.router = undefined as unknown as Router;
  }
}
