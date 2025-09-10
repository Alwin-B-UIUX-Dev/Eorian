import type { IBaseService, IUserPaymentMethod } from '@/interfaces';
import type { IUserPaymentMethodData } from '@/types';

export interface IUserPaymentMethodService
  extends IBaseService<IUserPaymentMethod, IUserPaymentMethodData> {}
