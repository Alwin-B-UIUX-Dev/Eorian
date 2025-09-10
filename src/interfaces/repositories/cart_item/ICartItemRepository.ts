import type { IBaseRepository, ICartItem } from '@/interfaces';
import type { ICartItemData } from '@/types';

export interface ICartItemRepository extends IBaseRepository<ICartItem, ICartItemData> {}
