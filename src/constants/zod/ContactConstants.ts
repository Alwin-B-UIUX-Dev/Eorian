import { z } from 'zod';

export class ContactConstants {
  // SCHEMAS DE BASE
  public static readonly NAME_SCHEMA = z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom doit contenir au maximum 50 caractères')
    .trim();

  public static readonly EMAIL_SCHEMA = z
    .string()
    .email('Le format de l\'email est invalide')
    .max(100, 'L\'email doit contenir au maximum 100 caractères')
    .trim();

  public static readonly SUBJECT_SCHEMA = z
    .enum(['Tatouage', 'Illustration', 'Joaillerie', 'Autres'], {
      message: 'Le sujet doit être l\'un des suivants : Tatouage, Illustration, Joaillerie, Autres'
    });

  public static readonly MESSAGE_SCHEMA = z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(1000, 'Le message doit contenir au maximum 1000 caractères')
    .trim();

  // SCHEMA COMPLET
  public static readonly CONTACT_FORM_SCHEMA = z.object({
    name: ContactConstants.NAME_SCHEMA,
    email: ContactConstants.EMAIL_SCHEMA,
    subject: ContactConstants.SUBJECT_SCHEMA,
    message: ContactConstants.MESSAGE_SCHEMA
  });

  // VALIDATION
  public static validateContactForm(data: unknown): ContactFormSchemaType {
    return ContactConstants.CONTACT_FORM_SCHEMA.parse(data);
  }
}

// TYPES
export type ContactFormSchemaType = z.infer<typeof ContactConstants.CONTACT_FORM_SCHEMA>;
