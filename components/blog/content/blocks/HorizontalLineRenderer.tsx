import React from 'react';
import { ContentBlock, HorizontalLineBlockData } from '@/types';

interface HorizontalLineRendererProps {
  block: ContentBlock & { data: HorizontalLineBlockData };
}

const styleClasses = {
  solid: 'border-t-2 border-gray-600',
  dashed: 'border-t-2 border-dashed border-gray-600',
  dotted: 'border-t-2 border-dotted border-gray-600',
};

export const HorizontalLineRenderer: React.FC<HorizontalLineRendererProps> = ({ block }) => {
  const { style = 'solid' } = block.data;

  return (
    <div className="my-8">
      <hr className={styleClasses[style]} />
    </div>
  );
};

export default HorizontalLineRenderer;
