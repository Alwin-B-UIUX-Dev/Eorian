import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface ITaxRateData extends IBaseEntityData {
  name: string;
  rate: string;
  description: string;
  isActive: boolean;
}

export type CreateTaxRateData = WithoutSystemFieldsType<ITaxRateData>;
export type UpdateTaxRateData = PartialWithoutSystemFieldsType<ITaxRateData>;
