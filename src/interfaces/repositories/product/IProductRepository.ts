import type { IBaseRepository, IProduct } from '@/interfaces';
import type { IProductData } from '@/types';

export interface IProductRepository extends IBaseRepository<IProduct, IProductData> {}
