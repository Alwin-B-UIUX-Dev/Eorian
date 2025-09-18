// src/routes/UserRoleRoutes.ts

import { Router } from 'express';
import type { IUserRoleController } from '@/interfaces';

export class UserRoleRoutes {
  private readonly router: Router;

  constructor(private readonly controller: IUserRoleController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Public routes for simple CRUD testing via Postman
    this.router.get('/roles', this.controller.index.bind(this.controller));
    this.router.get('/roles/:id', this.controller.show.bind(this.controller));

    this.router.post('/roles', this.controller.store.bind(this.controller));
    this.router.put('/roles/:id', this.controller.update.bind(this.controller));
    this.router.delete('/roles/:id', this.controller.destroy.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}
