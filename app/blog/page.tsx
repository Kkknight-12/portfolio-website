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

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function BlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
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
      const { response, queryParams } = await blogService.getBlogs(filters);

      setBlogs(response.data);
      setPagination(response.pagination);

      router.push(`/blog?${queryParams.toString()}`, { scroll: false });
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
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
  // console.log('filters ', filters);

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
