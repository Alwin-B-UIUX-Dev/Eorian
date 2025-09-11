import type { CreateProductImageDto } from '@/dtos';
import type { IBaseService, IProductImage } from '@/interfaces';
import type { IProductImageData } from '@/types';

export interface IProductImageService extends IBaseService<IProductImage, IProductImageData> {
  create(createUserAdminDto: CreateProductImageDto): Promise<IProductImage>;
}
