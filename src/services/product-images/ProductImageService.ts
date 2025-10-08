import { UserError } from '@/exceptions';
import type { IProductImage, IProductImageRepository, IProductImageService } from '@/interfaces';
import type { CreateProductImageData, UpdateProductImageData } from '@/types';

export class ProductImageService implements IProductImageService {
  constructor(private readonly repository: IProductImageRepository) {}

  public async create(data: CreateProductImageData): Promise<IProductImage> {
    // Vérifier si une image principale existe déjà pour ce produit
    if (data.isPrimary) {
      const existingImages = await this.repository.findByProductId(String(data.productId));
      const hasPrimary = existingImages.some(img => img.isPrimary());
      
      if (hasPrimary) {
        // Désactiver les autres images principales
        for (const image of existingImages) {
          if (image.isPrimary()) {
            await this.repository.update(image.getId(), { isPrimary: false });
          }
        }
      }
    }
    
    return await this.repository.create(data);
  }

  public async findAll(limit?: number, offset?: number): Promise<IProductImage[]> {
    return await this.repository.findAll(limit || 50, offset || 0);
  }

  public async findOne(id: string): Promise<IProductImage | null> {
    return await this.repository.findById(id);
  }

  public async findByProductId(productId: string): Promise<IProductImage[]> {
    return await this.repository.findByProductId(productId);
  }

  public async update(id: string, data: UpdateProductImageData): Promise<IProductImage> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw UserError.notFound(id);
    }

    // Si on définit cette image comme principale, désactiver les autres
    if (data.isPrimary === true) {
      const productImages = await this.repository.findByProductId(existing.getProductId().toString());
      for (const image of productImages) {
        if (image.getId() !== id && image.isPrimary()) {
          await this.repository.update(image.getId(), { isPrimary: false });
        }
      }
    }

    return await this.repository.update(id, data);
  }

  public async remove(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw UserError.notFound(id);
    }
    await this.repository.delete(id);
  }
}
