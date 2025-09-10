import type { IBaseRepository, IOrder } from '@/interfaces';
import type { IOrderData } from '@/types';

export interface IOrderRepository extends IBaseRepository<IOrder, IOrderData> {}
