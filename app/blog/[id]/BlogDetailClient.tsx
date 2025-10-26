'use client';

import { HeadingProvider } from '@/_context/HeadingContext';
import { BlogDetailHeader } from '@/components/blog/BlogDetailHeader';
import TableOfContents from '@/components/blog/content/TableOfContents';
import { ContentBlockRenderer } from '@/components/blog/content/content/ContentRenderer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BlogPost, ContentBlock } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BlogDetailClientProps {
  blog: BlogPost;
  readingTime: number;
}

/**
 * Client component for blog detail page
 * Handles interactive features while SEO is handled by parent server component
 */
export default function BlogDetailClient({
  blog,
  readingTime,
}: BlogDetailClientProps) {
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
            views={blog.metadata.views}
            categories={blog.categories}
          />
          <Card className='w-full dark:bg-slate-800/60 p-8 border-0'>
            <ContentBlocks blocks={blog.content} />
          </Card>
        </div>

        {/* Table of Contents */}
        <div className='hidden lg:block w-[280px] relative'>
          <div className='sticky top-[163px]'>
            <aside className='overflow-y-auto max-h-[calc(100vh-120px)]'>
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
