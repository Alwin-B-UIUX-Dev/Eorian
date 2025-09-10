import type { CreateProductImageDto } from '@/dtos';
import type { IProductImage, IProductImageRepository, IProductImageService } from '@/interfaces';
import type { CreateProductImageData, WithoutSystemFieldsType } from '@/types';

export class ProductImageService implements IProductImageService {
  constructor(private readonly ProductImageRepository: IProductImageRepository) {}

  public async create(CreateProductImageDto: CreateProductImageDto): Promise<IProductImage> {
    try {
      const productImageData: CreateProductImageData = {
        productId: CreateProductImageDto.getProductId(),
        imageUrl: CreateProductImageDto.getImageUrl(),
        altText: CreateProductImageDto.getAltText(),
        isPrimary: CreateProductImageDto.getIsPrimary(),
        sortOrder: CreateProductImageDto.getSortOrder(),
        uploadedBy: CreateProductImageDto.getUploadedBy()
      };
      return await this.ProductImageRepository.create(productImageData);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS ProductImage create():', error);
    }
    throw new Error('bug');
  }

  public async findAll(limit?: number, offset?: number): Promise<IProductImage[]> {
    throw new Error('Method not implemented.');
  }
  public async findOne(id: string): Promise<IProductImage> {
    throw new Error('Method not implemented.');
  }
  public async update(
    id: string,
    data: Partial<WithoutSystemFieldsType<IProductImage>>
  ): Promise<IProductImage> {
    throw new Error('Method not implemented.');
  }
  public async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
