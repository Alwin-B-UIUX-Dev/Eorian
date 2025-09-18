import { z } from 'zod';

// Schéma pour la création d'une adresse
export const createAddressSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  type: z.enum(['shipping', 'billing', 'both'], {
    message: 'Type must be shipping, billing, or both'
  }),
  firstName: z.string().min(1, 'First name is required').max(100, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(100, 'Last name too long'),
  company: z.string().max(150, 'Company name too long').optional(),
  phone: z
    .string()
    .min(10, 'Phone number too short')
    .max(15, 'Phone number too long')
    .regex(/^\+?[0-9\s\-.]{10,15}$/, 'Invalid phone number format'),
  addressLine1: z.string().min(1, 'Address line 1 is required').max(200, 'Address line 1 too long'),
  addressLine2: z.string().max(200, 'Address line 2 too long').optional(),
  city: z.string().min(1, 'City is required').max(100, 'City name too long'),
  postalCode: z
    .string()
    .min(1, 'Postal code is required')
    .max(10, 'Postal code too long')
    .regex(/^[0-9]{5}$/, 'Invalid French postal code format'),
  stateRegion: z.string().max(100, 'State/Region name too long').optional(),
  country: z.string().length(2, 'Country code must be 2 characters').default('FR'),
  isDefault: z.boolean().default(false)
});

// Schéma pour la mise à jour d'une adresse
export const updateAddressSchema = createAddressSchema.partial().omit({ userId: true });

// Types TypeScript dérivés des schémas
export type CreateAddressSchemaType = z.infer<typeof createAddressSchema>;
export type UpdateAddressSchemaType = z.infer<typeof updateAddressSchema>;

// Classe de constantes pour la validation
export class AddressConstants {
  public static validateCreateAddress(data: unknown): CreateAddressSchemaType {
    return createAddressSchema.parse(data);
  }

  public static validateUpdateAddress(data: unknown): UpdateAddressSchemaType {
    return updateAddressSchema.parse(data);
  }
}
