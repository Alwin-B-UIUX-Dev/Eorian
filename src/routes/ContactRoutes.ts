import { Router } from 'express';
import { ContactController } from '@/controllers/contact/ContactController';

export class ContactRoutes {
  private readonly router: Router;
  private readonly contactController: ContactController;

  constructor() {
    this.router = Router();
    this.contactController = new ContactController();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Route publique pour l'envoi de messages de contact
    this.router.post('/contact', this.contactController.sendContactMessage.bind(this.contactController));
  }

  public getRouter(): Router {
    return this.router;
  }
}
