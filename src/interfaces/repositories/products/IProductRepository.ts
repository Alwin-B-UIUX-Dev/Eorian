import type { IBaseRepository } from '@/interfaces';
import type { IProduct } from '@/interfaces/entities/products';
import type { IProductData } from '@/types/entities/products';

export interface IProductRepository extends IBaseRepository<IProduct, IProductData> {
  findByName(name: string): Promise<IProduct | null>;
  findByActiveStatus(active: boolean): Promise<IProduct[]>;
}
