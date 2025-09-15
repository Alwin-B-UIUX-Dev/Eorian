// src/dtos/products/UpdateStockDto.ts
import { ProductConstants, type UpdateStockSchemaType } from '@/constants';

export class UpdateStockDto {
  public readonly stockQuantity: number;

  constructor(data: UpdateStockSchemaType) {
    this.stockQuantity = data.stockQuantity;
  }

  public static fromRequest(data: unknown): UpdateStockDto {
    const validatedData = ProductConstants.validateUpdateStock(data);
    return new UpdateStockDto(validatedData);
  }

  public toObject(): Record<string, unknown> {
    return {
      stockQuantity: this.stockQuantity
    };
  }
}
