// Export des classes de configurations metier

import { DatabaseConnectionSingleton } from '@/configs/DatabaseConnectionSingleton.js';
import { LoggerSingleton } from '@/configs/LoggerSingleton.js';
import type { IDatabaseConnectionSingleton } from '@/interfaces/database/IDatabaseConnectionSingleton.js';

/**
 * Export des instances Singleton ready-to-use
 */
const database: IDatabaseConnectionSingleton = DatabaseConnectionSingleton.getInstance();
const logger = LoggerSingleton.getInstance();

// Export par défaut et nommé
export default { database, logger };
export { database, logger };
export { RouteFactory } from '@/configs/RouteFactory';
export { ServiceFactory } from '@/configs/ServiceFactory';
