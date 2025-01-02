// components/blog/BlogCard.tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types';

interface BlogCardProps {
  blog: BlogPost;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='relative h-full'
    >
      <Link href={`/blog/${blog._id}`} className='block h-full'>
        <div className='group relative h-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/20 p-6 rounded-xl transition-all'>
          {/* Gradient Blur Effect */}
          <div className='absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity' />

          <div className='relative space-y-4'>
            {/* Categories */}
            <div className='flex flex-wrap gap-2'>
              {blog.categories.map((category) => (
                <Badge
                  key={category._id}
                  variant='secondary'
                  className='bg-white/10'
                >
                  {category.name}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h2 className='text-xl font-bold line-clamp-2 text-white group-hover:text-purple-300'>
              {blog.title}
            </h2>

            {/* Description */}
            {/* <p className='text-gray-300 line-clamp-2 text-sm'>
              {blog.description}
            </p> */}

            {/* Metadata */}
            <div className='flex items-center justify-between pt-4 text-sm text-gray-400'>
              <div className='flex items-center gap-4'>
                <span>👁️ {blog.metadata.views}</span>
                <span>❤️ {blog.metadata.likes}</span>
              </div>
              <time className='text-xs'>
                {formatDistanceToNow(new Date(blog.createdAt), {
                  addSuffix: true,
                })}
              </time>
            </div>

            {/* Read More Arrow */}
            <div className='absolute bottom-6 right-6 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all'>
              <ArrowRight className='w-5 h-5 text-purple-400' />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
