import type { IBaseRepository, IUserPaymentMethod } from '@/interfaces';
import type { IUserPaymentMethodData } from '@/types';

export interface IUserPaymentMethodRepository
  extends IBaseRepository<IUserPaymentMethod, IUserPaymentMethodData> {}
