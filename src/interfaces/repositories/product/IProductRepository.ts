import type { IProduct } from '@/interfaces/entities';
import type { IProductData } from '@/types';
import type { IBaseRepository } from '../IBaseRepository';

export interface IProductRepository extends IBaseRepository<IProduct, IProductData> {}
