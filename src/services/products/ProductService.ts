import { ConflictError, UserError } from '@/exceptions';
import type { IProduct, IProductRepository, IProductService } from '@/interfaces';
import type { CreateProductData, UpdateProductData } from '@/types';

export class ProductService implements IProductService {
  constructor(private readonly repository: IProductRepository) {}

  public async create(data: CreateProductData): Promise<IProduct> {
    const name: string = String(data.name);
    const existing = await this.repository.findByName(name);
    if (existing) {
      throw ConflictError.resourceExists('product', 'name', name);
    }
    return await this.repository.create({
      ...data,
      name
    });
  }

  public async findAll(limit?: number, offset?: number): Promise<IProduct[]> {
    return await this.repository.findAll(limit, offset);
  }

  public async findOne(id: string): Promise<IProduct | null> {
    return await this.repository.findById(id);
  }

  public async update(id: string, data: UpdateProductData): Promise<IProduct> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw UserError.notFound(id);
    }
    if (data.name) {
      const name: string = String(data.name);
      const duplicate = await this.repository.findByName(name);
      if (duplicate && duplicate.getId() !== id) {
        throw ConflictError.resourceExists('product', 'name', name);
      }
    }
    const updatePayload: UpdateProductData = {
      ...data,
      ...(data.name !== undefined ? { name: String(data.name) } : {})
    };
    return await this.repository.update(id, updatePayload);
  }

  public async remove(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw UserError.notFound(id);
    }
    await this.repository.delete(id);
  }
}
