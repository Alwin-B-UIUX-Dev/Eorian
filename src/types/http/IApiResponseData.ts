export interface IApiResponseData<T = unknown> {
  success: boolean;
  status?: string | undefined;
  message: string;
  data?: T | undefined;
  error?: {
  code: string;
  details?: string;
  field?: string;
} | undefined;
  meta: {
    timestamp: string;
    requestId?: string; // Front fait une requête -> requestId => à savoir qui a fait la req
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
