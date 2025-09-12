import type { IBaseRepository, ITaxRate } from '@/interfaces';
import type { ITaxRateData } from '@/types';

export interface ITaxRateRepository extends IBaseRepository<ITaxRate, ITaxRateData> {
  findByTaxName(taxName: string): Promise<ITaxRate | null>;
}
