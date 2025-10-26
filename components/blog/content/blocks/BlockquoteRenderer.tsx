import React from 'react';
import { ContentBlock, BlockquoteBlockData } from '@/types';

interface BlockquoteRendererProps {
  block: ContentBlock & { data: BlockquoteBlockData };
}

export const BlockquoteRenderer: React.FC<BlockquoteRendererProps> = ({ block }) => {
  const { text, citation } = block.data;

  return (
    <blockquote className="border-l-4 border-purple-400 pl-6 py-2 my-6 italic text-gray-300">
      <p className="text-lg leading-relaxed">{text}</p>
      {citation && (
        <footer className="mt-3 text-sm text-gray-400 not-italic">
          — <cite>{citation}</cite>
        </footer>
      )}
    </blockquote>
  );
};

export default BlockquoteRenderer;
