import React from 'react';
import { ContentBlock, LinkBlockData } from '@/types';
import { ExternalLink } from 'lucide-react';

interface LinkRendererProps {
  block: ContentBlock & { data: LinkBlockData };
}

export const LinkRenderer: React.FC<LinkRendererProps> = ({ block }) => {
  const { url, name, openInNewTab = true } = block.data;

  return (
    <div className="my-6">
      <a
        href={url}
        target={openInNewTab ? '_blank' : '_self'}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center gap-2 px-4 py-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-400/30 rounded-lg text-purple-300 hover:text-purple-200 transition-all duration-200 group"
      >
        <span className="font-medium">{name}</span>
        {openInNewTab && (
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        )}
      </a>
    </div>
  );
};

export default LinkRenderer;
