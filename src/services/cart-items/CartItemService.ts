import { ConflictError, UserError } from '@/exceptions';
import type { ICartItem } from '@/interfaces/entities/cart-items';
import type { ICartItemRepository } from '@/interfaces/repositories/cart-items';
import type { ICartItemService } from '@/interfaces/services/cart-items';
import type { CreateCartItemData, UpdateCartItemData } from '@/types/entities/cart-items';

export class CartItemService implements ICartItemService {
  constructor(private readonly repository: ICartItemRepository) {}

  public async create(data: CreateCartItemData): Promise<ICartItem> {
    const userId: number = Number(data.userId);
    const productId: number = Number(data.productId);
    const quantity: number = Number(data.quantity);

    // Vérifier si l'item existe déjà dans le panier
    const existing = await this.repository.findByUserAndProduct(userId, productId);
    if (existing) {
      // Si l'item existe, mettre à jour la quantité
      return await this.update(existing.getId(), { quantity: existing.getQuantity() + quantity });
    }

    return await this.repository.create({
      userId,
      productId,
      quantity,
      addedAt: data.addedAt || new Date()
    });
  }

  public async findAll(limit?: number, offset?: number): Promise<ICartItem[]> {
    return await this.repository.findAll(limit, offset);
  }

  public async findOne(id: string): Promise<ICartItem | null> {
    return await this.repository.findById(id);
  }

  public async findByUserId(userId: number): Promise<ICartItem[]> {
    return await this.repository.findByUserId(userId);
  }

  public async update(id: string, data: UpdateCartItemData): Promise<ICartItem> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw UserError.notFound(id);
    }

    // Si on change le produit, vérifier qu'il n'existe pas déjà dans le panier
    if (data.productId && Number(data.productId) !== existing.getProductId()) {
      const duplicate = await this.repository.findByUserAndProduct(
        existing.getUserId(),
        Number(data.productId)
      );
      if (duplicate && duplicate.getId() !== id) {
        throw ConflictError.resourceExists('cart_item', 'product', data.productId.toString());
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

  public async removeByUserId(userId: number): Promise<void> {
    await this.repository.deleteByUserId(userId);
  }

  /**
   * Ajouter ou mettre à jour un produit dans le panier
   * Logique métier spécifique au e-commerce
   */
  public async addOrUpdateProduct(
    userId: number,
    productId: number,
    quantity: number
  ): Promise<ICartItem> {
    const existing = await this.repository.findByUserAndProduct(userId, productId);

    if (existing) {
      // Mettre à jour la quantité existante
      return await this.update(existing.getId(), { quantity });
    } else {
      // Créer un nouvel item
      return await this.create({
        userId,
        productId,
        quantity,
        addedAt: new Date()
      });
    }
  }

  /**
   * Supprimer un produit spécifique du panier d'un utilisateur
   */
  public async removeProduct(userId: number, productId: number): Promise<void> {
    const existing = await this.repository.findByUserAndProduct(userId, productId);
    if (!existing) {
      throw UserError.notFound(`Product ${productId} not found in user ${userId} cart`);
    }
    await this.repository.deleteByUserAndProduct(userId, productId);
  }
}
