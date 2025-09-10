// src/configs/RouteFactory.ts
import { Router } from 'express';
import { logger } from '@/configs';
import { ServiceFactory } from '@/configs/ServiceFactory';
import type { ITokenManager } from '@/interfaces';
import { AuthRoutes } from '@/routes';

export class RouteFactory {
  private static router: Router;

  public static configureRoutes(): Router {
    if (RouteFactory.router) return RouteFactory.router;

    RouteFactory.router = Router();

    // Enregistrement des routes
    RouteFactory.registerAuthRoutes();
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

  // private static registerUserRoutes(): void {
  //   const userController = ServiceFactory.getUserController();
  //   const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
  //   const userRoutes = new UserRoutes(userController, tokenManager);

  //   RouteFactory.router.use('/api/v1', userRoutes.getRouter());
  // }

  // private static registerProductRoutes(): void {
  //   const productController = ServiceFactory.getProductController();
  //   const tokenManager: ITokenManager = ServiceFactory.getTokenManager();
  //   const productRoutes = new ProductRoutes(productController, tokenManager);

  //   RouteFactory.router.use('/api/v1', productRoutes.getRouter());
  // }

  public static reset(): void {
    RouteFactory.router = undefined as unknown as Router;
  }
}
