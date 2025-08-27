import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface ICartItemsData extends IBaseEntityData {
  userId: string;
  productId: string;
  quantity: string;
  addedAt: string;
}

export type CreateCartItemsData = WithoutSystemFieldsType<ICartItemsData>;
export type UpdateCartItemsData = PartialWithoutSystemFieldsType<ICartItemsData>;
