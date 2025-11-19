// src/server.ts
import dotenv from 'dotenv';
import { App } from '@/app.js';
import { logger } from '@/configs';

/**
 * Configuration des environnements
 */
const timezone: string = process.env.TIMEZONE ?? 'Europe/Paris';
const environment: string = process.env.NODE_ENV ?? 'development';
const envFile: string = `.env.${environment}`;

// Chargement de la configuration AVANT l'app
dotenv.config({ path: envFile });

const PORT: number = parseInt(process.env.PORT ?? '3000', 10);
const HOST: string = process.env.HOST ?? 'localhost';

/**
 * Initialisation de l'application
 */
const application = new App();
const app = application.getApp();

/**
 * Démarrage du serveur en mode dev ou en mode prod
 */
if (environment === 'development') {
  app.listen(PORT, HOST, (): void => {
    logger.info(' HTTP Server started successfully', {
      port: PORT,
      host: HOST,
      environment,
      timezone,
      url: `http://${HOST}:${PORT}/api/v1`,
      timestamp: new Date().toISOString()
    });

    console.log(`\n Quick links (HTTP):`);
    console.log(`   • API Base: http://${HOST}:${PORT}/api/v1`);
  });
} else {
  // HTTP en production (proxy reverse handle SSL)
  app.listen(PORT, HOST, (): void => {
    logger.info('HTTP Server started successfully', {
      port: PORT,
      host: HOST,
      environment,
      url: `http://${HOST}:${PORT}/api/v1`,
      timestamp: new Date().toISOString()
    });
  });
}

/**
 * Gestion propre de l'arrêt
 */
process.on('SIGINT', () => {
  logger.info('Server shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Server terminated gracefully...');
  process.exit(0);
});
