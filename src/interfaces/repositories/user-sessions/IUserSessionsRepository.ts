import type { IUserSessions } from '@/interfaces/entities';
import type { IBaseRepository } from '../IBaseRepository';

export interface IUserSessionsRepository
  extends IBaseRepository<IUserSessions, IUserSessionsRepository> {}
