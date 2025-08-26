import type { IAddresses } from '@/interfaces/entities';
import type { IAddressesData } from '@/types';
import type { IBaseRepository } from '../IBaseRepository';

export interface IAdressesRepository extends IBaseRepository<IAddresses, IAddressesData> {}
