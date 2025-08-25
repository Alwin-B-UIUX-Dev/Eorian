import type { IDatabase, ITask } from 'pg-promise';

export interface IDatabaseConnectionSingleton {
  connect(): IDatabase<Record<string, never>>;
  testConnection(): Promise<void>;
  disconnect(): Promise<void>;
  withTransaction<T>(operation: (tx: ITask<Record<string, never>>) => Promise<T>): Promise<T>;
}
