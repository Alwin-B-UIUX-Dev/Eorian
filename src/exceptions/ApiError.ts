import { LoggerSingleton } from '@/configs/LoggerSingleton';
import type { IAdditionalInfoData } from '@/types/security';

/**
 * Classe d'erreur API avec winston logging via singleton
 * SOLID: Single Responsibility (gestion erreurs uniquement)
 * SOLID: Dependency Inversion (dépend du singleton, pas de winston directement)
 * KISS: Simple, essentiel
 */

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly additionalInfo: IAdditionalInfoData;
  public readonly timestamp: string;
  public readonly logger = LoggerSingleton.getInstance();

  constructor(message: string, statusCode: number, additionalInfo: IAdditionalInfoData = {}) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.additionalInfo = additionalInfo;
    this.timestamp = new Date().toISOString();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Log the error with the winston logger.
   * Method chaining pattern support
   *
   * @returns The ApiError instance itself for chaining.
   */
  public log(): this {
    this.logger.error(this.message, {
      name: this.name,
      statusCode: this.statusCode,
      additionalInfo: this.additionalInfo,
      timestamp: this.timestamp,
      stack: this.stack
    });
    return this;
  }

  /**
   * Converts the error to a JSON-serializable object
   * @returns a JSON-serializable object containing the error details
   */
  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp
    };
  }
}
