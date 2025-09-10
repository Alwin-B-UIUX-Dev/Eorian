import type { IDatabase } from 'pg-promise';
import { database } from '@/configs';
import { UserPaymentMethod } from '@/entities';
import type { IUserPaymentMethod, IUserPaymentMethodRepository } from '@/interfaces';
import type { CreateUserPaymentMethodData, IUserPaymentMethodData } from '@/types';
import { DatabaseMapper } from '@/utils';

export class PostgresUserPaymentMethodRepository implements IUserPaymentMethodRepository {
  private readonly db: IDatabase<Record<string, never>> = database.connect();

  public async create(
    userPaymentMethodData: CreateUserPaymentMethodData
  ): Promise<IUserPaymentMethod> {
    return await this.db.tx(async t => {
      try {
        const result: { id: string } = await t.one(
          /*sql*/
          `INSERT INTO user_payment_method (user_id, card_token, card_last4, card_brand, card_type, cardholder_name, expires_month, expires_year, nickname, is_default, is_active)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
          [
            userPaymentMethodData.user_id,
            userPaymentMethodData.card_token,
            userPaymentMethodData.card_last4,
            userPaymentMethodData.card_brand,
            userPaymentMethodData.card_type,
            userPaymentMethodData.cardholder_name,
            userPaymentMethodData.expires_month,
            userPaymentMethodData.expires_year,
            userPaymentMethodData.nickname,
            userPaymentMethodData.is_default,
            userPaymentMethodData.is_active
          ]
        );
        const userUserPaymentMethod: IUserPaymentMethodData = await t.one(
          /*sql*/ `SELECT * FROM v_user_UserPaymentMethod WHERE order_id = $1`,
          [result.id]
        );

        const mappedEntity: IUserPaymentMethodData =
          DatabaseMapper.snakeToCamel<IUserPaymentMethodData>(userUserPaymentMethod);

        return new UserPaymentMethod(mappedEntity);
      } catch (error) {
        throw new Error(`erreur${error}`);
      }
    });
  }
  public async findById(id: string): Promise<IUserPaymentMethod> {
    throw new Error('not implemented');
  }

  public async findAll(limit?: number, offset?: number): Promise<IUserPaymentMethod[]> {
    throw new Error('not implemented');
  }

  public async update(
    id: string,
    data: Partial<IUserPaymentMethodData>
  ): Promise<IUserPaymentMethod> {
    throw new Error('not implemented');
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('not implemented');
  }
}
