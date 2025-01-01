'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { blogService } from '@/services';
import { BlogPost, BlogFilters, PaginationInfo } from '@/types';
import { BlogCard } from '@/components/blog/BlogCard';
import { blogsData } from '@/mock';
import { Button } from '@/components/ui/button';

const INITIAL_FILTERS = {
  search: '',
  categories: [],
  status: 'all',
  page: 1,
  limit: 9,
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(blogsData.data);
   const [pagination, setPagination] = useState<PaginationInfo>({
     total: 0,
     page: 1,
     totalPages: 1,
     hasMore: false,
   });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { response } = await blogService.getBlogs(INITIAL_FILTERS);


        setBlogs(response.data);
        setPagination(response.pagination);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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

          <div className='flex justify-center gap-4 mt-8'>
            <Button
              variant='outline'
              disabled={pagination.page <= 1}
              onClick={() => fetchBlogs(pagination.page - 1)}
            >
              Previous
            </Button>
            <span className='flex items-center text-gray-400'>
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant='outline'
              disabled={!pagination.hasMore}
              onClick={() => fetchBlogs(pagination.page + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
