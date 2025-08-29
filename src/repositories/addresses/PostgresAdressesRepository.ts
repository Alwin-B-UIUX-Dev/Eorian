import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { Addresses } from '@/entities/addresses/Addresses';
import type { IAddresses } from '@/interfaces';
import type { IAdressesRepository } from '@/interfaces/repositories/addresses';
import type {
  CreateAddressesData,
  IAddressesData
} from '@/types/entities/addresses/IAddressesData';
import { DatabaseMapper } from '@/utils';

export class PostgresAdressesRepository implements IAdressesRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(addressesData: CreateAddressesData): Promise<IAddresses> {
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
            addressesData.user_id,
            addressesData.type,
            addressesData.first_name,
            addressesData.last_name,
            addressesData.company,
            addressesData.phone,
            addressesData.address_line_1,
            addressesData.address_line_2,
            addressesData.city,
            addressesData.postal_code,
            addressesData.state_region,
            addressesData.state_region,
            addressesData.country,
            addressesData.is_default
          ]
        );
        // Deuxième transaction de renvoyer les données crées via une views
        const userAdresses: IAddressesData = await t.one(
          /*sql*/ `SELECT * FROM v_user_addresses WHERE user_id = $1`,
          [result.id]
        );

        // Mapping automatique snake_case → camelCase
        const mappedEntity: IAddressesData =
          DatabaseMapper.snakeToCamel<IAddressesData>(userAdresses);

        return new Addresses(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }

  public async findById(id: string): Promise<IAddresses> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IAddresses[]> {
    throw new Error('not implemented');
  }

  public async update(id: string, data: Partial<IAddressesData>): Promise<IAddresses> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
