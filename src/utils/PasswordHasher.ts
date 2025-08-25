import argon2, { type Options } from 'argon2';
import { PasswordError } from '@/exceptions/security/PasswordError';
import type { IPasswordHasher } from '@/interfaces/security/IPasswordHasher';

export class PasswordHasher implements IPasswordHasher {
  private readonly argonConfig: Options = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16, // 64mo
    timeCost: 3,
    parallelism: 1
  };

  /**
   * Validates that the provided string value is not empty, null, or only whitespaces.
   *
   * @param value The string value to be validated.
   * @param fieldName The name of the field being validated, used for error reporting.
   * @throws {PasswordError} If the value is invalid.
   */
  private validateString(value: string, fieldName: string): void {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw PasswordError.verification(fieldName).log(); // <- Method chaining
    }
  }

  /**
   * Hashes the specified password with the configured Argon2id configuration.
   *
   * @param password The password to be hashed.
   * @returns A Promise that resolves to the hashed password as a string.
   * @throws {PasswordError} If the password is invalid, or if the hashing fails.
   */
  public async hash(password: string): Promise<string> {
    try {
      this.validateString(password, 'Password');

      const passwordHash: string = await argon2.hash(password, this.argonConfig);
      return passwordHash;
    } catch (error) {
      if (error instanceof PasswordError) {
        throw error;
      }
      throw PasswordError.hashing(error instanceof Error ? error.message : undefined).log();
    }
  }

  public async verify(passwordHash: string, password: string): Promise<boolean> {
    try {
      this.validateString(password, 'Password');
      this.validateString(passwordHash, 'passwordHash');

      const isValidPassword: boolean = await argon2.verify(passwordHash, password);
      return isValidPassword;
    } catch (error) {
      if (error instanceof PasswordError) {
        throw error;
      }
      throw PasswordError.verification(error instanceof Error ? error.message : undefined).log();
    }
  }

  /**
   * Génère un mot de passe temporaire sécurisé
   * @returns Mot de passe temporaire de 12 caractères
   */
  public static generateTempPassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let tempPassword: string = '';
    for (let i: number = 0; i < 12; i++) {
      tempPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return tempPassword;
  }
}
