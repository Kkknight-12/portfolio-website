'use client';

import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowLeft, Clock, User, Calendar, Eye, Heart } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { BlogPost, ContentBlock } from '@/types';
import { ContentBlockRenderer } from '@/components/blog/content/content/ContentRenderer';
import { BlogDetailHeader } from '@/components/blog/BlogDetailHeader';
import { useAnalytics } from '@/hooks/useAnalytics';
import { analyticsService, blogService } from '@/services';
import TableOfContents from '@/components/blog/content/TableOfContents';

interface BlogDetailProps {
  params: {
    id: string;
  };
}

export default function BlogDetail({ params }: BlogDetailProps) {
  const { data: analyticsData, error: analyticsError } = useAnalytics(
    params.id
  );
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Track view when component mounts
    analyticsService.trackBlogView(params.id);
  }, [params.id]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await blogService.getBlog(params.id);

        // @ts-ignore
        setBlog(response.data);
      } catch (error) {
        console.error('Failed to fetch blog:', error);
        toast({
          title: 'Error loading blog',
          description: 'Please try again later',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id, toast]);

  if (loading) {
    return <BlogDetailSkeleton />;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Back Button */}
      <Link href='/blog'>
        <Button variant='ghost' className='mb-8 group'>
          <ArrowLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
          Back to Blogs
        </Button>
      </Link>

      {/* Main Content */}
      <div className='flex gap-8 mx-auto px-4 py-8'>
        <BlogDetailHeader
          title={blog.title}
          author={blog.author}
          views={analyticsData?.totalViews!}
          categories={blog.categories}
        />

        <div className='flex-1'>
          <Card className='w-full max-w-4xl mx-auto bg-white backdrop-blur-sm dark:bg-fuchsia-200/10 p-8 border-0'>
            <ContentBlocks blocks={blog.content} />
          </Card>
        </div>

        {/* Table of Contents */}
        <aside className='hidden lg:block'>
          <TableOfContents content={blog.content} />
        </aside>
      </div>
    </div>
  );
}

/**
 * Content Blocks Component
 * Renders multiple content blocks with proper type handling
 */
const ContentBlocks: React.FC<{ blocks: ContentBlock[] }> = ({ blocks }) => (
  <div className='space-y-6'>
    {blocks.map((block, idx) => (
      <ContentBlockRenderer key={`${block.type}-${idx}`} block={block} />
    ))}
  </div>
);

// Loading skeleton component
const BlogDetailSkeleton = () => {
  return (
    <div className='container mx-auto px-4 py-8 animate-pulse'>
      <div className='max-w-4xl mx-auto'>
        <div className='h-8 bg-gray-200 rounded w-1/4 mb-4' />
        <div className='h-12 bg-gray-200 rounded w-3/4 mb-6' />
        <div className='space-y-4'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='h-4 bg-gray-200 rounded w-full' />
          ))}
        </div>
      </div>
    </div>
  );
};
