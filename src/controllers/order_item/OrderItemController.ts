import type { NextFunction, Request, Response } from 'express';
import { CreateOrderItemDto, ResponseOrderItemDto } from '@/dtos';
import type { IOrderItem, IOrderItemControllers, IOrderItemService } from '@/interfaces';
import type { IApiResponseData } from '@/types';
import { ApiResponseFactory } from '@/utils';

export class OrderItemController implements IOrderItemControllers {
  constructor(private readonly OrderItemService: IOrderItemService) {}
  index(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  show(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createOrderItemDto = new CreateOrderItemDto(req.body);
      const OrderItem: IOrderItem = await this.OrderItemService.create(createOrderItemDto);
      const OrderItemResponse: ResponseOrderItemDto = ResponseOrderItemDto.fromOrderItem(OrderItem);

      const response: IApiResponseData<{ OrderItem: ResponseOrderItemDto }> =
        ApiResponseFactory.success('votre adresse a biuen été enregistré', {
          OrderItem: OrderItemResponse
        });

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
