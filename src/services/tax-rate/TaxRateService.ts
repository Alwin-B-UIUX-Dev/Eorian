import { ConflictError, UserError } from '@/exceptions';
import type { ITaxRate, ITaxRateRepository, ITaxRateService } from '@/interfaces';
import type { CreateTaxRateData, UpdateTaxRateData } from '@/types';

export class TaxRateService implements ITaxRateService {
  constructor(private readonly repository: ITaxRateRepository) {}

  public async create(data: CreateTaxRateData): Promise<ITaxRate> {
    const roleName: string = String(data.roleName);
    const existing = await this.repository.findByTaxName(roleName);
    if (existing) {
      throw ConflictError.resourceExists( 'roleName', roleName);
    }
    return await this.repository.create({
      ...data,
      roleName
    });
  }

  public async findAll(limit?: number, offset?: number): Promise<ITaxRate[]> {
    return await this.repository.findAll(limit, offset);
  }

  public async findOne(id: string): Promise<ITaxRate | null> {
    return await this.repository.findById(id);
  }

  public async update(id: string, data: UpdateTaxRateData): Promise<ITaxRate> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw UserError.notFound(id);
    }
    if (data.roleName) {
      const roleName: string = String(data.roleName);
      const duplicate = await this.repository.findByTaxName(roleName);
      if (duplicate && duplicate.getId() !== id) {
        throw ConflictError.resourceExists('Tax_rate', 'roleName', roleName);
      }
    }
    const updatePayload: UpdateTaxRateData = {
      ...data,
      ...(data.roleName !== undefined ? { roleName: String(data.roleName) } : {})
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
