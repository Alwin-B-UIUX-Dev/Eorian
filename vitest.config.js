import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'coverage/**',
        '**/*.d.ts',
        '**/*.config.ts',
        'src/database/migrations/**',
        'src/tests/**',
        // Exclude des fichiers sans logique
        'src/entities/**', // Pas de logique
        'src/constants/**', // Pas de logique
        'src/interfaces/**', // Pas de logique
        'src/app.ts', // Juste Express setup
        'src/server.ts' // Juste server start
      ],
      include: ['src/**/*.ts'],
      all: true,
      thresholds: {
        global: {
          branches: 60,
          functions: 60,
          lines: 60,
          statements: 60
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/configs': path.resolve(__dirname, './src/configs'),
      '@/constants': path.resolve(__dirname, './src/constants'),
      '@/controllers': path.resolve(__dirname, './src/controllers'),
      '@/dtos': path.resolve(__dirname, './src/dtos'),
      '@/entities': path.resolve(__dirname, './src/entities'),
      '@/exceptions': path.resolve(__dirname, './src/exceptions'),
      '@/interfaces': path.resolve(__dirname, './src/interfaces'),
      '@/middlewares': path.resolve(__dirname, './src/middlewares'),
      '@/repositories': path.resolve(__dirname, './src/repositories'),
      '@/routes': path.resolve(__dirname, './src/routes'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/utils': path.resolve(__dirname, './src/utils')
    }
  }
});
