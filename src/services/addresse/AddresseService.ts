import type { CreateAddresseDto } from '@/dtos';
import type { IAddresse, IAddresseRepository, IAddresseService } from '@/interfaces';
import type { CreateAddresseData, WithoutSystemFieldsType } from '@/types';
export class AddresseService implements IAddresseService {
  constructor(private readonly AddresseRepository: IAddresseRepository) {}

  public async create(CreateAddresseDto: CreateAddresseDto): Promise<IAddresse> {
    try {
      const AddresseData: CreateAddresseData = {
        userId: CreateAddresseDto.getUserId(),
        firstName: CreateAddresseDto.getFirstName(),
        lastName: CreateAddresseDto.getLastName(),
        company: CreateAddresseDto.getCompany(),
        phone: CreateAddresseDto.getPhone(),
        addressLine1: CreateAddresseDto.getAddressLine1(),
        addressLine2: CreateAddresseDto.getAddressLine2(),
        city: CreateAddresseDto.getCity(),
        postalCode: CreateAddresseDto.getPostalCode(),
        stateRegion: CreateAddresseDto.getStateRegion(),
        country: CreateAddresseDto.getCountry(),
        isDefault: CreateAddresseDto.getIsDefault()
      };
      return await this.AddresseRepository.create(AddresseData);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS Addresse create():', error);
    }
    throw new Error('bug');
  }

  public async findAll(limit?: number, offset?: number): Promise<IAddresse[]> {
    throw new Error('Method not implemented.');
  }
  public async findOne(id: string): Promise<IAddresse> {
    throw new Error('Method not implemented.');
  }
  public async update(
    id: string,
    data: Partial<WithoutSystemFieldsType<IAddresse>>
  ): Promise<IAddresse> {
    throw new Error('Method not implemented.');
  }
  public async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
