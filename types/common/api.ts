// types/common/api.ts
/**
 * Standard API response format for all endpoints
 * @template T The type of data returned in the response
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  pagination?: PaginationInfo;
}

/**
 * Pagination information returned by API endpoints
 */
export interface PaginationInfo {
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

/**
 * Common filter parameters used across listing endpoints
 */
export interface BaseFilters {
  search: string;
  page: number;
  limit: number;
}
