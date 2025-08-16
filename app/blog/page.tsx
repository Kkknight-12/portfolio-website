'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { blogService } from '@/services';
import { BlogPost, BlogFilters, PaginationInfo } from '@/types';
import { BlogCard } from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlogPostFilters } from '@/components/blog/BlogFilter';
import { blogsData } from '@/mock';

const PAGE_SIZE_OPTIONS = [10, 20, 50];

// Transform mock data to match BlogPost type
const transformedMockBlogs: BlogPost[] = blogsData.data.map((blog: any) => {
  const categories = blog.categories.map((cat: any, index: number) => ({
    ...cat,
    id: cat._id,
    isActive: true,
    order: index + 1,
  }));
  
  return {
    ...blog,
    id: blog._id,
    date: blog.createdAt,
    content: [], // Will be added when viewing detail
    categories,
    primaryCategory: categories[0] || {
      _id: 'default',
      id: 'default',
      name: 'General',
      slug: 'general',
      isActive: true,
      order: 1,
    },
    status: blog.status || 'published',
    tags: blog.tags || [],
  };
});

export default function BlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [blogs, setBlogs] = useState<BlogPost[]>(transformedMockBlogs);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    totalPages: 1,
    hasMore: false,
  });
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<BlogFilters>({
    search: searchParams.get('search') || '',
    categories: searchParams.get('categories')?.split(',') || [],
    status: 'published',
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      
      // Check if we should use mock data or API
      if (!process.env.NEXT_PUBLIC_API_URL) {
        // Just use the mock data that's already in state
        setPagination({
          total: transformedMockBlogs.length,
          page: filters.page,
          totalPages: Math.ceil(transformedMockBlogs.length / filters.limit),
          hasMore: filters.page < Math.ceil(transformedMockBlogs.length / filters.limit),
        });
      } else {
        // Use real API
        const { response, queryParams } = await blogService.getBlogs(filters);
        setBlogs(response.data);
        setPagination(response.pagination);
        router.push(`/blog?${queryParams.toString()}`, { scroll: false });
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      // Keep showing mock data on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if we have an API URL
    if (process.env.NEXT_PUBLIC_API_URL) {
      fetchBlogs();
    } else {
      // Just set loading to false for mock data
      setLoading(false);
      setPagination({
        total: transformedMockBlogs.length,
        page: 1,
        totalPages: 1,
        hasMore: false,
      });
    }
  }, [filters]);

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // const handleLimitChange = (newLimit: string) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     limit: parseInt(newLimit),
  //     page: 1,
  //   }));
  // };

  return (
    <div className='container mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-center mb-12'
      >
        <h1 className='text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
          Blog Posts
        </h1>
        <p className='text-gray-300 mt-4'>
          Showing {blogs.length} of {pagination.total} posts
        </p>
      </motion.div>

      {/* Filter */}
      <BlogPostFilters
        filters={filters}
        onFilterChange={(newFilters) => {
          setFilters({ ...newFilters, page: 1 });
        }}
      />

      {loading ? (
        <div className='flex justify-center'>
          <Loader2 className='h-8 w-8 animate-spin' />
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className='mt-8 flex flex-col md:flex-row gap-y-4 items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-muted-foreground'>
                Showing {blogs.length} of {pagination.total} items
              </span>

              <Select
                value={filters.limit.toString()}
                // onValueChange={handleLimitChange}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    limit: parseInt(value),
                    page: 1,
                  }))
                }
              >
                <SelectTrigger className='w-[100px]'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size} per page
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                disabled={filters.page <= 1}
                onClick={() => handlePageChange(filters.page - 1)}
              >
                Previous
              </Button>

              <span className='text-sm text-muted-foreground'>
                Page {filters.page} of {pagination.totalPages}
              </span>

              <Button
                variant='outline'
                disabled={!pagination.hasMore}
                onClick={() => handlePageChange(filters.page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
