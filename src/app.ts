// src/app.ts
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { logger, RouteFactory } from '@/configs';
import { ErrorHandler } from '@/middlewares';

export class App {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.logConfiguration();
  }

  private initializeMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: [
          'http://localhost:5500', 
          'http://127.0.0.1:5500',
          'http://localhost:5173',
          'http://127.0.0.1:5173'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
      })
    );
  }

  private initializeRoutes(): void {
    const mainRouter = RouteFactory.configureRoutes();
    this.app.use(mainRouter);
    logger.info('✅ Routes configured');
  }

  private initializeErrorHandling(): void {
    this.app.use(ErrorHandler.handle());
    logger.info('✅ Error handling configured');
  }

  private logConfiguration(): void {
    const environment: string = process.env.NODE_ENV ?? 'development';
    logger.info('🚀 Application initialized', { environment });
  }

  // Méthode publique essentielle
  public getApp(): Express {
    return this.app;
  }
}

const appInstance = new App();
export default appInstance.getApp();
