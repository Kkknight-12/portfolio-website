import { Card } from '@/components/ui/card';

export const BlogCardSkeleton = () => {
  return (
    <Card className='group relative overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300'>
      <div className='p-6 space-y-4'>
        {/* Category badges skeleton */}
        <div className='flex gap-2'>
          <div className='h-5 w-20 bg-white/10 rounded-full animate-pulse' />
          <div className='h-5 w-24 bg-white/10 rounded-full animate-pulse' />
        </div>

        {/* Title skeleton */}
        <div className='space-y-2'>
          <div className='h-7 bg-white/10 rounded animate-pulse' />
          <div className='h-7 w-3/4 bg-white/10 rounded animate-pulse' />
        </div>

        {/* Author and metadata skeleton */}
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-full bg-white/10 animate-pulse' />
          <div className='flex-1 space-y-2'>
            <div className='h-4 w-24 bg-white/10 rounded animate-pulse' />
            <div className='h-3 w-32 bg-white/10 rounded animate-pulse' />
          </div>
        </div>

        {/* Stats skeleton */}
        <div className='flex gap-4 pt-4 border-t border-white/5'>
          <div className='h-4 w-16 bg-white/10 rounded animate-pulse' />
          <div className='h-4 w-16 bg-white/10 rounded animate-pulse' />
        </div>
      </div>
    </Card>
  );
};