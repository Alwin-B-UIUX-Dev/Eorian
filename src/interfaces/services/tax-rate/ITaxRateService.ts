import type { IBaseService, ITaxRate } from '@/interfaces';
import type { CreateTaxRateData, ITaxRateData, UpdateTaxRateData } from '@/types';

export interface ITaxRateService extends IBaseService<ITaxRate, ITaxRateData> {
  create(data: CreateTaxRateData): Promise<ITaxRate>;
  findAll(limit?: number, offset?: number): Promise<ITaxRate[]>;
  findOne(id: string): Promise<ITaxRate | null>;
  update(id: string, data: UpdateTaxRateData): Promise<ITaxRate>;
  remove(id: string): Promise<void>;
}
