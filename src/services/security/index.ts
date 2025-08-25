// Export des services metier de security
import type { IBlacklistService } from '@/interfaces/security/IBlacklistService';
import { BlacklistService } from '@/services/security/BlacklistService';

/**
 * Export des instances Singleton ready-to-use
 */
const blacklistService: IBlacklistService = BlacklistService.getInstance();
export default blacklistService;
export { blacklistService };

export { TokenService } from '@/services/security/TokenService';
