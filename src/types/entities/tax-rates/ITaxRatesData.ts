import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '../BaseType';
import type { IBaseEntityData } from '../IBaseEntityData';

export interface ITaxRatesData extends IBaseEntityData {
  name: string;
  rate: number;
  description: string;
  is_active: boolean;
}

export type CreateTaxRatesData = WithoutSystemFieldsType<ITaxRatesData>;
export type UpdateTaxRatesData = PartialWithoutSystemFieldsType<ITaxRatesData>;
