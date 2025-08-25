// types/express.d.ts
export declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username?: string | undefined;
        role: string;
        tokenType: 'access' | 'refresh';
        jwtId: string;
      };
    }
  }
}
