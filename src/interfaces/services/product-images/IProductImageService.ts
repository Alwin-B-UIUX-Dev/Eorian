import type { IProductImage } from '@/interfaces';
import type { CreateProductImageData, UpdateProductImageData } from '@/types';

export interface IProductImageService {
  create(data: CreateProductImageData): Promise<IProductImage>;
  findAll(limit?: number, offset?: number): Promise<IProductImage[]>;
  findOne(id: string): Promise<IProductImage | null>;
  findByProductId(productId: string): Promise<IProductImage[]>;
  update(id: string, data: UpdateProductImageData): Promise<IProductImage>;
  remove(id: string): Promise<void>;
}
