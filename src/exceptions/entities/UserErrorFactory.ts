import { ApiError } from '@/exceptions/ApiError';
import type { IAdditionalInfoData } from '@/types/security';

/**
 * Factory d'erreurs spécialisée pour les opérations utilisateur
 * SOLID: Single Responsibility (erreurs user uniquement)
 * SOLID: Open/Closed (étend ApiError sans modification)
 * KISS: Réutilise ApiError existant
 */
export class UserErrorFactory extends ApiError {
  constructor(message: string, statusCode: number = 400, additionalInfo: IAdditionalInfoData = {}) {
    super(message, statusCode, {
      ...additionalInfo,
      category: 'user_operation',
      service: 'UserService'
    });
  }
  /**
   * Erreur identifiant ou mot de passe incorrect
   *
   * @returns
   */
  public static invalidCredentials(identifier?: string): UserErrorFactory {
    const message: string = 'Invalid credentials';
    const error = new UserErrorFactory(message, 401, {
      operation: 'user_login',
      identifier: identifier ?? 'unknown'
    });
    return error;
  }

  /**
   * Erreur compte utilisateur désactivé
   *
   * @param userId - Identifiant de l'utilisateur
   * @returns - Une instance de UserErrorFactory
   *
   */
  public static accountDeactivated(userId?: string): UserErrorFactory {
    const message: string = 'Account deactivated';
    const error = new UserErrorFactory(message, 403, {
      operation: 'user_lookup',
      userId: userId ?? 'unknown'
    });
    return error;
  }

  /**
   * Erreur email non confirmé par l'utilisateur
   *
   * @param userId - Identifiant de l'utilisateur
   * @returns - Une instance de UserErrorFactory
   *
   */
  public static emailNotVerified(userId?: string): UserErrorFactory {
    const message: string = 'Email not verified';
    const error = new UserErrorFactory(message, 403, {
      operation: 'user_lookup',
      userId: userId ?? 'unknown'
    });
    return error;
  }

  /**
   * Erreur utilisateur non trouvé
   */
  public static notFound(userId?: string): UserErrorFactory {
    const message: string = 'User not found';
    const error = new UserErrorFactory(message, 404, {
      operation: 'user_lookup',
      userId: userId ?? 'unknown'
    });
    return error;
  }

  /**
   * Erreur email déjà existant
   */
  public static emailExists(email: string): UserErrorFactory {
    const message: string = 'Email already exists';
    const error = new UserErrorFactory(message, 409, {
      operation: 'user_creation',
      conflictField: 'email',
      email
    });
    return error;
  }

  /**
   * Erreur username deja existant
   */
  public static usernameExists(username: string): UserErrorFactory {
    const message: string = 'Username already exists';
    const error = new UserErrorFactory(message, 409, {
      operation: 'user_creation',
      conflictField: 'username',
      username
    });
    return error;
  }

  /**
   * Erreur validation données utilisateur
   */
  public static validation(fieldName: string, details?: string): UserErrorFactory {
    const message: string = `${fieldName} cannot be empty, null or only whitespaces`;
    const error = new UserErrorFactory(message, 400, {
      fieldName,
      validationType: 'user_validation',
      details: details ?? 'Invalid input format'
    });
    return error;
  }

  /**
   * Erreur création utilisateur
   */
  public static creation(originalError?: string): UserErrorFactory {
    const message: string = 'User creation failed';
    const error = new UserErrorFactory(message, 500, {
      operation: 'user_creation',
      originalError: originalError ?? 'Unknown creation error'
    });
    return error;
  }

  /**
   * Erreur relation Role non chargée
   */
  public static roleNotLoaded(userId?: string | number): UserErrorFactory {
    const message: string = 'Role not loaded';
    const error = new UserErrorFactory(message, 500, {
      operation: 'user_role_access',
      userId: userId?.toString() ?? 'unknown',
      solution: 'Use findByIdWithRole() or findByEmailWithRole() methods'
    });
    return error;
  }

  /**
   * Erreur authentification utilisateur
   */
  public static authenticationFailed(originalError?: string): UserErrorFactory {
    const message: string = 'User authentication failed';
    const error = new UserErrorFactory(message, 500, {
      operation: 'user_authentication',
      originalError: originalError ?? 'Unknown authentication error'
    });
    return error;
  }

