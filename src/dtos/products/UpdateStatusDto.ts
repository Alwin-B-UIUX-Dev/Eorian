// src/dtos/products/UpdateStatusDto.ts
import { ProductConstants, type UpdateStatusSchemaType } from '@/constants';

export class UpdateStatusDto {
  public readonly isActive: boolean;

  constructor(data: UpdateStatusSchemaType) {
    this.isActive = data.isActive;
  }

  public static fromRequest(data: unknown): UpdateStatusDto {
    const validatedData = ProductConstants.validateUpdateStatus(data);
    return new UpdateStatusDto(validatedData);
  }

  public toObject(): Record<string, unknown> {
    return {
      isActive: this.isActive
    };
  }
}
