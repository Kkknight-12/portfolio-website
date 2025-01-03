// components/blog/content/blocks/ImageRenderer.tsx

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';
import { ImageBlock } from '@/types';


interface ImageRendererProps {
  block: ImageBlock;
}

export const ImageRenderer: React.FC<ImageRendererProps> = ({ block }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { src, alt, caption, width = 800, height = 500 } = block.data;

  return (
    <figure className='my-8'>
      <div
        className={cn(
          'relative rounded-lg overflow-hidden',
          'bg-gray-100 dark:bg-gray-800',
          isLoading && 'animate-pulse'
        )}
      >
        {error ? (
          <div className='flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg'>
            <div className='text-center'>
              <ImageOff className='h-12 w-12 mx-auto mb-2 text-gray-400' />
              <p className='text-sm text-gray-500'>Failed to load image</p>
            </div>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              'object-cover transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100'
            )}
            onLoadingComplete={() => setIsLoading(false)}
            onError={() => setError(true)}
          />
        )}
      </div>
      {caption && (
        <figcaption className='mt-2 text-center text-sm text-gray-500 italic'>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
