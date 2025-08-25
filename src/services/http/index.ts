import type { IHandlerService } from '@/interfaces/http';
import { HandlerService } from '@/services/http/HandlerService';

/**
 * Export des instances Singleton ready-to-use
 */

const handlerService: IHandlerService = HandlerService.getInstance();
export default handlerService;
export { handlerService };
