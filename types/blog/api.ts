import { BlogPost } from '.';
import { ApiResponse, BaseFilters, PaginationInfo } from '../common/api';
import { BlogStatus } from './content';

export interface BlogFilters extends BaseFilters {
  categories: string[];
  status: BlogStatus | 'published';
}



export interface BlogPostListResponse {
  response: {
    success: boolean;
    pagination: PaginationInfo;
    data: BlogPost[];
    error?: string;
  };
  queryParams: URLSearchParams;
}