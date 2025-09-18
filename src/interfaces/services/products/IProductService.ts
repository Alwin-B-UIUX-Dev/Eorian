import type { IProduct } from '@/interfaces';
import type { CreateProductData, UpdateProductData } from '@/types';

export interface IProductService {
  create(data: CreateProductData): Promise<IProduct>;
  findAll(limit?: number, offset?: number): Promise<IProduct[]>;
  findOne(id: string): Promise<IProduct | null>;
  update(id: string, data: UpdateProductData): Promise<IProduct>;
  remove(id: string): Promise<void>;
}
