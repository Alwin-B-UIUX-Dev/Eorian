import type { NextFunction, Request, Response } from 'express';
import { CreateCartItemDto, ResponseCartItemDto } from '@/dtos';
import type { ICartItem, ICartItemControllers, ICartItemService } from '@/interfaces';
import type { IApiResponseData } from '@/types';
import { ApiResponseFactory } from '@/utils';

export class CartItemController implements ICartItemControllers {
  constructor(private readonly CartItemervice: ICartItemService) {}
  public async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async show(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createCartItemDto = new CreateCartItemDto(req.body);
      const CartItem: ICartItem = await this.CartItemervice.create(createCartItemDto);
      const CartItemResponse: ResponseCartItemDto = ResponseCartItemDto.fromCartItem(CartItem);

      const response: IApiResponseData<{ adresses: ResponseCartItemDto }> =
        ApiResponseFactory.success('votre adresse a biuen été enregistré', {
          adresses: CartItemResponse
        });

      res.status(201).json(response);
    } catch {}
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public asyncdestroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
