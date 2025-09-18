// src/controllers/cart-items/CartItemController.ts

import type { NextFunction, Request, Response } from 'express';
import { AddToCartDto, CreateCartItemDto, ResponseCartItemDto } from '@/dtos/cart-items';
import type { ICartItemController } from '@/interfaces/controllers/cart-items';
import type { ICartItemService } from '@/interfaces/services/cart-items';
import { ApiResponseFactory } from '@/utils';

export class CartItemController implements ICartItemController {
  constructor(private readonly service: ICartItemService) {}

  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;
      const cartItems = await this.service.findAll(limit, offset);
      res.json(
        ApiResponseFactory.success(
          'Cart items fetched',
          cartItems.map(ci => new ResponseCartItemDto(ci.toData()))
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
      const cartItem = await this.service.findOne(String(idNum));
      res.json(
        ApiResponseFactory.success(
          'Cart item fetched',
          cartItem ? new ResponseCartItemDto(cartItem.toData()) : null
        )
      );
    } catch (error) {
      next(error);
    }
  }

  public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = new CreateCartItemDto(req.body);
      const cartItem = await this.service.create({
        userId: dto.userId,
        productId: dto.productId,
        quantity: dto.quantity,
        addedAt: new Date()
      });
      res
        .status(201)
        .json(
          ApiResponseFactory.success(
            'Cart item created',
            new ResponseCartItemDto(cartItem.toData())
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
      const cartItem = await this.service.update(String(idNum), req.body);
      res.json(
        ApiResponseFactory.success('Cart item updated', new ResponseCartItemDto(cartItem.toData()))
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

  /**
   * Lister le panier d'un utilisateur
   * GET /api/v1/cart-items/user/:userId
   */
  public async findByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId: number = Number(String(req.params.userId).trim());
      if (!Number.isInteger(userId) || userId <= 0) {
        res.status(400).json(ApiResponseFactory.error('Invalid user ID parameter', '400'));
        return;
      }
      const cartItems = await this.service.findByUserId(userId);
      res.json(
        ApiResponseFactory.success(
          'User cart items fetched',
          cartItems.map(ci => new ResponseCartItemDto(ci.toData()))
        )
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Ajouter un produit au panier
   * POST /api/v1/cart-items/add
   */
  public async addToCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = new AddToCartDto(req.body);
      const userId: number = Number(String(req.params.userId || req.body.userId).trim());

      if (!Number.isInteger(userId) || userId <= 0) {
        res.status(400).json(ApiResponseFactory.error('Invalid user ID', '400'));
        return;
      }

      const cartItem = await this.service.addOrUpdateProduct(userId, dto.productId, dto.quantity);
      res
        .status(201)
        .json(
          ApiResponseFactory.success(
            'Product added to cart',
            new ResponseCartItemDto(cartItem.toData())
          )
        );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Supprimer un produit du panier
   * DELETE /api/v1/cart-items/user/:userId/product/:productId
   */
  public async removeFromCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId: number = Number(String(req.params.userId).trim());
      const productId: number = Number(String(req.params.productId).trim());

      if (!Number.isInteger(userId) || userId <= 0) {
        res.status(400).json(ApiResponseFactory.error('Invalid user ID parameter', '400'));
        return;
      }

      if (!Number.isInteger(productId) || productId <= 0) {
        res.status(400).json(ApiResponseFactory.error('Invalid product ID parameter', '400'));
        return;
      }

      await this.service.removeProduct(userId, productId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Vider le panier d'un utilisateur
   * DELETE /api/v1/cart-items/user/:userId/clear
   */
  public async clearCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId: number = Number(String(req.params.userId).trim());

      if (!Number.isInteger(userId) || userId <= 0) {
        res.status(400).json(ApiResponseFactory.error('Invalid user ID parameter', '400'));
        return;
      }

      await this.service.removeByUserId(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
