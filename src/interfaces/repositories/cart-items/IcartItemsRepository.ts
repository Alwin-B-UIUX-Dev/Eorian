import type { CreateCartItemsDto } from '@/dtos';
import type { ICartItems } from '@/interfaces/entities';
import type { ICartItemsData } from '@/types/entities/cart-items/ICartItemsData';
import type { IBaseRepository } from '../IBaseRepository';

export interface ICartItemsRepository extends IBaseRepository<ICartItems, ICartItemsData> {
  create(createUserAdminDto: CreateCartItemsDto): Promise<ICartItem>;
}
