import type { IBaseService, IUserSession } from '@/interfaces';
import type { IUserSessionData } from '@/types';

export interface IUserSessionService extends IBaseService<IUserSession, IUserSessionData> {}
