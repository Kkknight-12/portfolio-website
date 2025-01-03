// components/blog/BlogDetailHeader.tsx
'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Category } from '@/types';

interface BlogDetailHeaderProps {
  title: string;
  author: string;
  views: number;
  categories: Category[];
}

export function BlogDetailHeader({
  title,
  author,
  views,
  categories,
}: BlogDetailHeaderProps) {
  return (
    <motion.div
      className='bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 mb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className='text-3xl font-bold mb-4'>{title}</h1>

      <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-4'>
        <span>By {author}</span>
        <span>•</span>
        <span>{views} views</span>
      </div>

      <div className='flex items-center gap-2'>
        <span className='text-gray-600 dark:text-gray-400'>Categories:</span>
        <div className='flex flex-wrap gap-2'>
          {categories.map((category) => (
            <Badge
              key={category._id}
              className='bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
