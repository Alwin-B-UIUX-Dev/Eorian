import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface ICartItemData extends IBaseEntityData {
  userId: number;
  productId: number;
  quantity: number;
  addedAt: Date;
}

export type CreateCartItemData = WithoutSystemFieldsType<ICartItemData>;
export type UpdateCartItemData = PartialWithoutSystemFieldsType<ICartItemData>;
