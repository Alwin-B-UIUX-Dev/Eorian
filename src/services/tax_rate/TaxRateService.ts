import type { CreateTaxRateDto } from '@/dtos';
import type { ITaxRate, ITaxRateRepository, ITaxRateService } from '@/interfaces';
import type { CreateTaxRateData, WithoutSystemFieldsType } from '@/types';

export class TaxRateService implements ITaxRateService {
  constructor(private readonly TaxRateRepository: ITaxRateRepository) {}

  public async create(CreateTaxRateDto: CreateTaxRateDto): Promise<ITaxRate> {
    try {
      const taxRateData: CreateTaxRateData = {
        name: CreateTaxRateDto.getName(),
        rate: CreateTaxRateDto.getRate(),
        description: CreateTaxRateDto.getDescription(),
        isActive: CreateTaxRateDto.getIsActive()
      };
      return await this.TaxRateRepository.create(taxRateData);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS TaxRate create():', error);
    }
    throw new Error('bug');
  }

  public async findAll(limit?: number, offset?: number): Promise<ITaxRate[]> {
    throw new Error('Method not implemented.');
  }
  public async findOne(id: string): Promise<ITaxRate> {
    throw new Error('Method not implemented.');
  }
  public async update(
    id: string,
    data: Partial<WithoutSystemFieldsType<ITaxRate>>
  ): Promise<ITaxRate> {
    throw new Error('Method not implemented.');
  }
  public async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
