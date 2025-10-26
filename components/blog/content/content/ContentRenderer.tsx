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
  isBlockquoteBlock,
  isHorizontalLineBlock,
  isLinkBlock,
  isTableBlock,
} from '@/types';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Import our block renderers
import { ImageRenderer, CalloutRenderer } from '../blocks';
import { RoughNotationGroup } from 'react-rough-notation';
import { ErrorBoundary } from '../ErrorBoundry';
import CodeRenderer from '../blocks/codeRender';
import { generateHeadingId } from '@/utils/heading';
import { SmartListRenderer } from '../blocks/SmartListRenderer';
import { SmartParagraphRenderer } from '../blocks/SmartParagraphRenderer';
import { BlockquoteRenderer } from '../blocks/BlockquoteRenderer';
import { HorizontalLineRenderer } from '../blocks/HorizontalLineRenderer';
import { LinkRenderer } from '../blocks/LinkRenderer';
import { TableRenderer } from '../blocks/TableRenderer';
interface ContentBlockRendererProps {
  block: ContentBlock;
}

export const ContentBlockRenderer: React.FC<ContentBlockRendererProps> = ({
  block,
}) => {
  const addHeadingId = (block: ContentBlock) => {
    if (
      isParagraphBlock(block) &&
      'htmlTag' in block.data &&
      block.data.htmlTag.startsWith('h')
    ) {
      const id = generateHeadingId(block.data.text);
      return {
        ...block,
        data: {
          ...block.data,
          id, // This will be used in ParagraphRenderer
        },
      };
    }
    return block;
  };

  // Memoize the rendered block to prevent unnecessary re-renders
  const renderedBlock = React.useMemo(() => {
    try {
      const processedBlock = addHeadingId(block);
      // Use type guards to determine the block type and render accordingly
      if (isParagraphBlock(processedBlock)) {
        //  return renderParagraphBlock(block.data);
        // return (
        //   <RoughNotationGroup show={true}>
        //     <ParagraphRenderer block={block} />
        //   </RoughNotationGroup>
        // );
        return (
          <RoughNotationGroup show={true}>
            <SmartParagraphRenderer block={processedBlock} />
          </RoughNotationGroup>
        );
      }

      if (isCodeBlock(processedBlock)) {
        return <CodeRenderer block={processedBlock} />;
      }

      if (isImageBlock(processedBlock)) {
        return <ImageRenderer block={processedBlock} />;
      }

      if (isListBlock(processedBlock)) {
        return (
          <RoughNotationGroup show={true}>
            <SmartListRenderer block={processedBlock} />
          </RoughNotationGroup>
        );
      }

      if (isCalloutBlock(processedBlock)) {
        return <CalloutRenderer block={processedBlock} />;
      }

      if (isBlockquoteBlock(processedBlock)) {
        return <BlockquoteRenderer block={processedBlock} />;
      }

      if (isHorizontalLineBlock(processedBlock)) {
        return <HorizontalLineRenderer block={processedBlock} />;
      }

      if (isLinkBlock(processedBlock)) {
        return <LinkRenderer block={processedBlock} />;
      }

      if (isTableBlock(processedBlock)) {
        return <TableRenderer block={processedBlock} />;
      }

      // Handle unknown block types
      console.warn(
        `Unknown block type: ${(processedBlock as ContentBlock).type}`
      );
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
