import type { CreateUserPaymentMethodDto } from '@/dtos';
import type { IBaseService, IUserPaymentMethod } from '@/interfaces';
import type { IUserPaymentMethodData } from '@/types';

export interface IUserPaymentMethodService
  extends IBaseService<IUserPaymentMethod, IUserPaymentMethodData> {
  create(createUserAdminDto: CreateUserPaymentMethodDto): Promise<IUserPaymentMethod>;
}
