import type { IFlexiblePropsData } from '@/types';

export interface IBaseEntityData extends IFlexiblePropsData {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
