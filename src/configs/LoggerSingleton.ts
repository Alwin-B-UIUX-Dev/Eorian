// src/configs/LoggerSingleton.ts
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

/**
 * Singleton pour winston logger
 */
export class LoggerSingleton {
  // Instance privée statique pour garantir l'unicité
  static #instance: winston.Logger;

  private constructor() {
    // Empêche l'instanciation directe
  }

  /**
   * Retourne l'instance singleton du logger winston.
   *
   * Cette méthode garantit qu'une seule instance du logger est créée
   * dans toute l'application. Le logger est configuré avec des niveaux
   * de log spécifiés, des formats personnalisés et des transports pour
   * la console et la rotation quotidienne des fichiers (erreurs et audit).
   *
   * @returns {winston.Logger} L'instance singleton du logger.
   */
  public static getInstance(): winston.Logger {
    if (!LoggerSingleton.#instance) {
      // Format AVEC stack pour les erreurs (technique)
      const errorFormat = winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
        const stackInfo: string = typeof stack === 'string' ? `\n${stack}` : '';

        // Afficher les métadonnées si elles existent
        const metaInfo =
          Object.keys(meta).length > 0 ? `\nMetadata: ${JSON.stringify(meta, null, 2)}` : '';

        return `[${timestamp}] ${level.toUpperCase()}: ${message}${stackInfo}${metaInfo}`;
      });

      // AUDIT : Metadata pour INFO, message seul pour ERROR
      const auditFormat = winston.format.printf(({ timestamp, level, message, ...meta }) => {
        if (level === 'error') {
          // ERROR : juste le message
          return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        } else {
          // INFO/autres : avec metadata
          const metaInfo =
            Object.keys(meta).length > 0 ? `\nMetadata: ${JSON.stringify(meta, null, 2)}` : '';
          return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaInfo}`;
        }
      });

      LoggerSingleton.#instance = winston.createLogger({
        level: process.env.LOG_LEVEL ?? 'info',
        transports: [
          // Transport console avec couleurs et stack
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
              winston.format.errors({ stack: true }),
              errorFormat // Format avec stack pour debug console
            )
          }),

          // Fichiers d'erreurs - AVEC stack (données techniques)
          new DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            maxSize: '20m',
            maxFiles: '30d',
            format: winston.format.combine(
              winston.format.errors({ stack: true }), // ← Stack activée
              winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
              errorFormat // ← Format AVEC stack
            ),
            zippedArchive: true,
            auditFile: 'logs/.audit/error-audit.json'
          }),

          // Fichiers d'audit - SANS stack (données métier)
          new DailyRotateFile({
            filename: 'logs/audit-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'info',
            maxSize: '50m',
            maxFiles: '90d',
            format: winston.format.combine(
              winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
              auditFormat // ← Format SANS stack
            ),
            zippedArchive: true,
            auditFile: 'logs/.audit/audit-audit.json'
          })
        ]
      });
    }
    return LoggerSingleton.#instance;
  }
}
