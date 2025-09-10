// src/configs/RouteFactory.ts
import { Router } from 'express';
import { logger } from '@/configs';
import { ServiceFactory } from '@/configs/ServiceFactory';
import type { ITokenManager } from '@/interfaces';
import { AuthRoutes, ProductRoutes, TaxRateRoutes } from '@/routes';

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

    logger.info('🛣️ Routes configured');
    return RouteFactory.router;
  }

  private static registerAuthRoutes(): void {
    const authController = ServiceFactory.getAuthController();
    const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
    const authRoutes = new AuthRoutes(authController, tokenManager);

    RouteFactory.router.use('/api/v1', authRoutes.getRouter());
  }

  // private static registerUserRoutes(): void {
  //   const userController = ServiceFactory.getUserController();
  //   const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
  //   const userRoutes = new UserRoutes(userController, tokenManager);

  //   RouteFactory.router.use('/api/v1', userRoutes.getRouter());
  // }

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

  public static reset(): void {
    RouteFactory.router = undefined as unknown as Router;
  }
}
