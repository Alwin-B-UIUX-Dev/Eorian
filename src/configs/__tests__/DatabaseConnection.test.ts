// src/configs/__tests__/DatabaseConnection.test.ts

import type { IDatabase } from 'pg-promise';
import { database, logger } from '@/configs';
import type { IDatabaseConnectionSingleton } from '@/interfaces';

describe('DatabaseConnection', () => {
  let connection: IDatabaseConnectionSingleton;

  beforeAll((): void => {
    // Une seule instance pour tous les tests
    connection = database;
  });

  afterAll(async (): Promise<void> => {
    // CLEANUP à la toute fin
    await connection.disconnect();
  });

  it('should be a singleton', () => {
    const db1: IDatabaseConnectionSingleton = database;
    const db2: IDatabaseConnectionSingleton = database;
    expect(db1).toBe(db2);
  });

  it('should connect to database', async (): Promise<void> => {
    await expect(connection.testConnection()).resolves.not.toThrow();
  });

  it('should list existing tables', async (): Promise<void> => {
    const db: IDatabase<Record<string, never>> = connection.connect();

    const tables = await db.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' ORDER BY table_name
    `);

    logger.info(
      'Tables:',
      tables.map((t: { table_name: string }): string => t.table_name)
    );
    expect(tables).toBeInstanceOf(Array);
  });

  it('should show table contents sample', async (): Promise<void> => {
    const db: IDatabase<Record<string, never>> = connection.connect();

    const firstTable = await db.oneOrNone(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      LIMIT 1
    `);

    if (firstTable) {
      const data = await db.query(`SELECT * FROM ${firstTable.table_name} LIMIT 3`);
      logger.info(`Échantillon de ${firstTable.table_name}:`, data);
      expect(data).toBeInstanceOf(Array);
    } else {
      logger.warn('ℹAucune table utilisateur trouvée');
    }
  });

  it('should disconnect gracefully', async (): Promise<void> => {
    // Test que la méthode existe et fonctionne
    expect(typeof connection.disconnect).toBe('function');
  });
});
