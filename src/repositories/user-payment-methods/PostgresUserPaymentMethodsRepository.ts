import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { UserPaymentMethods } from '@/entities';
import type { IUserPaymentMethods, IUserPaymentMethodsRepository } from '@/interfaces';
import type { CreateUserPaymentMethodsData, IUserPaymentMethodsData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresUserPaymentMethodsRepository implements IUserPaymentMethodsRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(
    userPaymentMethodsData: CreateUserPaymentMethodsData
  ): Promise<IUserPaymentMethods> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO user-payment-methods (user_id, card_token, card_last4, card_brand, card_type, cardholder_name, expires_month, expires_year, nickname, is_default, is_active)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
          [
            userPaymentMethodsData.user_id,
            userPaymentMethodsData.card_token,
            userPaymentMethodsData.card_last4,
            userPaymentMethodsData.card_brand,
            userPaymentMethodsData.card_type,
            userPaymentMethodsData.cardholder_name,
            userPaymentMethodsData.expires_month,
            userPaymentMethodsData.expires_year,
            userPaymentMethodsData.nickname,
            userPaymentMethodsData.is_default,
            userPaymentMethodsData.is_active
          ]
        );
        const userUserPaymentMethods: IUserPaymentMethodsData = await t.one(
          /*sql*/ `SELECT * FROM v_user_UserPaymentMethods WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IUserPaymentMethodsData =
          DatabaseMapper.snakeToCamel<IUserPaymentMethodsData>(userUserPaymentMethods);

        return new UserPaymentMethods(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }
  public async findById(id: string): Promise<IUserPaymentMethods> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IUserPaymentMethods[]> {
    throw new Error('not implemented');
  }

  public async update(
    id: string,
    data: Partial<IUserPaymentMethodsData>
  ): Promise<IUserPaymentMethods> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
