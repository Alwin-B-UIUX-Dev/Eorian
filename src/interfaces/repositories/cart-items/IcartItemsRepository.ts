import type { ICartItem } from '@/interfaces/entities';
import type { ICartItemsData } from '@/types/entities/cart-items/ICartItemsData';
import type { IBaseRepository } from '../IBaseRepository';

export interface IcartItemsRepository extends IBaseRepository<ICartItem, ICartItemsData> {}
