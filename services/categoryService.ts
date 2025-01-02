// services/categoryService.ts
import { api } from '@/lib/api';
import {
    CategoryFilters,
    CateoryListResponse
} from '@/types';


export const categoryService = {
  /**
   * Get all categories with optional filters
   * @param filters - Optional filters for categories
   */
  getCategories: async (
    filters?: CategoryFilters
  ): Promise<CateoryListResponse> => {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.search) params.append('search', filters.search);
      if (filters.includeInactive) params.append('includeInactive', 'true');
      if (filters.parentOnly) params.append('parentOnly', 'true');
      if (filters.includePostCount) params.append('includePostCount', 'true');
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
    }

    const response = await api.get(`/categories?${params.toString()}`);

    return response.data;
  },
};
