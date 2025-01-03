// components/blog/content/ContentRenderer.tsx
'use client';

import React from 'react';
import {
  ContentBlock,
  isCalloutBlock,
  isCodeBlock,
  isImageBlock,
  isListBlock,
  isParagraphBlock,
} from '@/types';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Import our block renderers
import {
  ParagraphRenderer,
  ImageRenderer,
  ListRenderer,
  CalloutRenderer,
} from '../blocks';
import { RoughNotationGroup } from 'react-rough-notation';
import { ErrorBoundary } from '../ErrorBoundry';
import CodeRenderer from '../blocks/codeRender';

interface ContentBlockRendererProps {
  block: ContentBlock;
}

export const ContentBlockRenderer: React.FC<ContentBlockRendererProps> = ({
  block,
}) => {
  console.log('ContentBlockRenderer ', block);
  // Memoize the rendered block to prevent unnecessary re-renders
  const renderedBlock = React.useMemo(() => {
    try {
      // Use type guards to determine the block type and render accordingly
      if (isParagraphBlock(block)) {
        return (
          <RoughNotationGroup show={true}>
            <ParagraphRenderer block={block} />
          </RoughNotationGroup>
        );
      }

      if (isCodeBlock(block)) {
        return <CodeRenderer block={block} />;
      }

      if (isImageBlock(block)) {
        return <ImageRenderer block={block} />;
      }

      if (isListBlock(block)) {
        return (
          <RoughNotationGroup show={true}>
            <ListRenderer block={block} />
          </RoughNotationGroup>
        );
      }

      if (isCalloutBlock(block)) {
        return <CalloutRenderer block={block} />;
      }

      // Handle unknown block types
      console.warn(`Unknown block type: ${(block as ContentBlock).type}`);
      return null;
    } catch (error) {
      // Log error for monitoring but don't crash the entire blog
      console.error('Error rendering content block:', error);
      return (
        <div className='text-red-500 p-4 border border-red-300 rounded'>
          Error rendering content block
        </div>
      );
    }
  }, [block]);

  // Wrap each block in an appropriate semantic HTML element
  return (
    <ErrorBoundary variant='inline'>
      <div className='content-block my-6' data-block-type={block.type}>
        {renderedBlock}
      </div>
    </ErrorBoundary>
  );
};