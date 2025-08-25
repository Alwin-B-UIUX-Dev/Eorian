// src/middlewares/ErrorMiddleware.ts
import type { NextFunction, Request, Response } from 'express';
import { logger } from '@/configs';
import { ApiError } from '@/exceptions';

export class ErrorMiddleware {
  public static handle() {
    return (error: Error | ApiError, _req: Request, res: Response, _next: NextFunction): void => {
      // Force JSON response
      res.setHeader('Content-Type', 'application/json');

      if (error instanceof ApiError) {
        const response = {
          success: false,
          message: error.message,
          error: {
            code: `API_ERROR_${error.statusCode}`,
            timestamp: new Date().toISOString()
          }
        };
        res.status(error.statusCode).json(response);
        return;
      }

      // Erreur générique
      logger.error('Unhandled error:', error);
      res.status(500).json({
        success: false,
        message: "Une erreur interne s'est produite",
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          timestamp: new Date().toISOString()
        }
      });
    };
  }
}
