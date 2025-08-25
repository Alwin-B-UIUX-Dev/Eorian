import type { PartialWithoutSystemFieldsType, WithoutSystemFieldsType } from '@/types';

export interface IBaseService<TEntity, TData> {
  create(data: WithoutSystemFieldsType<TData>): Promise<TEntity>;
  findAll(limit?: number, offset?: number): Promise<TEntity[]>;
  findOne(id: string): Promise<TEntity | null>;
  update(id: string, data: PartialWithoutSystemFieldsType<TData>): Promise<TEntity>;
  remove(id: string): Promise<void>;
}
