import { ConflictError, UserError } from '@/exceptions';
import type { IAddress, IAddressRepository, IAddressService } from '@/interfaces';
import type { CreateAddressData, UpdateAddressData } from '@/types';

export class AddressService implements IAddressService {
  constructor(private readonly repository: IAddressRepository) {}

  public async create(data: CreateAddressData): Promise<IAddress> {
    // Si on définit cette adresse comme par défaut, on vérifie qu'il n'y en a pas déjà une autre
    if (data.isDefault) {
      const existingDefault = await this.repository.findDefaultByUserIdAndType(
        data.userId as string,
        data.type as 'shipping' | 'billing' | 'both'
      );
      if (existingDefault) {
        throw ConflictError.resourceExists('address', 'default', `${data.userId}-${data.type}`);
      }
    }

    return await this.repository.create(data);
  }

  public async findAll(limit?: number, offset?: number): Promise<IAddress[]> {
    return await this.repository.findAll(limit, offset);
  }

  public async findOne(id: string): Promise<IAddress | null> {
    return await this.repository.findById(id);
  }

  public async findByUserId(userId: string): Promise<IAddress[]> {
    return await this.repository.findByUserId(userId);
  }

  public async findByUserIdAndType(
    userId: string,
    type: 'shipping' | 'billing' | 'both'
  ): Promise<IAddress[]> {
    return await this.repository.findByUserIdAndType(userId, type);
  }

  public async findDefaultByUserIdAndType(
    userId: string,
    type: 'shipping' | 'billing' | 'both'
  ): Promise<IAddress | null> {
    return await this.repository.findDefaultByUserIdAndType(userId, type);
  }

  public async update(id: string, data: UpdateAddressData): Promise<IAddress> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw UserError.notFound(id);
    }

    // Si on définit cette adresse comme par défaut, on vérifie qu'il n'y en a pas déjà une autre
    if (data.isDefault) {
      const type = (data.type || existing.getType()) as 'shipping' | 'billing' | 'both';
      const existingDefault = await this.repository.findDefaultByUserIdAndType(
        existing.getUserId(),
        type
      );
      if (existingDefault && existingDefault.getId() !== id) {
        throw ConflictError.resourceExists('address', 'default', `${existing.getUserId()}-${type}`);
      }
    }

    return await this.repository.update(id, data);
  }

  public async remove(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw UserError.notFound(id);
    }
    await this.repository.delete(id);
  }
}
