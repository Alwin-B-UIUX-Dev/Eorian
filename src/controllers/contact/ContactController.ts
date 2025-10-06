import type { Request, Response } from 'express';
import { logger } from '@/configs';
import { ContactConstants } from '@/constants';
import { EmailService } from '@/services/email/EmailService';
import { ApiResponseFactory } from '@/utils';

export class ContactController {
  private readonly emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  public async sendContactMessage(req: Request, res: Response): Promise<void> {
    try {
      // Validation des données
      const contactData = ContactConstants.validateContactForm(req.body);

      // Envoi de l'email principal
      const emailSent = await this.emailService.sendContactEmail(contactData);

      if (!emailSent) {
        res
          .status(500)
          .json(
            ApiResponseFactory.error("Erreur lors de l'envoi de l'email", 'INTERNAL_SERVER_ERROR')
          );
        return;
      }

      // Envoi de l'email de confirmation (optionnel, ne pas faire échouer la requête)
      try {
        await this.emailService.sendConfirmationEmail(contactData);
      } catch (confirmationError) {
        logger.warn("Erreur lors de l'envoi de l'email de confirmation", {
          error: confirmationError instanceof Error ? confirmationError.message : 'Erreur inconnue'
        });
      }

      logger.info('Message de contact envoyé avec succès', {
        email: contactData.email,
        subject: contactData.subject
      });

      res.status(200).json(
        ApiResponseFactory.success('Message envoyé avec succès', {
          message: 'Nous vous répondrons dans les plus brefs délais.'
        })
      );
    } catch (error) {
      logger.error('Erreur dans ContactController.sendContactMessage', {
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        body: req.body
      });

      if (error instanceof Error && error.name === 'ZodError') {
        res
          .status(400)
          .json(
            ApiResponseFactory.error(
              'Données du formulaire invalides',
              'VALIDATION_ERROR',
              error.message
            )
          );
        return;
      }

      res
        .status(500)
        .json(ApiResponseFactory.error('Erreur interne du serveur', 'INTERNAL_SERVER_ERROR'));
    }
  }
}
