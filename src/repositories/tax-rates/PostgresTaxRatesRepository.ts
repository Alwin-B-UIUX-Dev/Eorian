import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { TaxRates } from '@/entities';
import type { ITaxRates, ITaxRatesRepository } from '@/interfaces';
import type { CreateTaxRatesData, ITaxRatesData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresTaxRatesRepository implements ITaxRatesRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(taxRatesData: CreateTaxRatesData): Promise<ITaxRates> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO tax-rates (name, rate, description, is_active)
          VALUES ($1, $2, $3, $4) RETURNING id`,
          [taxRatesData.name, taxRatesData.rate, taxRatesData.description, taxRatesData.is_active]
        );

        const userTaxRates: ITaxRatesData = await t.one(
          /*sql*/ `SELECT * FROM v_user_TaxRates WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: ITaxRatesData =
          DatabaseMapper.snakeToCamel<ITaxRatesData>(userTaxRates);

        return new TaxRates(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }
  public async findById(id: string): Promise<ITaxRates> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<ITaxRates[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<ITaxRatesData>): Promise<ITaxRates> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
