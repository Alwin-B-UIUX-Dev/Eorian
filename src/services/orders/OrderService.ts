import { ConflictError, UserError } from '@/exceptions';
import type { IOrder, IOrderRepository, IOrderService } from '@/interfaces';
import type { CreateOrderData, UpdateOrderData } from '@/types';

export class OrderService implements IOrderService {
  constructor(private readonly repository: IOrderRepository) {}

  public async create(data: CreateOrderData): Promise<IOrder> {
    const orderNumber: string = String(data.orderNumber);
    const existing = await this.repository.findByOrderNumber(orderNumber);
    if (existing) {
      throw ConflictError.resourceExists('order', 'orderNumber', orderNumber);
    }
    return await this.repository.create({
      ...data,
      orderNumber
    });
  }

  public async findAll(limit?: number, offset?: number): Promise<IOrder[]> {
    return await this.repository.findAll(limit, offset);
  }

  public async findOne(id: string): Promise<IOrder | null> {
    return await this.repository.findById(id);
  }

  public async findByUserId(userId: string, limit?: number, offset?: number): Promise<IOrder[]> {
    return await this.repository.findByUserId(userId, limit, offset);
  }

  public async findByStatus(status: string, limit?: number, offset?: number): Promise<IOrder[]> {
    return await this.repository.findByStatus(status, limit, offset);
  }

  public async findByPaymentStatus(
    paymentStatus: string,
    limit?: number,
    offset?: number
  ): Promise<IOrder[]> {
    return await this.repository.findByPaymentStatus(paymentStatus, limit, offset);
  }

  public async update(id: string, data: UpdateOrderData): Promise<IOrder> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw UserError.notFound(id);
    }
    if (data.orderNumber) {
      const orderNumber: string = String(data.orderNumber);
      const duplicate = await this.repository.findByOrderNumber(orderNumber);
      if (duplicate && duplicate.getId() !== id) {
        throw ConflictError.resourceExists('order', 'orderNumber', orderNumber);
      }
    }
    const updatePayload: UpdateOrderData = {
      ...data,
      ...(data.orderNumber !== undefined ? { orderNumber: String(data.orderNumber) } : {})
    };
    return await this.repository.update(id, updatePayload);
  }

  public async remove(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw UserError.notFound(id);
    }
    await this.repository.delete(id);
  }
}
