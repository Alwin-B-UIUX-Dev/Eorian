export interface IEntity {
  getId(): string;
  getCreatedAt(): Date;
  getUpdatedAt(): Date;
  toObject(): Record<string, unknown>;
  toString(): string;
}
