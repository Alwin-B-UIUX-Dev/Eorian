import type { IBaseService, IOrderItem } from '@/interfaces';
import type { IOrderItemData } from '@/types';

export interface IOrderItemService extends IBaseService<IOrderItem, IOrderItemData> {}
