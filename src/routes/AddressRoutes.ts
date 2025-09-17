// src/routes/AddressRoutes.ts

import { Router } from 'express';
import type { IAddressController } from '@/interfaces';

export class AddressRoutes {
  private readonly router: Router;

  constructor(private readonly controller: IAddressController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Public routes for simple CRUD testing via Postman
    this.router.get('/addresses', this.controller.index.bind(this.controller));
    this.router.get('/addresses/:id', this.controller.show.bind(this.controller));

    this.router.post('/addresses', this.controller.store.bind(this.controller));
    this.router.put('/addresses/:id', this.controller.update.bind(this.controller));
    this.router.delete('/addresses/:id', this.controller.destroy.bind(this.controller));

    // User-specific routes
    this.router.get('/users/:userId/addresses', this.controller.findByUserId.bind(this.controller));
    this.router.get(
      '/users/:userId/addresses/type/:type',
      this.controller.findByUserIdAndType.bind(this.controller)
    );
    this.router.get(
      '/users/:userId/addresses/default/:type',
      this.controller.findDefaultByUserIdAndType.bind(this.controller)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
