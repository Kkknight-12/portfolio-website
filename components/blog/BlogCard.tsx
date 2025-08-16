// components/blog/BlogCard.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, Heart, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types';
import { Button } from '../ui/button';

interface BlogCardProps {
  blog: BlogPost;
}

function BlogCardComponent({ blog }: BlogCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`/blog/${blog._id}`);
  };
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='group relative h-full'
    >
      <Link href={`/blog/${blog._id}`} onClick={handleClick}>
        {/* <div
          className='group relative h-full bg-black/40 backdrop-blur-sm border 
        border-white/10 hover:border-white/20 p-6 rounded-xl transition-all'
        > */}
        <div
          className='group relative h-full bg-black/20 backdrop-blur-sm border 
        border-white/10 hover:border-white/20 p-6 rounded-xl transition-all'
        >
          {/* Loading Overlay */}
          {isLoading && (
            <div className='absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl z-50 flex items-center justify-center'>
              <div className='flex flex-col items-center gap-3'>
                <Loader2 className='w-8 h-8 animate-spin text-purple-400' />
                <span className='text-sm text-purple-300'>Loading blog...</span>
              </div>
            </div>
          )}
          
          {/* Gradient Blur Effect */}
          <div className='absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity' />

          {/* Categories */}
          <div className='flex flex-wrap gap-2 mb-4'>
            {blog.categories.map((category) => (
              <Badge
                key={category._id}
                className='bg-white/10 text-white hover:bg-white/20 transition-colors'
              >
                {category.name}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h2 className='text-2xl font-bold mb-4 text-white/90 group-hover:text-white transition-colors'>
            {blog.title}
          </h2>

          {/* Author & Date */}
          <div className='flex items-center gap-3 mb-4'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-purple-400/20 flex items-center justify-center'>
                <span className='text-purple-200'>
                  {blog.author[0].toUpperCase()}
                </span>
              </div>
              <span className='text-gray-200'>{blog.author}</span>
            </div>
            <span className='text-gray-400'>•</span>
            <time className='text-gray-300'>
              {formatDistanceToNow(new Date(blog.createdAt), {
                addSuffix: true,
              })}
            </time>
          </div>

          {/* Metadata */}
          <div className='flex items-center gap-4 text-gray-300'>
            <span className='flex items-center gap-1'>
              <Eye className='w-4 h-4' />
              {blog.metadata.views}
            </span>
            <span className='flex items-center gap-1'>
              <Heart className='w-4 h-4' />
              {blog.metadata.likes}
            </span>
          </div>

          {/* Read More */}
          <div className='absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300'>
            <Button
              variant='ghost'
              className='text-white hover:text-purple-200 hover:bg-white/10'
            >
              Read more <ArrowRight className='w-4 h-4 ml-2' />
            </Button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export const BlogCard = React.memo(BlogCardComponent);
