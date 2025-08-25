export abstract class BaseUserDto {
  public readonly email: string;
  public readonly username: string;

  constructor(email: string, username: string) {
    this.email = email;
    this.username = username;
  }
}
