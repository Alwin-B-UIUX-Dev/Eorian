// src/entities/BaseEntity.ts

import type { IEntity } from '@/interfaces';
import type { IBaseEntityData } from '@/types';

/**
 * Classe abstraite de base pour toutes les entités métier
 *
 * Fournit les fonctionnalités communes :
 * - Identifiant unique
 * - Timestamps de création/modification
 * - Mise à jour automatique des timestamps
 *
 * RGPD: Les timestamps permettent la traçabilité légale
 */
export abstract class BaseEntity implements IEntity {
  protected readonly id: string;
  protected readonly createdAt: Date;
  protected updatedAt: Date;

  // BaseEntity.ts
  protected constructor(data: IBaseEntityData, idField?: string) {
    const rawId: unknown = idField ? data[idField as keyof IBaseEntityData] : data.id;

    // Validation + cast
    if (!rawId || (typeof rawId !== 'string' && typeof rawId !== 'number')) {
      throw new Error(`Invalid ID type. Expected string/number, got: ${typeof rawId}`);
    }

    this.id = String(rawId);
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  public getId(): string {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
  protected updateTimestamp(): void {
    const now = new Date();
    if (now <= this.updatedAt) {
      // Protection contre les mises à jour trop rapides
      now.setMilliseconds(this.updatedAt.getMilliseconds() + 1);
    }
    this.updatedAt = now;
  }

  /**
   * Convertit l'entité en objet simple pour la sérialisation
   * Utilisé par les adapters (API, BDD, etc.)
   */
  public toObject(): Record<string, unknown> {
    return {
      id: this.id,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      ...this.getEntityData()
    };
  }

  /**
   * Représentation string pour le debugging/logging
   */
  public toString(): string {
    const entityName: string = this.constructor.name;
    const data: Record<string, unknown> = this.toObject();
    return `${entityName}(${JSON.stringify(data)})`;
  }

  /**
   * Méthode abstraite pour que chaque entité expose ses données spécifiques
   */
  protected abstract getEntityData(): Record<string, unknown>;
}
