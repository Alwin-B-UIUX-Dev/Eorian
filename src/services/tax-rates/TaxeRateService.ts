import { ConflictError, UserError } from '@/exceptions';
import type { ITaxeRate, ITaxeRateRepository, ITaxeRateService } from '@/interfaces';
import type { CreateTaxeRateData, UpdateTaxeRateData } from '@/types';

export class TaxeRateService implements ITaxeRateService {
  constructor(private readonly repository: ITaxeRateRepository) {}

  public async create(data: CreateTaxeRateData): Promise<ITaxeRate> {
    const name: string = String(data.name);
    const existing = await this.repository.findByName(name);
    if (existing) {
      throw ConflictError.resourceExists('tax_rate', 'name', name);
    }
    return await this.repository.create({
      ...data,
      name
    });
  }

  public async findAll(limit?: number, offset?: number): Promise<ITaxeRate[]> {
    return await this.repository.findAll(limit, offset);
  }

  public async findOne(id: string): Promise<ITaxeRate | null> {
    return await this.repository.findById(id);
  }

  public async update(id: string, data: UpdateTaxeRateData): Promise<ITaxeRate> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw UserError.notFound(id);
    }
    if (data.name) {
      const name: string = String(data.name);
      const duplicate = await this.repository.findByName(name);
      if (duplicate && duplicate.getId() !== id) {
        throw ConflictError.resourceExists('tax_rate', 'name', name);
      }
    }
    const updatePayload: UpdateTaxeRateData = {
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
