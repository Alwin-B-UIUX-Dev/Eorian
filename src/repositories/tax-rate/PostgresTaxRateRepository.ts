import type { IDatabase } from 'pg-promise';
import { database, logger } from '@/configs';
import { TaxRateOperationsConstants, TaxRateQueriesConstants } from '@/constants';
import { TaxRate } from '@/entities';
import { DatabaseError } from '@/exceptions';
import type { ITaxRate, ITaxRateRepository } from '@/interfaces';
import type { CreateTaxRateData, ITaxRateData, UpdateTaxRateData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresTaxRateRepository implements ITaxRateRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();
  private readonly logger = logger;

  public async create(data: CreateTaxRateData): Promise<ITaxRate> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Creating tax rate', {
          operation: TaxRateOperationsConstants.CREATE_TAX_RATE,
          name: data.name
        });
        const result: { id: string } = await t.one(TaxRateQueriesConstants.INSERT_TAX_RATE, [
          data.name,
          data.rate,
          data.description,
          data.isActive
        ]);
        const row = await t.one(TaxRateQueriesConstants.SELECT_TAX_RATE_BY_ID, [result.id]);
        const mapped: ITaxRateData = DatabaseMapper.snakeToCamel<ITaxRateData>(row);
        return new TaxRate(mapped);
      } catch (error) {
        this.logger.error('Failed to create tax rate', {
          operation: TaxRateOperationsConstants.CREATE_TAX_RATE,
          error
        });
        throw DatabaseError.transactionFailed(TaxRateOperationsConstants.CREATE_TAX_RATE);
      }
    });
  }

  public async update(id: string, data: UpdateTaxRateData): Promise<ITaxRate> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Updating tax rate', {
          operation: TaxRateOperationsConstants.UPDATE_TAX_RATE,
          id
        });
        const row = await t.one(TaxRateQueriesConstants.UPDATE_TAX_RATE, [
          Number(id),
          data.name,
          data.rate,
          data.description,
          data.isActive
        ]);
        const mapped: ITaxRateData = DatabaseMapper.snakeToCamel<ITaxRateData>(row);
        return new TaxRate(mapped);
      } catch (error) {
        this.logger.error('Failed to update tax rate', {
          operation: TaxRateOperationsConstants.UPDATE_TAX_RATE,
          id,
          error
        });
        throw DatabaseError.transactionFailed(TaxRateOperationsConstants.UPDATE_TAX_RATE);
      }
    });
  }

  public async delete(id: string): Promise<boolean> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Deleting tax rate', {
          operation: TaxRateOperationsConstants.DELETE_TAX_RATE_BY_ID,
          id
        });
        const result: { rowCount: number } = await t.result(
          TaxRateQueriesConstants.DELETE_TAX_RATE_BY_ID,
          [Number(id)]
        );
        return result.rowCount > 0;
      } catch (error) {
        this.logger.error('Failed to delete tax rate', {
          operation: TaxRateOperationsConstants.DELETE_TAX_RATE_BY_ID,
          id,
          error
        });
        throw DatabaseError.transactionFailed(TaxRateOperationsConstants.DELETE_TAX_RATE_BY_ID);
      }
    });
  }

  public async findById(id: string): Promise<ITaxRate | null> {
    try {
      this.logger.info('Finding tax rate by id', {
        operation: TaxRateOperationsConstants.FIND_TAX_RATE_BY_ID,
        id
      });
      const row: ITaxRateData | null = await this.db.oneOrNone(
        TaxRateQueriesConstants.SELECT_TAX_RATE_BY_ID,
        [Number(id)]
      );
      return row ? new TaxRate(DatabaseMapper.snakeToCamel<ITaxRateData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find tax rate by id', {
        operation: TaxRateOperationsConstants.FIND_TAX_RATE_BY_ID,
        id,
        error
      });
      throw DatabaseError.transactionFailed(TaxRateOperationsConstants.FIND_TAX_RATE_BY_ID);
    }
  }

  public async findAll(limit: number = 50, offset: number = 0): Promise<ITaxRate[]> {
    try {
      this.logger.info('Finding all tax rates', {
        operation: TaxRateOperationsConstants.FIND_ALL_TAX_RATES,
        limit,
        offset
      });
      const rows: ITaxRateData[] = await this.db.manyOrNone(
        TaxRateQueriesConstants.SELECT_ALL_TAX_RATES,
        [limit, offset]
      );
      const mapped: ITaxRateData[] = DatabaseMapper.snakeToCamelArray<ITaxRateData>(rows);
      return mapped.map(r => new TaxRate(r));
    } catch (error) {
      this.logger.error('Failed to find all tax rates', {
        operation: TaxRateOperationsConstants.FIND_ALL_TAX_RATES,
        error
      });
      throw DatabaseError.transactionFailed(TaxRateOperationsConstants.FIND_ALL_TAX_RATES);
    }
  }

  public async findByTaxName(name: string): Promise<ITaxRate | null> {
    try {
      this.logger.info('Finding tax rate by name', {
        operation: TaxRateOperationsConstants.FIND_TAX_RATE_BY_NAME,
        name
      });
      const row: ITaxRateData | null = await this.db.oneOrNone(
        TaxRateQueriesConstants.SELECT_TAX_RATE_BY_NAME,
        [name]
      );
      return row ? new TaxRate(DatabaseMapper.snakeToCamel<ITaxRateData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find tax rate by name', {
        operation: TaxRateOperationsConstants.FIND_TAX_RATE_BY_NAME,
        name,
        error
      });
      throw DatabaseError.transactionFailed(TaxRateOperationsConstants.FIND_TAX_RATE_BY_NAME);
    }
  }
}
