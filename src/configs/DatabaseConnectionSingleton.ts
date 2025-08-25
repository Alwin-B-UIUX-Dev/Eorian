import { config } from 'dotenv';
import pgPromise, { type IDatabase, type ITask } from 'pg-promise';
import { LoggerSingleton } from '@/configs/LoggerSingleton';
import { DatabaseError } from '@/exceptions';
import type { IDatabaseConnectionSingleton } from '@/interfaces';

config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});

export class DatabaseConnectionSingleton implements IDatabaseConnectionSingleton {
  static #instance: DatabaseConnectionSingleton;
  readonly #db: IDatabase<Record<string, never>>;
  readonly #pgp: pgPromise.IMain;
  private readonly logger = LoggerSingleton.getInstance();

  private constructor() {
    try {
      this.#pgp = pgPromise({
        error: (err: Error) => {
          this.logger.error('PostgreSQL error', {
            message: err.message.substring(0, 100),
            timestamp: new Date().toISOString()
          });
        }
      });

      this.#db = this.#pgp({
        connectionString: process.env.DATABASE_URL ?? '',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000
      });

      this.logger.info('Database connection pool initialized');
    } catch (error) {
      this.logger.error('Failed to initialize database connection', {
        error: (error as Error).message
      });
      throw DatabaseError.connectionFailed(error as Error);
    }
  }

  public static getInstance(): DatabaseConnectionSingleton {
    if (!DatabaseConnectionSingleton.#instance) {
      DatabaseConnectionSingleton.#instance = new DatabaseConnectionSingleton();
    }
    return DatabaseConnectionSingleton.#instance;
  }

  public connect(): IDatabase<Record<string, never>> {
    return this.#db;
  }

  public async testConnection(): Promise<void> {
    try {
      await this.#db.oneOrNone('SELECT 1');
      this.logger.info('Database connection test successful');
    } catch (error) {
      this.logger.error('Database connection test failed', {
        error: (error as Error).message
      });
      throw DatabaseError.connectionFailed(error as Error);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      this.#pgp.end();
      this.logger.info('Database connections closed gracefully');
    } catch (error) {
      this.logger.error('Error during database disconnection', {
        error: (error as Error).message
      });
      throw DatabaseError.connectionFailed(error as Error);
    }
  }

  public async withTransaction<T>(
    operation: (tx: ITask<Record<string, never>>) => Promise<T>
  ): Promise<T> {
    try {
      return await this.#db.tx(async tx => {
        return await operation(tx);
      });
    } catch (error) {
      const err = error as Error;

      // E-COMMERCE: Erreurs spécifiques
      if (err.message.includes('user_email_key')) {
        throw DatabaseError.uniqueViolation('user', 'email');
      }
      if (err.message.includes('product_sku_key')) {
        throw DatabaseError.uniqueViolation('product', 'sku');
      }
      if (err.message.includes('foreign key')) {
        throw DatabaseError.foreignKeyViolation('unknown', 'unknown_fk');
      }
      if (err.message.includes('unique')) {
        throw DatabaseError.uniqueViolation('unknown', 'unknown');
      }

      throw DatabaseError.transactionFailed('user_operation');
    }
  }
}
