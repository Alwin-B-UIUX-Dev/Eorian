import type { IFlexiblePropsData } from '@/types';
export interface ITokenPayloadData extends IFlexiblePropsData {
  userId: string;
  username?: string | undefined;
  role: string;
}
