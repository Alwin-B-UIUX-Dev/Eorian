import type { IDatabase } from 'pg-promise';
import { database, logger } from '@/configs';
import { AddressOperationsConstants, AddressQueriesConstants } from '@/constants';
import { Address } from '@/entities';
import { DatabaseError } from '@/exceptions';
import type { IAddress, IAddressRepository } from '@/interfaces';
import type { CreateAddressData, IAddressData, UpdateAddressData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresAddressRepository implements IAddressRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();
  private readonly logger = logger;

  public async create(data: CreateAddressData): Promise<IAddress> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Creating address', {
          operation: AddressOperationsConstants.CREATE_ADDRESS,
          userId: data.userId,
          type: data.type
        });

        // Si c'est une adresse par défaut, on reset les autres adresses par défaut du même type
        if (data.isDefault) {
          await t.none(AddressQueriesConstants.RESET_DEFAULT_ADDRESSES_BY_USER_AND_TYPE, [
            data.userId,
            data.type
          ]);
        }

        const result: { id: string } = await t.one(AddressQueriesConstants.INSERT_ADDRESS, [
          data.userId,
          data.type,
          data.firstName,
          data.lastName,
          data.company,
          data.phone,
          data.addressLine1,
          data.addressLine2,
          data.city,
          data.postalCode,
          data.stateRegion,
          data.country,
          data.isDefault || false
        ]);

        const row = await t.one(AddressQueriesConstants.SELECT_ADDRESS_BY_ID, [result.id]);
        const mapped: IAddressData = DatabaseMapper.snakeToCamel<IAddressData>(row);
        return new Address(mapped);
      } catch (error) {
        this.logger.error('Failed to create address', {
          operation: AddressOperationsConstants.CREATE_ADDRESS,
          error
        });
        throw DatabaseError.transactionFailed(AddressOperationsConstants.CREATE_ADDRESS);
      }
    });
  }

  public async update(id: string, data: UpdateAddressData): Promise<IAddress> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Updating address', {
          operation: AddressOperationsConstants.UPDATE_ADDRESS,
          id
        });

        // Si on définit cette adresse comme par défaut, on reset les autres
        if (data.isDefault) {
          // On récupère d'abord l'adresse pour connaître son type et user_id
          const existingAddress = await t.oneOrNone(AddressQueriesConstants.SELECT_ADDRESS_BY_ID, [
            Number(id)
          ]);
          if (existingAddress) {
            await t.none(AddressQueriesConstants.RESET_DEFAULT_ADDRESSES_BY_USER_AND_TYPE, [
              existingAddress.user_id,
              data.type || existingAddress.type
            ]);
          }
        }

        const row = await t.one(AddressQueriesConstants.UPDATE_ADDRESS, [
          Number(id),
          data.type,
          data.firstName,
          data.lastName,
          data.company,
          data.phone,
          data.addressLine1,
          data.addressLine2,
          data.city,
          data.postalCode,
          data.stateRegion,
          data.country,
          data.isDefault
        ]);

        const mapped: IAddressData = DatabaseMapper.snakeToCamel<IAddressData>(row);
        return new Address(mapped);
      } catch (error) {
        this.logger.error('Failed to update address', {
          operation: AddressOperationsConstants.UPDATE_ADDRESS,
          id,
          error
        });
        throw DatabaseError.transactionFailed(AddressOperationsConstants.UPDATE_ADDRESS);
      }
    });
  }

  public async delete(id: string): Promise<boolean> {
    return await this.db.tx(async t => {
      try {
        this.logger.info('Deleting address', {
          operation: AddressOperationsConstants.DELETE_ADDRESS_BY_ID,
          id
        });
        const result: { rowCount: number } = await t.result(
          AddressQueriesConstants.DELETE_ADDRESS_BY_ID,
          [Number(id)]
        );
        return result.rowCount > 0;
      } catch (error) {
        this.logger.error('Failed to delete address', {
          operation: AddressOperationsConstants.DELETE_ADDRESS_BY_ID,
          id,
          error
        });
        throw DatabaseError.transactionFailed(AddressOperationsConstants.DELETE_ADDRESS_BY_ID);
      }
    });
  }

  public async findById(id: string): Promise<IAddress | null> {
    try {
      this.logger.info('Finding address by id', {
        operation: AddressOperationsConstants.FIND_ADDRESS_BY_ID,
        id
      });
      const row: IAddressData | null = await this.db.oneOrNone(
        AddressQueriesConstants.SELECT_ADDRESS_BY_ID,
        [Number(id)]
      );
      return row ? new Address(DatabaseMapper.snakeToCamel<IAddressData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find address by id', {
        operation: AddressOperationsConstants.FIND_ADDRESS_BY_ID,
        id,
        error
      });
      throw DatabaseError.transactionFailed(AddressOperationsConstants.FIND_ADDRESS_BY_ID);
    }
  }

  public async findAll(limit: number = 50, offset: number = 0): Promise<IAddress[]> {
    try {
      this.logger.info('Finding all addresses', {
        operation: AddressOperationsConstants.FIND_ALL_ADDRESSES,
        limit,
        offset
      });
      const rows: IAddressData[] = await this.db.manyOrNone(
        AddressQueriesConstants.SELECT_ALL_ADDRESSES,
        [limit, offset]
      );
      const mapped: IAddressData[] = DatabaseMapper.snakeToCamelArray<IAddressData>(rows);
      return mapped.map(r => new Address(r));
    } catch (error) {
      this.logger.error('Failed to find all addresses', {
        operation: AddressOperationsConstants.FIND_ALL_ADDRESSES,
        error
      });
      throw DatabaseError.transactionFailed(AddressOperationsConstants.FIND_ALL_ADDRESSES);
    }
  }

  public async findByUserId(userId: string): Promise<IAddress[]> {
    try {
      this.logger.info('Finding addresses by user id', {
        operation: AddressOperationsConstants.FIND_ADDRESSES_BY_USER_ID,
        userId
      });
      const rows: IAddressData[] = await this.db.manyOrNone(
        AddressQueriesConstants.SELECT_ADDRESSES_BY_USER_ID,
        [Number(userId)]
      );
      const mapped: IAddressData[] = DatabaseMapper.snakeToCamelArray<IAddressData>(rows);
      return mapped.map(r => new Address(r));
    } catch (error) {
      this.logger.error('Failed to find addresses by user id', {
        operation: AddressOperationsConstants.FIND_ADDRESSES_BY_USER_ID,
        userId,
        error
      });
      throw DatabaseError.transactionFailed(AddressOperationsConstants.FIND_ADDRESSES_BY_USER_ID);
    }
  }

  public async findByUserIdAndType(
    userId: string,
    type: 'shipping' | 'billing' | 'both'
  ): Promise<IAddress[]> {
    try {
      this.logger.info('Finding addresses by user id and type', {
        operation: AddressOperationsConstants.FIND_ADDRESSES_BY_TYPE,
        userId,
        type
      });
      const rows: IAddressData[] = await this.db.manyOrNone(
        AddressQueriesConstants.SELECT_ADDRESSES_BY_TYPE,
        [Number(userId), type]
      );
      const mapped: IAddressData[] = DatabaseMapper.snakeToCamelArray<IAddressData>(rows);
      return mapped.map(r => new Address(r));
    } catch (error) {
      this.logger.error('Failed to find addresses by user id and type', {
        operation: AddressOperationsConstants.FIND_ADDRESSES_BY_TYPE,
        userId,
        type,
        error
      });
      throw DatabaseError.transactionFailed(AddressOperationsConstants.FIND_ADDRESSES_BY_TYPE);
    }
  }

  public async findDefaultByUserIdAndType(
    userId: string,
    type: 'shipping' | 'billing' | 'both'
  ): Promise<IAddress | null> {
    try {
      this.logger.info('Finding default address by user id and type', {
        operation: AddressOperationsConstants.FIND_DEFAULT_ADDRESS_BY_USER_AND_TYPE,
        userId,
        type
      });
      const row: IAddressData | null = await this.db.oneOrNone(
        AddressQueriesConstants.SELECT_DEFAULT_ADDRESS_BY_USER_AND_TYPE,
        [Number(userId), type]
      );
      return row ? new Address(DatabaseMapper.snakeToCamel<IAddressData>(row)) : null;
    } catch (error) {
      this.logger.error('Failed to find default address by user id and type', {
        operation: AddressOperationsConstants.FIND_DEFAULT_ADDRESS_BY_USER_AND_TYPE,
        userId,
        type,
        error
      });
      throw DatabaseError.transactionFailed(
        AddressOperationsConstants.FIND_DEFAULT_ADDRESS_BY_USER_AND_TYPE
      );
    }
  }

  public async resetDefaultAddressesByUserIdAndType(
    userId: string,
    type: 'shipping' | 'billing' | 'both'
  ): Promise<void> {
    try {
      this.logger.info('Resetting default addresses by user id and type', {
        operation: AddressOperationsConstants.RESET_DEFAULT_ADDRESSES_BY_USER_AND_TYPE,
        userId,
        type
      });
      await this.db.none(AddressQueriesConstants.RESET_DEFAULT_ADDRESSES_BY_USER_AND_TYPE, [
        Number(userId),
        type
      ]);
    } catch (error) {
      this.logger.error('Failed to reset default addresses by user id and type', {
        operation: AddressOperationsConstants.RESET_DEFAULT_ADDRESSES_BY_USER_AND_TYPE,
        userId,
        type,
        error
      });
      throw DatabaseError.transactionFailed(
        AddressOperationsConstants.RESET_DEFAULT_ADDRESSES_BY_USER_AND_TYPE
      );
    }
  }
}
