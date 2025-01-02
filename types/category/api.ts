// types/category/api.ts
import { Category } from '.';
import { BaseFilters, PaginationInfo } from '../common/api';

/**
 * Category listing filters
 */
export interface CategoryFilters extends BaseFilters {
  includeInactive?: boolean;
  parentOnly?: boolean;
  includePostCount?: boolean;
}

export interface CateoryListResponse {
  success: boolean;
  pagination: PaginationInfo;
  data: CateoryListData[];
  error?: string;
}

export interface CateoryListData extends Omit<Category, 'parentCategory'> {
  parentCategory?: {
    _id: string;
    name: string;
    id: string;
  };
}
