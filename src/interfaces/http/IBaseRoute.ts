import type { Router } from 'express';

export interface IBaseRoute {
  getRouter(): Router;
  getPublicRoutes(): string[];

  getProtectedRoutes(): string[];

  isPublicRoute(path: string): boolean;

  isProtectedRoute(path: string): boolean;
}
