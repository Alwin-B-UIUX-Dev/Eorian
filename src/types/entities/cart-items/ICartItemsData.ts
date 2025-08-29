import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface ICartItemsData extends IBaseEntityData {
  userId: number;
  productId: number;
  quantity: number;
  addedAt: Date;
}

export type CreateCartItemsData = WithoutSystemFieldsType<ICartItemsData>;
export type UpdateCartItemsData = PartialWithoutSystemFieldsType<ICartItemsData>;
