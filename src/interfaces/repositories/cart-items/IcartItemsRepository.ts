import type { ICartItems } from '@/interfaces/entities';
import type { ICartItemsData } from '@/types';
import type { IBaseRepository } from '../IBaseRepository';

export interface ICartItemsRepository extends IBaseRepository<ICartItems, ICartItemsData> {}
