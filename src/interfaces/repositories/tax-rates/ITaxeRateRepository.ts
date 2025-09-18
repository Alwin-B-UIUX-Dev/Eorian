import type { IBaseRepository, ITaxeRate } from '@/interfaces';
import type { ITaxeRateData } from '@/types';

export interface ITaxeRateRepository extends IBaseRepository<ITaxeRate, ITaxeRateData> {
  findByName(name: string): Promise<ITaxeRate | null>;
  findByActiveStatus(active: boolean): Promise<ITaxeRate[]>;
}
