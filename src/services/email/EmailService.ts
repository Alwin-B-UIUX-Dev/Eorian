import nodemailer from 'nodemailer';
import { logger } from '@/configs';
import type { ContactFormSchemaType } from '@/constants/zod/ContactConstants';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true pour 465, false pour autres ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  public async sendContactEmail(contactData: ContactFormSchemaType): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"${contactData.name}" <${contactData.email}>`,
        to: process.env.CONTACT_EMAIL || 'contact@eorian.com',
        subject: `[${contactData.subject}] Nouveau message de ${contactData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #gold;">Nouveau message de contact</h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-top: 0;">Informations du contact</h3>
              <p><strong>Nom :</strong> ${contactData.name}</p>
              <p><strong>Email :</strong> ${contactData.email}</p>
              <p><strong>Sujet :</strong> ${contactData.subject}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #gold;">
              <h3 style="color: #555; margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${contactData.message}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #f0f0f0; border-radius: 5px; font-size: 12px; color: #666;">
              <p>Ce message a été envoyé depuis le formulaire de contact du site Eorian.</p>
              <p>Date d'envoi : ${new Date().toLocaleString('fr-FR')}</p>
            </div>
          </div>
        `,
        text: `
Nouveau message de contact

Nom: ${contactData.name}
Email: ${contactData.email}
Sujet: ${contactData.subject}

Message:
${contactData.message}

---
Envoyé depuis le formulaire de contact Eorian
Date: ${new Date().toLocaleString('fr-FR')}
        `
      };

      await this.transporter.sendMail(mailOptions);
      logger.info('Email de contact envoyé avec succès', { 
        from: contactData.email, 
        subject: contactData.subject 
      });
      
      return true;
    } catch (error) {
      logger.error('Erreur lors de l\'envoi de l\'email de contact', { 
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        contactData: { email: contactData.email, subject: contactData.subject }
      });
      return false;
    }
  }

  public async sendConfirmationEmail(contactData: ContactFormSchemaType): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"Eorian" <${process.env.SMTP_USER}>`,
        to: contactData.email,
        subject: 'Merci pour votre message - Eorian',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Merci pour votre message !</h2>
            
            <p>Bonjour ${contactData.name},</p>
            
            <p>Nous avons bien reçu votre message concernant <strong>${contactData.subject}</strong> et nous vous répondrons dans les plus brefs délais.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Récapitulatif de votre message :</strong></p>
              <p style="white-space: pre-wrap; font-style: italic;">${contactData.message}</p>
            </div>
            
            <p>En attendant notre réponse, n'hésitez pas à nous suivre sur nos réseaux sociaux :</p>
            <ul>
              <li>Instagram : @eorian_illustration</li>
              <li>Facebook : Eorian</li>
            </ul>
            
            <p>À très bientôt !<br>
            L'équipe Eorian</p>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #f0f0f0; border-radius: 5px; font-size: 12px; color: #666;">
              <p>2 Rue Pierre Loti, 29200 Brest<br>
              Téléphone : 00 00 00 00 00</p>
            </div>
          </div>
        `
      };

      await this.transporter.sendMail(mailOptions);
      logger.info('Email de confirmation envoyé', { to: contactData.email });
      
      return true;
    } catch (error) {
      logger.error('Erreur lors de l\'envoi de l\'email de confirmation', { 
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        to: contactData.email
      });
      return false;
    }
  }
}
