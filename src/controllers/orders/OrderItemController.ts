// src/controllers/orders/OrderItemController.ts

import type { NextFunction, Request, Response } from 'express';
import { CreateOrderItemDto, ResponseOrderItemDto } from '@/dtos';
import type { IOrderItemController, IOrderItemService } from '@/interfaces';
import { ApiResponseFactory } from '@/utils';

export class OrderItemController implements IOrderItemController {
  constructor(private readonly service: IOrderItemService) {}

  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;
      const orderItems = await this.service.findAll(limit, offset);
      res.json(
        ApiResponseFactory.success(
          'Order items fetched',
          orderItems.map(item => new ResponseOrderItemDto(item.toData()))
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idNum: number = Number(String(req.params.id).trim());
      if (!Number.isInteger(idNum) || idNum <= 0) {
        res.status(400).json(ApiResponseFactory.error('Invalid id parameter', '400'));
        return;
      }
      const orderItem = await this.service.findOne(String(idNum));
      res.json(
        ApiResponseFactory.success(
          'Order item fetched',
          orderItem ? new ResponseOrderItemDto(orderItem.toData()) : null
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = new CreateOrderItemDto(req.body);
      const orderItem = await this.service.create({
        orderId: dto.orderId,
        productId: dto.productId,
        productName: dto.productName,
        productSku: dto.productSku,
        unitPriceCents: dto.unitPriceCents,
        taxRate: dto.taxRate,
        quantity: dto.quantity,
        lineSubtotalCents: dto.lineSubtotalCents,
        lineTaxCents: dto.lineTaxCents,
        lineTotalCents: dto.lineTotalCents
      });
      res
        .status(201)
        .json(
          ApiResponseFactory.success(
            'Order item created',
            new ResponseOrderItemDto(orderItem.toData())
          )
        );
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idNum: number = Number(String(req.params.id).trim());
      if (!Number.isInteger(idNum) || idNum <= 0) {
        res.status(400).json(ApiResponseFactory.error('Invalid id parameter', '400'));
        return;
      }
      const orderItem = await this.service.update(String(idNum), req.body);
      res.json(
        ApiResponseFactory.success(
          'Order item updated',
          new ResponseOrderItemDto(orderItem.toData())
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idNum: number = Number(String(req.params.id).trim());
      if (!Number.isInteger(idNum) || idNum <= 0) {
        res.status(400).json(ApiResponseFactory.error('Invalid id parameter', '400'));
        return;
      }
      await this.service.remove(String(idNum));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async findByOrderId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orderIdNum: number = Number(String(req.params.orderId).trim());
      if (!Number.isInteger(orderIdNum) || orderIdNum <= 0) {
        res.status(400).json(ApiResponseFactory.error('Invalid orderId parameter', '400'));
        return;
      }
      const orderItems = await this.service.findByOrderId(String(orderIdNum));
      res.json(
        ApiResponseFactory.success(
          'Order items by order id fetched',
          orderItems.map(item => new ResponseOrderItemDto(item.toData()))
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async findByProductId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productIdNum: number = Number(String(req.params.productId).trim());
      if (!Number.isInteger(productIdNum) || productIdNum <= 0) {
        res.status(400).json(ApiResponseFactory.error('Invalid productId parameter', '400'));
        return;
      }
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;
      const orderItems = await this.service.findByProductId(String(productIdNum), limit, offset);
      res.json(
        ApiResponseFactory.success(
          'Order items by product id fetched',
          orderItems.map(item => new ResponseOrderItemDto(item.toData()))
        )
      );
    } catch (error) {
      next(error);
    }
  }
}
