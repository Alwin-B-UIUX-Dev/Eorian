import type { IorderItems } from '@/interfaces/entities';
import type { IOrderItemsData } from '@/types';
import type { IBaseRepository } from '../IBaseRepository';

export interface IOrderItemsRepository extends IBaseRepository<IorderItems, IOrderItemsData> {}
