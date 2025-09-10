import { type CreateUserSchemaType, UserConstants } from '@/constants';
import type { IUser } from '@/interfaces';

export class CreateUserDto {
  public readonly email: string;
  public readonly username: string;

  constructor(data: unknown) {
    const validated: CreateUserSchemaType = UserConstants.validateCreateUser(data);

    this.email = validated.email;
    this.username = validated.username;
  }

  public static fromUser(user: IUser): CreateUserDto {
    return new CreateUserDto({
      email: user.getEmail(),
      username: user.getUsername()
    });
  }
}
