import type { IBaseRepository, IOrderItem } from '@/interfaces';
import type { IOrderItemData } from '@/types';

export interface IOrderItemRepository extends IBaseRepository<IOrderItem, IOrderItemData> {}
