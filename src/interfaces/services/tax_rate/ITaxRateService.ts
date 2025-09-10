import type { CreateTaxRateDto } from '@/dtos';
import type { IBaseService, ITaxRate } from '@/interfaces';
import type { ITaxRateData } from '@/types';

export interface ITaxRateService extends IBaseService<ITaxRate, ITaxRateData> {
  create(createUserAdminDto: CreateTaxRateDto): Promise<ITaxRate>;
}
