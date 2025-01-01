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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='group relative'
    >
      <div className='absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm group-hover:blur-md transition-all' />

      <Link href={`/blog/${blog._id}`}>
        <div className='relative bg-black/40 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:border-white/20 transition-all duration-300'>
          <div className='flex flex-wrap gap-2 mb-3'>
            {blog.categories.map((category) => (
              <Badge
                key={category._id}
                variant='secondary'
                className='bg-white/5 text-gray-200'
              >
                {category.name}
              </Badge>
            ))}
          </div>

          <h2 className='text-xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors'>
            {blog.title}
          </h2>

          <p className='text-gray-300 mb-4 line-clamp-2'>{blog.description}</p>

          <div className='flex justify-between items-center text-sm text-gray-400'>
            <div className='flex items-center gap-2'>
              <span>👁️ {blog.metadata.views}</span>
              <span>❤️ {blog.metadata.likes}</span>
            </div>
            <span>
              {formatDistanceToNow(new Date(blog.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>

          <div className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity'>
            <ArrowRight className='h-5 w-5 text-purple-400' />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
