import type { IDatabase } from 'pg-promise';
import { database, logger } from '@/configs';
import { TaxeRateOperationsConstants, TaxeRateQueriesConstants } from '@/constants';
import { TaxeRate } from '@/entities';
import { DatabaseError } from '@/exceptions';
import type { ITaxeRate, ITaxeRateRepository } from '@/interfaces';
import type { CreateTaxeRateData, ITaxeRateData, UpdateTaxeRateData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresTaxeRateRepository implements ITaxeRateRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();
  private readonly logger = logger;

  public async create(data: CreateTaxeRateData): Promise<ITaxeRate> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Creating taxe rate', {
          operation: TaxeRateOperationsConstants.CREATE_TAXE_RATE,
          name: data.name
        });
        const result: { id: string } = await t.one(TaxeRateQueriesConstants.INSERT_TAXE_RATE, [
          data.name,
          data.rate,
          data.description,
          data.isActive
        ]);
        const row = await t.one(TaxeRateQueriesConstants.SELECT_TAXE_RATE_BY_ID, [result.id]);
        const mapped: ITaxeRateData = DatabaseMapper.snakeToCamel<ITaxeRateData>(row);
        return new TaxeRate(mapped);
      } catch (error) {
        this.logger.error('Failed to create taxe rate', {
          operation: TaxeRateOperationsConstants.CREATE_TAXE_RATE,
          error
        });
        throw DatabaseError.transactionFailed(TaxeRateOperationsConstants.CREATE_TAXE_RATE);
      }
    });
  }

  public async update(id: string, data: UpdateTaxeRateData): Promise<ITaxeRate> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Updating taxe rate', {
          operation: TaxeRateOperationsConstants.UPDATE_TAXE_RATE,
          id
        });
        const row = await t.one(TaxeRateQueriesConstants.UPDATE_TAXE_RATE, [
          Number(id),
          data.name,
          data.rate,
          data.description,
          data.isActive
        ]);
        const mapped: ITaxeRateData = DatabaseMapper.snakeToCamel<ITaxeRateData>(row);
        return new TaxeRate(mapped);
      } catch (error) {
        this.logger.error('Failed to update taxe rate', {
          operation: TaxeRateOperationsConstants.UPDATE_TAXE_RATE,
          id,
          error
        });
        throw DatabaseError.transactionFailed(TaxeRateOperationsConstants.UPDATE_TAXE_RATE);
      }
    });
  }

  public async delete(id: string): Promise<boolean> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Deleting taxe rate', {
          operation: TaxeRateOperationsConstants.DELETE_TAXE_RATE_BY_ID,
          id
        });
        const result: { rowCount: number } = await t.result(
          TaxeRateQueriesConstants.DELETE_TAXE_RATE_BY_ID,
          [Number(id)]
        );
        return result.rowCount > 0;
      } catch (error) {
        this.logger.error('Failed to delete taxe rate', {
          operation: TaxeRateOperationsConstants.DELETE_TAXE_RATE_BY_ID,
          id,
          error
        });
        throw DatabaseError.transactionFailed(TaxeRateOperationsConstants.DELETE_TAXE_RATE_BY_ID);
      }
    });
  }

  public async findById(id: string): Promise<ITaxeRate | null> {
    try {
      this.logger.info('Finding taxe rate by id', {
        operation: TaxeRateOperationsConstants.FIND_TAXE_RATE_BY_ID,
        id
      });
      const row: ITaxeRateData | null = await this.db.oneOrNone(
        TaxeRateQueriesConstants.SELECT_TAXE_RATE_BY_ID,
        [Number(id)]
      );
      return row ? new TaxeRate(DatabaseMapper.snakeToCamel<ITaxeRateData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find taxe rate by id', {
        operation: TaxeRateOperationsConstants.FIND_TAXE_RATE_BY_ID,
        id,
        error
      });
      throw DatabaseError.transactionFailed(TaxeRateOperationsConstants.FIND_TAXE_RATE_BY_ID);
    }
  }

  public async findAll(limit: number = 50, offset: number = 0): Promise<ITaxeRate[]> {
    try {
      this.logger.info('Finding all taxe rates', {
        operation: TaxeRateOperationsConstants.FIND_ALL_TAXE_RATES,
        limit,
        offset
      });
      const rows: ITaxeRateData[] = await this.db.manyOrNone(
        TaxeRateQueriesConstants.SELECT_ALL_TAXE_RATES,
        [limit, offset]
      );
      const mapped: ITaxeRateData[] = DatabaseMapper.snakeToCamelArray<ITaxeRateData>(rows);
      return mapped.map(r => new TaxeRate(r));
    } catch (error) {
      this.logger.error('Failed to find all taxe rates', {
        operation: TaxeRateOperationsConstants.FIND_ALL_TAXE_RATES,
        error
      });
      throw DatabaseError.transactionFailed(TaxeRateOperationsConstants.FIND_ALL_TAXE_RATES);
    }
  }

  public async findByName(name: string): Promise<ITaxeRate | null> {
    try {
      this.logger.info('Finding taxe rate by name', {
        operation: TaxeRateOperationsConstants.FIND_TAXE_RATE_BY_NAME,
        name
      });
      const row: ITaxeRateData | null = await this.db.oneOrNone(
        TaxeRateQueriesConstants.SELECT_TAXE_RATE_BY_NAME,
        [name]
      );
      return row ? new TaxeRate(DatabaseMapper.snakeToCamel<ITaxeRateData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find taxe rate by name', {
        operation: TaxeRateOperationsConstants.FIND_TAXE_RATE_BY_NAME,
        name,
        error
      });
      throw DatabaseError.transactionFailed(TaxeRateOperationsConstants.FIND_TAXE_RATE_BY_NAME);
    }
  }

  public async findByActiveStatus(active: boolean): Promise<ITaxeRate[]> {
    try {
      this.logger.info('Finding taxe rates by active status', {
        operation: TaxeRateOperationsConstants.FIND_TAXE_RATES_BY_ACTIVE,
        active
      });
      const rows: ITaxeRateData[] = await this.db.manyOrNone(
        TaxeRateQueriesConstants.SELECT_TAXE_RATES_BY_ACTIVE,
        [active]
      );
      const mapped: ITaxeRateData[] = DatabaseMapper.snakeToCamelArray<ITaxeRateData>(rows);
      return mapped.map(r => new TaxeRate(r));
    } catch (error) {
      this.logger.error('Failed to find taxe rates by active status', {
        operation: TaxeRateOperationsConstants.FIND_TAXE_RATES_BY_ACTIVE,
        active,
        error
      });
      throw DatabaseError.transactionFailed(TaxeRateOperationsConstants.FIND_TAXE_RATES_BY_ACTIVE);
    }
  }
}
