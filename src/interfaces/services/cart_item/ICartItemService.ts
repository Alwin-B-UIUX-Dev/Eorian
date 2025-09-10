import type { ICartItem } from '@/interfaces/entities';
import type { ICartItemData } from '@/types';
import type { IBaseService } from '../IBaseService';

export interface ICartItemService extends IBaseService<ICartItem, ICartItemData> {}
