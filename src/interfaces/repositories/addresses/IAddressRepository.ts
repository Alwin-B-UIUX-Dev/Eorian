import type { IAddress } from '@/interfaces';
import type { CreateAddressData, UpdateAddressData } from '@/types';

export interface IAddressRepository {
  create(data: CreateAddressData): Promise<IAddress>;
  findById(id: string): Promise<IAddress | null>;
  findAll(limit?: number, offset?: number): Promise<IAddress[]>;
  update(id: string, data: UpdateAddressData): Promise<IAddress>;
  delete(id: string): Promise<boolean>;
  findByUserId(userId: string): Promise<IAddress[]>;
  findByUserIdAndType(userId: string, type: 'shipping' | 'billing' | 'both'): Promise<IAddress[]>;
  findDefaultByUserIdAndType(
    userId: string,
    type: 'shipping' | 'billing' | 'both'
  ): Promise<IAddress | null>;
  resetDefaultAddressesByUserIdAndType(
    userId: string,
    type: 'shipping' | 'billing' | 'both'
  ): Promise<void>;
}
