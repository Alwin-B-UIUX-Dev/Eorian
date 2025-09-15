import type {
  IBaseEntityData,
  PartialWithoutSystemFieldsType,
  WithoutSystemFieldsType
} from '@/types';

export interface ITaxeRateData extends IBaseEntityData {
  name: string;
  rate: number;
  description: string;
  isActive: boolean;
}

export type CreateTaxeRateData = WithoutSystemFieldsType<ITaxeRateData>;
export type UpdateTaxeRateData = PartialWithoutSystemFieldsType<ITaxeRateData>;