  /**
   * Erreur relation générale non chargée
   */
  public static relationNotLoaded(relation: string, userId?: string | number): UserErrorFactory {
    const message: string = `${relation} not loaded`;
    const error = new UserErrorFactory(message, 500, {
      operation: 'user_relation_access',
      relation,
      userId: userId?.toString() ?? 'unknown',
      solution: `Use findByIdWith${relation}() method`
    });
    return error;
  }

  /**
   * Erreur logout utilisateur
   *
   * @param originalError - Message d'erreur original
   * @returns - Une instance de UserErrorFactory
   */
  public static logoutFailed(originalError?: string): UserErrorFactory {
    const message: string = 'User logout failed';
    const error = new UserErrorFactory(message, 500, {
      operation: 'user_logout',
      originalError: originalError ?? 'Unknown logout error'
    });
    return error;
  }

  /**
   * Erreur password utilisateur
   *
   * @param originalError - Message d'erreur original
   * @returns - Une instance de UserErrorFactory
   */
  public static passwordFailed(originalError?: string): UserErrorFactory {
    const message: string = 'User password failed';
    const error = new UserErrorFactory(message, 500, {
      operation: 'user_password',
      originalError: originalError ?? 'Unknown password error'
    });
    return error;
  }

  /**
   * Erreur password utilisateur
   *
   * @param originalError - Message d'erreur original
   * @returns - Une instance de UserErrorFactory
   */
  public static updateFailed(originalError?: string): UserErrorFactory {
    const message: string = 'User update failed';
    const error = new UserErrorFactory(message, 500, {
      operation: 'user_update',
      originalError: originalError ?? 'Unknown update error'
    });
    return error;
  }

  /**
   * Erreur password utilisateur
   *
   * @param originalError - Message d'erreur original
   * @returns - Une instance de UserErrorFactory
   */
  public static deleteFailed(originalError?: string): UserErrorFactory {
    const message: string = 'User delete failed';
    const error = new UserErrorFactory(message, 500, {
      operation: 'user_delete',
      originalError: originalError ?? 'Unknown delete error'
    });
    return error;
  }

  /**
   * Erreur fetch utilisateur
   *
   * @param originalError - Message d'erreur original
   * @returns - Une instance de UserErrorFactory
   */
  public static fetchFailed(originalError?: string): UserErrorFactory {
    const message: string = 'User fetch failed';
    const error = new UserErrorFactory(message, 500, {
      operation: 'user_fetch',
      originalError: originalError ?? 'Unknown fetch error'
    });
    return error;
  }

  // ===================================
  // ERREURS PROFIL UTILISATEUR
  // ===================================

  /**
   * Erreur profil utilisateur non trouvé
   */
  public static profileNotFound(profileId?: string): UserErrorFactory {
    const message: string = 'User profile not found';
    const error = new UserErrorFactory(message, 404, {
      operation: 'user_profile_lookup',
      profileId: profileId ?? 'unknown'
    });
    return error;
  }

  /**
   * Erreur profil utilisateur déjà existant
   */
  public static profileExists(userId: string): UserErrorFactory {
    const message: string = 'User profile already exists';
    const error = new UserErrorFactory(message, 409, {
      operation: 'user_profile_creation',
      conflictField: 'userId',
      userId
    });
    return error;
  }

  /**
   * Erreur création profil utilisateur
   */
  public static profileCreation(originalError?: string): UserErrorFactory {
    const message: string = 'User profile creation failed';
    const error = new UserErrorFactory(message, 500, {
      operation: 'user_profile_creation',
      originalError: originalError ?? 'Unknown profile creation error'
    });
    return error;
  }

  /**
   * Erreur mise à jour profil utilisateur
   */
  public static profileUpdateFailed(originalError?: string): UserErrorFactory {
    const message: string = 'User profile update failed';
    const error = new UserErrorFactory(message, 500, {
      operation: 'user_profile_update',
      originalError: originalError ?? 'Unknown profile update error'
    });
    return error;
  }

  /**
   * Erreur suppression profil utilisateur
   */
  public static profileDeleteFailed(originalError?: string): UserErrorFactory {
    const message: string = 'User profile delete failed';
    const error = new UserErrorFactory(message, 500, {
      operation: 'user_profile_delete',
      originalError: originalError ?? 'Unknown profile delete error'
    });
    return error;
  }

  /**
   * Erreur récupération profil utilisateur
   */
  public static profileFetchFailed(originalError?: string): UserErrorFactory {
    const message: string = 'User profile fetch failed';
    const error = new UserErrorFactory(message, 500, {
      operation: 'user_profile_fetch',
      originalError: originalError ?? 'Unknown profile fetch error'
    });
    return error;
  }
}
