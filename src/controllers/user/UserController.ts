// src/controllers/user/UserController.ts

import type { NextFunction, Request, Response } from 'express';
import { logger } from '@/configs';
import { RoleDisplayLabels } from '@/constants/enums/RoleEnum';
import type { IUserController, IUserService } from '@/interfaces';
import { ApiResponseFactory, MaskerHelper } from '@/utils';

export class UserController implements IUserController {
  constructor(private readonly userService: IUserService) {
    logger.info('UserController initialized', {
      hasUserService: !!this.userService
    });
  }

  /**
   * Lister tous les utilisateurs (Administration)
   * Endpoint: GET /api/v1/users
   */
  public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestId = (req.headers['x-request-id'] as string) || 'unknown';
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const offset = req.query.offset ? Number(req.query.offset) : undefined;

      logger.info('Admin requesting users list', {
        requestId,
        limit,
        offset,
        operation: 'admin_list_users'
      });

      const users = await this.userService.findAll(limit, offset);

      const responseData = users.map(user => {
        // Retourner directement un objet sans validation Zod
        return {
          id: user.getId().toString(),
          email: MaskerHelper.maskEmail(user.getEmail()),
          username: user.getUsername(),
          role: RoleDisplayLabels[user.getRoleId()]
        };
      });

      res.json(ApiResponseFactory.success('Users fetched successfully', responseData));

      logger.info('Users list retrieved successfully', {
        requestId,
        userCount: users.length,
        operation: 'admin_list_users'
      });
    } catch (error) {
      logger.error('Failed to fetch users list', {
        error: error instanceof Error ? error.message : 'unknown',
        operation: 'admin_list_users'
      });
      next(error);
    }
  }

  /**
   * Afficher un utilisateur spécifique (Administration)
   * Endpoint: GET /api/v1/users/:id
   */
  public async show(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestId = (req.headers['x-request-id'] as string) || 'unknown';
      const userId = req.params.id;

      logger.info('Admin requesting user details', {
        requestId,
        userId,
        operation: 'admin_show_user'
      });

      const user = await this.userService.findOne(userId);

      if (!user) {
        res.status(404).json(ApiResponseFactory.error('User not found', 'USER_NOT_FOUND'));
        return;
      }

      // Retourner directement un objet sans validation Zod
      const responseData = {
        id: user.getId().toString(),
        email: MaskerHelper.maskEmail(user.getEmail()),
        username: user.getUsername(),
        role: RoleDisplayLabels[user.getRoleId()]
      };

      res.json(ApiResponseFactory.success('User fetched successfully', responseData));

      logger.info('User details retrieved successfully', {
        requestId,
        userId,
        operation: 'admin_show_user'
      });
    } catch (error) {
      logger.error('Failed to fetch user details', {
        error: error instanceof Error ? error.message : 'unknown',
        operation: 'admin_show_user'
      });
      next(error);
    }
  }

  /**
   * Supprimer un utilisateur (Administration)
   * Endpoint: DELETE /api/v1/users/:id
   */
  public async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestId = (req.headers['x-request-id'] as string) || 'unknown';
      const userId = req.params.id;

      logger.info('Admin requesting user deletion', {
        requestId,
        userId,
        operation: 'admin_delete_user'
      });

      // Vérifier que l'utilisateur existe avant suppression
      const existingUser = await this.userService.findOne(userId);
      if (!existingUser) {
        res.status(404).json(ApiResponseFactory.error('User not found', 'USER_NOT_FOUND'));
        return;
      }

      // Supprimer l'utilisateur
      await this.userService.remove(userId);

      res.status(200).json(
        ApiResponseFactory.success('User deleted successfully', {
          deletedUserId: userId,
          deletedAt: new Date().toISOString()
        })
      );

      logger.info('User deleted successfully', {
        requestId,
        userId,
        operation: 'admin_delete_user'
      });
    } catch (error) {
      logger.error('Failed to delete user', {
        error: error instanceof Error ? error.message : 'unknown',
        userId: req.params.id,
        operation: 'admin_delete_user'
      });
      next(error);
    }
  }

  // Note: Les autres méthodes CRUD (store, update) sont commentées
  // dans l'interface IUserController car :
  // - store: L'auth s'occupe de la création via /auth/register
  // - update: À implémenter si nécessaire pour l'administration
}
