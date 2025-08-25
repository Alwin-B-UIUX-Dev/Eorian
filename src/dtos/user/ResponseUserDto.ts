// src/dtos/user/ResponseUserDto.ts

import { RoleDisplayLabels } from '@/constants/enums/RoleEnum';
import { type ResponseUserSchemaType, UserConstants } from '@/constants/zod/UserConstants';
import type { IUser } from '@/interfaces/entities/user';

/**
 * Dto pour la réponse d'un utilisateur
 */
export class ResponseUserDto {
  public readonly id: string;
  public readonly email: string;
  public readonly username: string;
  public readonly role: string;

  constructor(data: unknown) {
    const validated: ResponseUserSchemaType = UserConstants.validateResponseUser(data);

    this.id = validated.id;
    this.email = validated.email;
    this.username = validated.username;
    this.role = validated.role;
  }

  public static fromUser(user: IUser): ResponseUserDto {
    return new ResponseUserDto({
      id: user.getId().toString(),
      email: user.getEmail(),
      username: user.getUsername(),
      role: RoleDisplayLabels[user.getRoleId()]
    });
  }
}
