import type { CreateOrderItemDto } from '@/dtos';
import type { IOrderItem, IOrderItemRepository, IOrderItemService } from '@/interfaces';
import type { CreateOrderItemData, WithoutSystemFieldsType } from '@/types';

export class OrderItemService implements IOrderItemService {
  constructor(private readonly OrderItemRepository: IOrderItemRepository) {}

  public async create(CreateOrderItemDto: CreateOrderItemDto): Promise<IOrderItem> {
    try {
      const orderItemData: CreateOrderItemData = {
        orderId: CreateOrderItemDto.getOrderId(),
        productId: CreateOrderItemDto.getProductId(),
        productName: CreateOrderItemDto.getProductName(),
        productSku: CreateOrderItemDto.getProductSku(),
        unitPriceCents: CreateOrderItemDto.getUnitPriceCents(),
        taxRate: CreateOrderItemDto.getTaxRate(),
        quantity: CreateOrderItemDto.getQuantity(),
        lineSubtotalCents: CreateOrderItemDto.getLineSubtotalCents(),
        lineTaxCents: CreateOrderItemDto.getLineTaxCents(),
        lineTotalCents: CreateOrderItemDto.getLineTotalCents()
      };
      return await this.OrderItemRepository.create(orderItemData);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS OrderItem create():', error);
    }
    throw new Error('bug');
  }

  public async findAll(limit?: number, offset?: number): Promise<IOrderItem[]> {
    throw new Error('Method not implemented.');
  }
  public async findOne(id: string): Promise<IOrderItem> {
    throw new Error('Method not implemented.');
  }
  public async update(
    id: string,
    data: Partial<WithoutSystemFieldsType<IOrderItem>>
  ): Promise<IOrderItem> {
    throw new Error('Method not implemented.');
  }
  public async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
