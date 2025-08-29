import type { IAddresses, IAdressesService } from '@/interfaces';
import type { IAdressesRepository } from '@/interfaces/repositories/addresses';
import type { CreateAddressesData, IAddressesData, WithoutSystemFieldsType } from '@/types';

export class AdressesService implements IAdressesService {
  constructor(private readonly adressesRepository: IAdressesRepository) {}

  public async create(createAddressesDto: CreateAddressesDto): Promise<IAddresses> {
    try {
      // Etape 1 : Création de adressesData pour le repository
      const adressesData: CreateAddressesData = {
        userId: createAddressesDto.getUserId(),
        type: createAddressesDto.getType(),
        firstName: createAddressesDto.getFirstName(),
        lastName: createAddressesDto.getLastName(),
        company: createAddressesDto.getCompany(),
        phone: createAddressesDto.getPhone(),
        addressLine1: createAddressesDto.getAddressLine1(),
        addressLine2: createAddressesDto.getAddressLine2(),
        city: createAddressesDto.getCity(),
        postalCode: createAddressesDto.getPostalCode(),
        stateRegion: createAddressesDto.getStateRegion(),
        country: createAddressesDto.getCountry(),
        isDefault: createAddressesDto.getIsDefault()
      };

      // Etape 2 : Envoyer adressesData vers le repository pour la sauvegarde
      return await this.adressesRepository.create(adressesData);
    } catch (error) {}
  }

  public async findAll(limit?: number, offset?: number): Promise<IAddresses[]> {
    throw new Error('Method not implemented.');
  }
  public async findOne(id: string): Promise<IAddresses> {
    throw new Error('Method not implemented.');
  }
  public async update(
    id: string,
    data: Partial<WithoutSystemFieldsType<IAddressesData>>
  ): Promise<IAddresses> {
    throw new Error('Method not implemented.');
  }
  public async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
