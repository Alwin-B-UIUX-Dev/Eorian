import type { IUserPaymentMethods } from '@/interfaces/entities/user-payment-methods';
import type { IBaseRepository } from '../IBaseRepository';

export interface IUserPaymentMethodsRepository
  extends IBaseRepository<IUserPaymentMethods, IUserPaymentMethodsRepository> {}
