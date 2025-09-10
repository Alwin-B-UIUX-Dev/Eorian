import type { CreateProductDto } from '@/dtos';
import type { IProduct, IProductRepository, IProductService } from '@/interfaces';
import type { CreateProductData, WithoutSystemFieldsType } from '@/types';

export class ProductService implements IProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  public async create(CreateProductDto: CreateProductDto): Promise<IProduct> {
    try {
      const productsData: CreateProductData = {
        name: CreateProductDto.getName(),
        slug: CreateProductDto.getSlug(),
        sku: CreateProductDto.getSku(),
        shortDescription: CreateProductDto.getShortDescription(),
        description: CreateProductDto.getDescription(),
        priceCents: CreateProductDto.getPriceCents(),
        taxRateId: CreateProductDto.getTaxRateId(),
        stockQuantity: CreateProductDto.getStockQuantity(),
        lowStockThreshold: CreateProductDto.getLowStockThreshold(),
        manageStock: CreateProductDto.getManageStock(),
        metaTitle: CreateProductDto.getMetaTitle(),
        metaDescription: CreateProductDto.getMetaDescription(),
        isActive: CreateProductDto.getIsActive(),
        createdBy: CreateProductDto.getCreatedBy()
      };
      return await this.productRepository.create(productsData);
    } catch (error) {
      console.error('🚨 ERREUR TECHNIQUE DANS product create():', error);
    }
    throw new Error('bug');
  }

  public async findAll(limit?: number, offset?: number): Promise<IProduct[]> {
    throw new Error('Method not implemented.');
  }
  public async findOne(id: string): Promise<IProduct> {
    throw new Error('Method not implemented.');
  }
  public async update(
    id: string,
    data: Partial<WithoutSystemFieldsType<IProduct>>
  ): Promise<IProduct> {
    throw new Error('Method not implemented.');
  }
  public async remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
