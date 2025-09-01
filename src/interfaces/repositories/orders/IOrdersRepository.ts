import type { IOrders } from '@/interfaces/entities';
import type { IOrdersData } from '@/types';
import type { IBaseRepository } from '../IBaseRepository';

export interface IOrdersRepository extends IBaseRepository<IOrders, IOrdersData> {}
