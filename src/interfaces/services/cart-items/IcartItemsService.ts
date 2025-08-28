import type { IProduct } from '@/interfaces/entities';
import type { IProductData } from '@/types';
import type { IBaseService } from '../IBaseService';

export interface ICartItemsService extends IBaseService<IProduct, IProductData> {}
