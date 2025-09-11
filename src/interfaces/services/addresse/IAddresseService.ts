import type { CreateAddresseDto } from '@/dtos';
import type { IBaseService } from '@/interfaces';
import type { IAddresse } from '@/interfaces/entities';
import type { IAddresseData } from '@/types';

export interface IAddresseService extends IBaseService<IAddresse, IAddresseData> {
  create(createUserAdminDto: CreateAddresseDto): Promise<IAddresse>;
}
