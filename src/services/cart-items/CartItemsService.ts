import type { CreateCartItemsDto } from '@/dtos';
import type { ICartItems, ICartItemsRepository, ICartItemsService } from '@/interfaces';
import type { WithoutSystemFieldsType } from '@/types';
import type { CreateCartItemsData } from '@/types/entities/cart-items/ICartItemsData';

export class CartItemsService implements ICartItemsService {
  constructor(private readonly CartItemsRepository: ICartItemsRepository) {}

  public async create(CreateCartItemsDto: CreateCartItemsDto): Promise<ICartItems> {
    try {
      const CartItemsData: CreateCartItemsData = {
        userId: CreateCartItemsDto.getUserId(),
        productId: CreateCartItemsDto.getProductId(),
        quantity: CreateCartItemsDto.getQuantity()
      };
      return await this.CartItemsRepository.create(CartItemsData);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS CartItems create():', error);
    }
    throw new Error("bug")
  }

  public async findAll(limit?: number, offset?: number): Promise<ICartItems[]> {
    throw new Error('Method not implemented.');
  }
  public async findOne(id: string): Promise<ICartItems | null> {
    throw new Error('Method not implemented.');
  }
  public async update(
    id: string,
    data: Partial<WithoutSystemFieldsType<ICartItems>>
  ): Promise<ICartItems> {
    throw new Error('Method not implemented.');
  }
  public async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
