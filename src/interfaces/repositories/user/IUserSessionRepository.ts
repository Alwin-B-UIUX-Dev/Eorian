import type { IUserSession } from '@/interfaces/entities';
import type { IBaseRepository } from '../IBaseRepository';

export interface IUserSessionRepository
  extends IBaseRepository<IUserSession, IUserSessionRepository> {}
