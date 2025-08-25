// src/constants/enums/RoleEnum.ts
/**
 * Enum des rôles utilisateur - IDs en STRING
 */
export enum RoleEnum {
  CUSTOMER = '1',
  ADMIN = '2'
}

/**
 * Helper pour conversion ID → nom de rôle
 */
export const RoleIdToName: Record<string, string> = {
  '1': 'customer',
  '2': 'admin'
};

/**
 * Helper pour conversion nom → ID
 */
export const RoleNameToId: Record<string, string> = {
  customer: '1',
  admin: '2'
};

/**
 * Helper pour labels pour le frontend
 */
export const RoleDisplayLabels: Record<string, string> = {
  '1': 'Client',
  '2': 'Administrateur'
};
