import type { CreateCartItemDto } from '@/dtos/cart_item';
import type { ICartItem, ICartItemRepository, ICartItemService } from '@/interfaces';
import type { CreateCartItemData, WithoutSystemFieldsType } from '@/types';

export class CartItemService implements ICartItemService {
  constructor(private readonly CartItemRepository: ICartItemRepository) {}

  public async create(CreateCartItemDto: CreateCartItemDto): Promise<ICartItem> {
    try {
      const CartItemData: CreateCartItemData = {
        userId: CreateCartItemDto.getUserId(),
        productId: CreateCartItemDto.getProductId(),
        quantity: CreateCartItemDto.getQuantity()
      };
      return await this.CartItemRepository.create(CartItemData);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS CartItem create():', error);
    }
    throw new Error('bug');
  }

  public async findAll(limit?: number, offset?: number): Promise<ICartItem[]> {
    throw new Error('Method not implemented.');
  }
  public async findOne(id: string): Promise<ICartItem> {
    throw new Error('Method not implemented.');
  }
  public async update(
    id: string,
    data: Partial<WithoutSystemFieldsType<ICartItem>>
  ): Promise<ICartItem> {
    throw new Error('Method not implemented.');
  }
  public async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
