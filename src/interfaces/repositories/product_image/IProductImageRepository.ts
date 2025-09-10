import type { IBaseRepository, IProductImage } from '@/interfaces';
import type { IProductImageData } from '@/types';

export interface IProductImageRepository
  extends IBaseRepository<IProductImage, IProductImageData> {}
