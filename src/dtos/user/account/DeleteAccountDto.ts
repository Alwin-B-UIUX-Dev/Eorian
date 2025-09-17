// src/dtos/user/account/DeleteAccountDto.ts

import { z } from 'zod';

export class DeleteAccountDto {
  public readonly password: string;
  public readonly confirmation: string;

  constructor(data: unknown) {
    const schema = z.object({
      password: z.string().min(1, 'Le mot de passe est requis pour supprimer le compte'),
      confirmation: z.literal('DELETE', {
        message: 'Vous devez écrire "DELETE" pour confirmer la suppression'
      })
    });

    const validatedData = schema.parse(data);
    this.password = validatedData.password;
    this.confirmation = validatedData.confirmation;
  }

  public getPassword(): string {
    return this.password;
  }

  public getConfirmation(): string {
    return this.confirmation;
  }
}
