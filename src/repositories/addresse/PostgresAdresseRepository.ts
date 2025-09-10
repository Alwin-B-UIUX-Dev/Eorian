import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { Addresse } from '@/entities/addresse/Addresse';
import type { IAddresse } from '@/interfaces';
import type { IAddresseRepository } from '@/interfaces/repositories/addresse';
import type { CreateAddresseData, IAddresseData } from '@/types/entities/addresse/IAddresseData';
import { DatabaseMapper } from '@/utils';

export class PostgresAdressesRepository implements IAddresseRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(addresseData: CreateAddresseData): Promise<IAddresse> {
    return await this.db.tx(async t => {
      try {
        // Requête préparée pour se prémunir des injections SQL : on obfusque les informations pour éviter qu'elles ne soient interceptées.

        //première transaction permet de sauvegarder les données d'adresses des utilisateurs
        const result: { id: string } = await t.one(
          /*sql*/
          `insert INTO adresses (user_id, type, first_name, last_name, company, phone, address_line_1, address_line_2, city, postal_code, state_region, country, is_default)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id
          `,
          [
            addresseData.user_id,
            addresseData.type,
            addresseData.first_name,
            addresseData.last_name,
            addresseData.company,
            addresseData.phone,
            addresseData.address_line_1,
            addresseData.address_line_2,
            addresseData.city,
            addresseData.postal_code,
            addresseData.state_region,
            addresseData.state_region,
            addresseData.country,
            addresseData.is_default
          ]
        );
        // Deuxième transaction de renvoyer les données crées via une views
        const userAdresses: IAddresseData = await t.one(
          /*sql*/ `SELECT * FROM v_user_addresse WHERE user_id = $1`,
          [result.id]
        );

        // Mapping automatique snake_case → camelCase
        const mappedEntity: IAddresseData =
          DatabaseMapper.snakeToCamel<IAddresseData>(userAdresses);

        return new Addresse(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }

  public async findById(id: string): Promise<IAddresse> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IAddresse[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IAddresseData>): Promise<IAddresse> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
