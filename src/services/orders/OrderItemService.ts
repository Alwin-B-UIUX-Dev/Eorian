import { UserError } from '@/exceptions';
import type { IOrderItem, IOrderItemRepository, IOrderItemService } from '@/interfaces';
import type { CreateOrderItemData, UpdateOrderItemData } from '@/types';

export class OrderItemService implements IOrderItemService {
  constructor(private readonly repository: IOrderItemRepository) {}

  public async create(data: CreateOrderItemData): Promise<IOrderItem> {
    return await this.repository.create(data);
  }

  public async findAll(limit?: number, offset?: number): Promise<IOrderItem[]> {
    return await this.repository.findAll(limit, offset);
  }

  public async findOne(id: string): Promise<IOrderItem | null> {
    return await this.repository.findById(id);
  }

  public async findByOrderId(orderId: string): Promise<IOrderItem[]> {
    return await this.repository.findByOrderId(orderId);
  }

  public async findByProductId(
    productId: string,
    limit?: number,
    offset?: number
  ): Promise<IOrderItem[]> {
    return await this.repository.findByProductId(productId, limit, offset);
  }

  public async update(id: string, data: UpdateOrderItemData): Promise<IOrderItem> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw UserError.notFound(id);
    }
    return await this.repository.update(id, data);
  }

  public async remove(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw UserError.notFound(id);
    }
    await this.repository.delete(id);
  }

  public async removeByOrderId(orderId: string): Promise<void> {
    await this.repository.deleteByOrderId(orderId);
  }
}
