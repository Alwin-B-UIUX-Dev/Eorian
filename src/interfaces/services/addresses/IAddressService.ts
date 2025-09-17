import type { IAddress } from '@/interfaces';
import type { CreateAddressData, UpdateAddressData } from '@/types';

export interface IAddressService {
  create(data: CreateAddressData): Promise<IAddress>;
  findAll(limit?: number, offset?: number): Promise<IAddress[]>;
  findOne(id: string): Promise<IAddress | null>;
  findByUserId(userId: string): Promise<IAddress[]>;
  findByUserIdAndType(userId: string, type: 'shipping' | 'billing' | 'both'): Promise<IAddress[]>;
  findDefaultByUserIdAndType(
    userId: string,
    type: 'shipping' | 'billing' | 'both'
  ): Promise<IAddress | null>;
  update(id: string, data: UpdateAddressData): Promise<IAddress>;
  remove(id: string): Promise<void>;
}
