import type { CreateUserPaymentMethod } from '@/dtos';
import type {
  IUserPaymentMethod,
  IUserPaymentMethodRepository,
  IUserPaymentMethodService
} from '@/interfaces';
import type { CreateUserPaymentMethodData, WithoutSystemFieldsType } from '@/types';

export class UserPaymentMethodService implements IUserPaymentMethodService {
  constructor(private readonly UserPaymentMethodRepository: IUserPaymentMethodRepository) {}

  public async create(
    CreateUserPaymentMethodDto: CreateUserPaymentMethod
  ): Promise<IUserPaymentMethod> {
    try {
      const userPaymentMethodData: CreateUserPaymentMethodData = {
        userId: CreateUserPaymentMethodDto.getUserId(),
        cardToken: CreateUserPaymentMethodDto.getCardToken(),
        cardLast4: CreateUserPaymentMethodDto.getCardLast4(),
        cardBrand: CreateUserPaymentMethodDto.getCardBrand(),
        cardType: CreateUserPaymentMethodDto.getCardType(),
        cardholderName: CreateUserPaymentMethodDto.getCardholderName(),
        expiresMonth: CreateUserPaymentMethodDto.getExpiresMonth(),
        expiresYear: CreateUserPaymentMethodDto.getExpiresYear(),
        nickname: CreateUserPaymentMethodDto.getNickname(),
        isDefault: CreateUserPaymentMethodDto.getIsDefault(),
        isActive: CreateUserPaymentMethodDto.getIsActive()
      };
      return await this.UserPaymentMethodRepository.create(userPaymentMethodData);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS UserPaymentMethod create():', error);
    }
    throw new Error('bug');
  }

  public async findAll(limit?: number, offset?: number): Promise<IUserPaymentMethod[]> {
    throw new Error('Method not implemented.');
  }
  public async findOne(id: string): Promise<IUserPaymentMethod> {
    throw new Error('Method not implemented.');
  }
  public async update(
    id: string,
    data: Partial<WithoutSystemFieldsType<IUserPaymentMethod>>
  ): Promise<IUserPaymentMethod> {
    throw new Error('Method not implemented.');
  }
  public async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
