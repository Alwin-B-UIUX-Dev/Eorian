// src/controllers/orders/OrderController.ts

import type { NextFunction, Request, Response } from 'express';
import { CreateOrderDto, ResponseOrderDto } from '@/dtos';
import type { IOrderController, IOrderService } from '@/interfaces';
import { ApiResponseFactory } from '@/utils';

export class OrderController implements IOrderController {
  constructor(private readonly service: IOrderService) {}

  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;
      const orders = await this.service.findAll(limit, offset);
      res.json(
        ApiResponseFactory.success(
          'Orders fetched',
          orders.map(order => new ResponseOrderDto(order.toData()))
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
      const order = await this.service.findOne(String(idNum));
      res.json(
        ApiResponseFactory.success(
          'Order fetched',
          order ? new ResponseOrderDto(order.toData()) : null
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = new CreateOrderDto(req.body);
      const order = await this.service.create({
        orderNumber: dto.orderNumber,
        userId: dto.userId,
        shippingAddressId: dto.shippingAddressId,
        billingAddressId: dto.billingAddressId,
        status: dto.status,
        subtotalCents: dto.subtotalCents,
        taxAmountCents: dto.taxAmountCents,
        shippingCents: dto.shippingCents,
        totalCents: dto.totalCents,
        paymentStatus: dto.paymentStatus,
        paymentMethod: dto.paymentMethod,
        paymentReference: dto.paymentReference,
        shippingMethod: dto.shippingMethod,
        trackingNumber: dto.trackingNumber,
        customerNotes: dto.customerNotes,
        adminNotes: dto.adminNotes
      });
      res
        .status(201)
        .json(ApiResponseFactory.success('Order created', new ResponseOrderDto(order.toData())));
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
      const order = await this.service.update(String(idNum), req.body);
      res.json(ApiResponseFactory.success('Order updated', new ResponseOrderDto(order.toData())));
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

  public async findByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userIdNum: number = Number(String(req.params.userId).trim());
      if (!Number.isInteger(userIdNum) || userIdNum <= 0) {
        res.status(400).json(ApiResponseFactory.error('Invalid userId parameter', '400'));
        return;
      }
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;
      const orders = await this.service.findByUserId(String(userIdNum), limit, offset);
      res.json(
        ApiResponseFactory.success(
          'User orders fetched',
          orders.map(order => new ResponseOrderDto(order.toData()))
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async findByStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const status = String(req.params.status).trim();
      if (!status) {
        res.status(400).json(ApiResponseFactory.error('Status parameter is required', '400'));
        return;
      }
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;
      const orders = await this.service.findByStatus(status, limit, offset);
      res.json(
        ApiResponseFactory.success(
          'Orders by status fetched',
          orders.map(order => new ResponseOrderDto(order.toData()))
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async findByPaymentStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paymentStatus = String(req.params.paymentStatus).trim();
      if (!paymentStatus) {
        res
          .status(400)
          .json(ApiResponseFactory.error('Payment status parameter is required', '400'));
        return;
      }
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;
      const orders = await this.service.findByPaymentStatus(paymentStatus, limit, offset);
      res.json(
        ApiResponseFactory.success(
          'Orders by payment status fetched',
          orders.map(order => new ResponseOrderDto(order.toData()))
        )
      );
    } catch (error) {
      next(error);
    }
  }
}
