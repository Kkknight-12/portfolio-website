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

    // Extract data from API response structure: {success, data, pagination}
    const apiData = response.data.data || [];
    const apiPagination = response.data.pagination || {
      total: 0,
      page: 1,
      totalPages: 1,
      hasMore: false,
    };

    const transformedBlogs = apiData.map((blog: any) => {
      // Transform categories
      const categories = (blog.categories || []).map((cat: any, index: number) => ({
        _id: cat._id,
        id: cat._id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        isActive: true,
        order: index + 1,
      }));

      // Find primary category object
      const primaryCategoryObj = categories.find(
        (cat: any) => cat._id === blog.primaryCategory
      ) || categories[0] || {
        _id: 'default',
        id: 'default',
        name: 'General',
        slug: 'general',
        isActive: true,
        order: 1,
      };

      // Transform author to string
      const authorName = blog.author
        ? `${blog.author.firstName} ${blog.author.lastName}`
        : 'Anonymous';

      return {
        _id: blog.id,
        id: blog.id,
        title: blog.title,
        author: authorName,
        date: blog.createdAt,
        content: [], // Will be loaded when viewing detail
        categories,
        primaryCategory: primaryCategoryObj,
        status: blog.status || 'published',
        tags: blog.tags || [],
        metadata: blog.metadata || { views: 0, likes: 0 },
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      };
    });

    const result = {
      response: {
        success: true,
        data: transformedBlogs,
        pagination: apiPagination,
      },
      queryParams: params,
    };

    // Cache for 2 minutes for list views
    blogCache.set(cacheKey, result, 2 * 60 * 1000);

    return result;
  },
};
