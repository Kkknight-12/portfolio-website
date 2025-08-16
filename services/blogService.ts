// services/blogService.ts
import { api } from '@/lib/api';
import { blogCache } from '@/lib/cache';
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
    // Check cache first
    const cacheKey = `blog-${id}`;
    const cached = blogCache.get<ApiResponse<BlogPost>>(cacheKey);
    if (cached) return cached;

    const response = await api.get(`/blogs/${id}`);
    
    // Cache the response for 5 minutes
    blogCache.set(cacheKey, response.data, 5 * 60 * 1000);
    
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

    // Check cache for list requests
    const cacheKey = `blogs-${params.toString()}`;
    const cached = blogCache.get<BlogPostListResponse>(cacheKey);
    if (cached) return cached;

    const response = await api.get(`/blogs?${params.toString()}`);
    const result = { response: response.data, queryParams: params };
    
    // Cache for 2 minutes for list views
    blogCache.set(cacheKey, result, 2 * 60 * 1000);
    
    return result;
  },
};
