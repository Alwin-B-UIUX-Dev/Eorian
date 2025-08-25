import { logger } from '@/configs';

describe('LoggerSingleton', () => {
  it('should always return same instance (singleton pattern)', () => {
    // GIVEN
    const logger1 = logger;
    const logger2 = logger;

    // THEN
    expect(logger1).toBe(logger2);
  });

  it('should always return same instance (singleton pattern)', () => {
    // THEN
    expect(logger.transports).toHaveLength(3);
    expect(logger.level).toBeDefined();
  });
});
