import type { IProductImages } from '@/interfaces/entities';
import type { IProductImagesData } from '@/types';
import type { IBaseRepository } from '../IBaseRepository';

export interface IProductImagesRepository
  extends IBaseRepository<IProductImages, IProductImagesData> {}
