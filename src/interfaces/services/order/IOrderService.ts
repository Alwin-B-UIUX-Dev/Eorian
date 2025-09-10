import type { IBaseService, IOrder } from '@/interfaces';
import type { IOrderData } from '@/types';

export interface IOrderService extends IBaseService<IOrder, IOrderData> {}
