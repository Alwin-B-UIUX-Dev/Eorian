// utils/DatabaseMapper.ts
export class DatabaseMapper {
  public static snakeToCamel<T extends Record<string, unknown>>(obj: Record<string, unknown>): T {
    if (!obj) return {} as T;

    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = value;
    }

    return result as T;
  }

  // Bonus pour les arrays
  public static snakeToCamelArray<T extends Record<string, unknown>>(
    array: Record<string, unknown>[]
  ): T[] {
    return array.map(item => DatabaseMapper.snakeToCamel<T>(item));
  }
}
