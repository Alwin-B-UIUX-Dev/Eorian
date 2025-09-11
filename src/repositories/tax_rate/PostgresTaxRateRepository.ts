import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { TaxRate } from '@/entities';
import type { ITaxRate } from '@/interfaces';
import type { ITaxRateRepository } from '@/interfaces/repositories/tax_rate/ITaxRateRepository';
import type { CreateTaxRateData, ITaxRateData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresTaxRateRepository implements ITaxRateRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(taxRateData: CreateTaxRateData): Promise<ITaxRate> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO tax_rates (name, rate, description, is_active)
          VALUES ($1, $2, $3, $4) RETURNING id`,
          [taxRateData.name, taxRateData.rate, taxRateData.description, taxRateData.is_active]
        );

        const userTaxRate: ITaxRateData = await t.one(
          /*sql*/ `SELECT * FROM v_user_taxrate WHERE id = $1`,
          [result.id]
        );

        console.log('Raw DB result:', JSON.stringify(result, null, 2)); // <-- Log complet
        if (!result.id) {
          throw new Error('ID is missing in DB result!');
        }

        const mappedEntity: ITaxRateData = DatabaseMapper.snakeToCamel<ITaxRateData>(userTaxRate);

        return new TaxRate(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }

  public async findById(id: string): Promise<ITaxRate> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<ITaxRate[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<ITaxRateData>): Promise<ITaxRate> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
