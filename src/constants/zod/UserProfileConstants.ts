// src/constants/zod/UserProfileConstants.ts

import { z } from 'zod';

export class UserProfileConstants {
  // Schémas de validation pour UserProfile

  public static readonly USER_ID_SCHEMA = z.string().min(1);
  public static readonly FIRST_NAME_SCHEMA = z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be at most 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'First name contains invalid characters');

  public static readonly LAST_NAME_SCHEMA = z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be at most 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Last name contains invalid characters');

  public static readonly PHONE_SCHEMA = z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .regex(/^[+]?[0-9\s\-()]+$/, 'Invalid phone number format');

  public static readonly BIRTH_DATE_SCHEMA = z.coerce
    .date()
    .refine(date => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        return age - 1 >= 13; // Au moins 13 ans
      }
      return age >= 13;
    }, 'You must be at least 13 years old')
    .refine(date => {
      const today = new Date();
      return date <= today;
    }, 'Birth date cannot be in the future');

  public static readonly AVATAR_URL_SCHEMA = z
    .string()
    .url('Invalid avatar URL format')
    .max(500, 'Avatar URL must be at most 500 characters')
    .optional();

  // Schémas composés
  public static readonly CREATE_USER_PROFILE_SCHEMA = z.object({
    userId: this.USER_ID_SCHEMA,
    firstName: this.FIRST_NAME_SCHEMA,
    lastName: this.LAST_NAME_SCHEMA,
    phone: this.PHONE_SCHEMA,
    birthDate: this.BIRTH_DATE_SCHEMA,
    avatarUrl: this.AVATAR_URL_SCHEMA
  });

  public static readonly UPDATE_USER_PROFILE_SCHEMA = z.object({
    firstName: this.FIRST_NAME_SCHEMA.optional(),
    lastName: this.LAST_NAME_SCHEMA.optional(),
    phone: this.PHONE_SCHEMA.optional(),
    birthDate: this.BIRTH_DATE_SCHEMA.optional(),
    avatarUrl: this.AVATAR_URL_SCHEMA
  });
}
