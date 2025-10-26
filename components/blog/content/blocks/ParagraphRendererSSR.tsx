import React from 'react';
import { cn } from '@/lib/utils';
import { ParagraphBlock } from '@/types';
import { HtmlTagType } from '@/types/blog';

interface ParagraphRendererSSRProps {
  block: ParagraphBlock;
}

const tagStyles: Record<HtmlTagType, string> = {
  h1: 'text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent',
  h2: 'text-3xl font-bold mb-5 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent',
  h3: 'text-2xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent',
  h4: 'text-xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent',
  h5: 'text-lg font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent',
  p: 'text-base leading-7 mb-4',
  div: 'mb-4',
  span: 'inline-block',
};

/**
 * SSR-only paragraph renderer - plain HTML without annotations
 * Used for initial server render and SEO
 */
export const ParagraphRendererSSR: React.FC<ParagraphRendererSSRProps> = ({
  block
}) => {
  const { text, htmlTag: Tag, id } = block.data;
  const baseStyles = tagStyles[Tag];

  const props = Tag.startsWith('h')
    ? { id, className: 'scroll-mt-14' }
    : {};

  return (
    <Tag {...props} className={cn(baseStyles, 'relative paragraph-block')}>
      {text}
    </Tag>
  );
};

export default ParagraphRendererSSR;
