'use client';

import { HeadingProvider } from '@/_context/HeadingContext';
import { BlogDetailHeader } from '@/components/blog/BlogDetailHeader';
import TableOfContents from '@/components/blog/content/TableOfContents';
import { ContentBlockRenderer } from '@/components/blog/content/content/ContentRenderer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';
import { analyticsService, blogService } from '@/services';
import { BlogPost, ContentBlock } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
    <HeadingProvider>
      {/* Back Button */}
      <Link href='/blog'>
        <Button variant='ghost' className='mb-8 group'>
          <ArrowLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
          Back to Blogs
        </Button>
      </Link>

      {/* Main Content */}
      <div className='flex gap-8 justify-center'>
        <div className='flex w-full flex-col gap-8 max-w-4xl'>
          <BlogDetailHeader
            title={blog.title}
            author={blog.author}
            views={analyticsData?.totalViews || 0}
            categories={blog.categories}
          />
          <Card className='w-full dark:bg-slate-800/60 p-8 border-0'>
            <ContentBlocks blocks={blog.content} />
          </Card>
        </div>

        {/* Table of Contents */}
        <div className='hidden lg:block w-[280px] relative'>
          <div className='sticky top-[163px]'>
            {' '}
            {/* Adjust top value based on your navbar height */}
            <aside className='overflow-y-auto max-h-[calc(100vh-120px)]'>
              {' '}
              {/* Adjust max-height based on spacing needs */}
              <TableOfContents content={blog.content} />
            </aside>
          </div>
        </div>
      </div>
    </HeadingProvider>
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
