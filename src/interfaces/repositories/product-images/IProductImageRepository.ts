import type { IProductImage } from '@/interfaces';
import type { CreateProductImageData, UpdateProductImageData } from '@/types';

export interface IProductImageRepository {
  create(data: CreateProductImageData): Promise<IProductImage>;
  findById(id: string): Promise<IProductImage | null>;
  findByProductId(productId: string): Promise<IProductImage[]>;
  findAll(limit?: number, offset?: number): Promise<IProductImage[]>;
  update(id: string, data: UpdateProductImageData): Promise<IProductImage>;
  delete(id: string): Promise<boolean>;
}
