import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface ICartItemData extends IBaseEntityData {
  userId: string;
  productId: string;
  quantity: string;
  addedAt: Date;
}

export type CreateCartItemData = WithoutSystemFieldsType<ICartItemData>;
export type UpdateCartItemData = PartialWithoutSystemFieldsType<ICartItemData>;
