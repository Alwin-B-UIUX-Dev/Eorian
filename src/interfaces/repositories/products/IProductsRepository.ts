import type { IProducts } from '@/interfaces';
import type { IBaseRepository } from '../IBaseRepository';

export interface IProductsRepository extends IBaseRepository<IProducts, IProductsRepository> {}
