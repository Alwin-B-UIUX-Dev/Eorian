import type { CreateOrderDto } from '@/dtos';
import type { IOrder, IOrderRepository, IOrderService } from '@/interfaces';
import type { CreateOrderData, WithoutSystemFieldsType } from '@/types';

export class OrderService implements IOrderService {
  constructor(private readonly OrderRepository: IOrderRepository) {}

  public async create(CreateOrderDto: CreateOrderDto): Promise<IOrder> {
    try {
      const orderData: CreateOrderData = {
        orderNumber: CreateOrderDto.getOrderNumber(),
        userId: CreateOrderDto.getUserId(),
        shippingAddressId: CreateOrderDto.getShippingAddressId(),
        billingAddressId: CreateOrderDto.getBillingAddressId(),
        status: CreateOrderDto.getStatus(),
        subtotalCents: CreateOrderDto.getSubtotalCents(),
        taxAmountCents: CreateOrderDto.getTaxAmountCents(),
        shippingCents: CreateOrderDto.getShippingCents(),
        totalCents: CreateOrderDto.getTotalCents(),
        paymentStatus: CreateOrderDto.getPaymentStatus(),
        paymentMethod: CreateOrderDto.getPaymentMethod(),
        paymentReference: CreateOrderDto.getPaymentReference(),
        shippingMethod: CreateOrderDto.getShippingMethod(),
        trackingNumber: CreateOrderDto.getTrackingNumber(),
        customerNotes: CreateOrderDto.getCustomerNotes(),
        adminNotes: CreateOrderDto.getAdminNotes(),
        shippedAt: CreateOrderDto.getShippedAt(),
        deliveredAt: CreateOrderDto.getDeliveredAt()
      };
      return await this.OrderRepository.create(orderData);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS Order create():', error);
    }
    throw new Error('bug');
  }

  public async findAll(limit?: number, offset?: number): Promise<IOrder[]> {
    throw new Error('Method not implemented.');
  }
  public async findOne(id: string): Promise<IOrder> {
    throw new Error('Method not implemented.');
  }
  public async update(id: string, data: Partial<WithoutSystemFieldsType<IOrder>>): Promise<IOrder> {
    throw new Error('Method not implemented.');
  }
  public async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
