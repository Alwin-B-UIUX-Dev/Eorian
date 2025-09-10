import type { NextFunction, Request, Response } from 'express';
import { CreateOrderDto, ResponseOrderDto } from '@/dtos';
import type { IOrder, IOrderControllers, IOrderService } from '@/interfaces';
import type { IApiResponseData } from '@/types';
import { ApiResponseFactory } from '@/utils';

export class OrderController implements IOrderControllers {
  constructor(private readonly OrderService: IOrderService) {}
  index(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  show(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createOrderDto = new CreateOrderDto(req.body);
      const Order: IOrder = await this.OrderService.create(createOrderDto);
      const OrderResponse: ResponseOrderDto = ResponseOrderDto.fromOrder(Order);

      const response: IApiResponseData<{ Order: ResponseOrderDto }> = ApiResponseFactory.success(
        'votre adresse a biuen été enregistré',
        { Order: OrderResponse }
      );

      res.status(201).json(response);
    } catch {}
  }
  update(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
