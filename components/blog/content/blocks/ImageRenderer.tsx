// src/features/Blog/BlogViewer/components/ContentBlock/ImageRenderer.tsx

import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { ImageBlock } from '@/types';
import { cn } from '@/lib/utils';

interface ImageRendererProps {
  block: ImageBlock;
}

/**
 * ImageRenderer Component
 *
 * Renders image blocks with:
 * - Lazy loading
 * - Responsive sizing
 * - Fallback handling
 * - Loading states
 * - Captions
 * - Accessibility
 *
 * @param {ImageRendererProps} props - The image block to render
 * @returns {JSX.Element} Rendered image with wrapper and caption
 */
export const ImageRenderer: React.FC<ImageRendererProps> = ({ block }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const { src, alt } = block.data;

  /**
   * Preloads the image to get dimensions and check for errors
   */
  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setDimensions({
        width: img.width,
        height: img.height,
      });
      setIsLoading(false);
      setError(null);
    };

    img.onerror = () => {
      setError('Failed to load image');
      setIsLoading(false);
    };
  }, [src]);

  /**
   * Calculates responsive image dimensions
   */
  const getImageDimensions = () => {
    // if (metadata?.width && metadata?.height) {
    //   return {
    //     width: metadata.width,
    //     height: metadata.height,
    //   };
    // }

    if (dimensions) {
      // Calculate responsive dimensions based on container width
      const maxWidth = 800; // Maximum width in the blog layout
      const aspectRatio = dimensions.height / dimensions.width;

      if (dimensions.width > maxWidth) {
        return {
          width: maxWidth,
          height: Math.round(maxWidth * aspectRatio),
        };
      }

      return dimensions;
    }

    // Default dimensions if none are available
    return {
      width: 800,
      height: 450,
    };
  };

  /**
   * Renders the appropriate fallback based on state
   */
  const renderFallback = () => {
    if (error) {
      return (
        <div className='flex items-center justify-center w-full h-48 bg-gray-100 rounded-md'>
          <div className='text-center'>
            <p className='text-red-500 mb-2'>Failed to load image</p>
            <p className='text-sm text-gray-500'>{alt}</p>
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className='animate-pulse w-full h-48 bg-gray-200 rounded-md' />
      );
    }

    return null;
  };

  const imageDimensions = getImageDimensions();

  return (
    <figure className='my-8'>
      <div
        className={cn(
          'relative rounded-lg overflow-hidden',
          isLoading && 'bg-gray-100'
        )}
      >
        {/* Fallback content */}
        {renderFallback()}

        {/* Main image */}
        {!error && (
          <div
            className={cn(
              'transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100'
            )}
          >
            <NextImage
              src={src}
              alt={alt}
              width={imageDimensions.width}
              height={imageDimensions.height}
              // className={cn(
              //   'object-cover rounded-lg',
              //   metadata?.objectFit === 'contain' && 'object-contain'
              // )}
              className={cn('object-cover rounded-lg ')}
              // priority={metadata?.priority}
              // quality={metadata?.quality || 75}
              onLoadingComplete={() => setIsLoading(false)}
              onError={() => setError('Failed to load image')}
            />
          </div>
        )}

        {/* Image source attribution if available */}
        {/* {metadata?.sourceUrl && (
          <a
            href={metadata.sourceUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded'
          >
            Source
          </a>
        )} */}
      </div>

      {/* Caption */}
      {/* {caption && (
        <figcaption className='mt-2 text-sm text-center text-gray-500 italic'>
          {caption}
        </figcaption>
      )} */}

      {/* Metadata display for debugging in development */}
      {/* {process.env.NODE_ENV === 'development' && metadata && (
        <div className='mt-2 text-xs text-gray-400'>
          <pre>{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      )} */}
    </figure>
  );
};

// Extended metadata types for clarity
declare module '@/types' {
  interface ImageBlockMetadata {
    width?: number;
    height?: number;
    priority?: boolean;
    quality?: number;
    objectFit?: 'cover' | 'contain';
    sourceUrl?: string;
  }
}

export default React.memo(ImageRenderer);
