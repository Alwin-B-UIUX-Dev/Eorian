import type { CreateProductDto } from '@/dtos';
import type { IProduct } from '@/interfaces/entities';
import type { IBaseService } from '@/interfaces/services/IBaseService';
import type { IProductData } from '@/types';
export interface IProductService extends IBaseService<IProduct, IProductData> {
  create(createUserAdminDto: CreateProductDto): Promise<IProduct>;
}
