export type WithoutSystemFieldsType<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type PartialWithoutSystemFieldsType<T> = Partial<WithoutSystemFieldsType<T>>;
