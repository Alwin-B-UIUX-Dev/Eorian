import type { ITaxeRate } from '@/interfaces';
import type { CreateTaxeRateData, UpdateTaxeRateData } from '@/types';

export interface ITaxeRateService {
  create(data: CreateTaxeRateData): Promise<ITaxeRate>;
  findAll(limit?: number, offset?: number): Promise<ITaxeRate[]>;
  findOne(id: string): Promise<ITaxeRate | null>;
  update(id: string, data: UpdateTaxeRateData): Promise<ITaxeRate>;
  remove(id: string): Promise<void>;
}
