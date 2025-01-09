// services/blogService.ts
import { api } from '@/lib/api';
import {
  ApiResponse,
  BlogPost,
  BlogFilters,
  BlogPostListResponse,
} from '@/types';

export const blogService = {
  /**
   * Get a single blog post by ID
   * @param id - The blog post ID
   */
  getBlog: async (id: string): Promise<ApiResponse<BlogPost>> => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },

  /**
   * Get all blog posts with optional filters
   * @param filters - Optional filters for the blog posts
   */
  getBlogs: async (filters: BlogFilters): Promise<BlogPostListResponse> => {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.search) params.append('search', filters.search);
      if (filters.categories?.length) {
        params.append('categories', filters.categories.join(','));
      }
      params.append('status', filters.status || 'published');
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
    }

    const response = await api.get(`/blogs?${params.toString()}`);
    return { response: response.data, queryParams: params };
  },
};
