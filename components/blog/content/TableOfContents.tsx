import React, { useEffect, useState } from 'react';
import { ContentBlock } from '@/types';
import { motion } from 'framer-motion';

interface TableOfContentsProps {
  content: ContentBlock[];
}

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  // Extract headings from content blocks
  useEffect(() => {
    const extractedHeadings = content
      .filter(
        (block) =>
          block.type === 'paragraph' &&
          'htmlTag' in block.data &&
          block.data.htmlTag.startsWith('h')
      )
      .map((block) => {
        const data = block.data as { text: string; htmlTag: string };
        const level = parseInt(data.htmlTag.charAt(1));
        return {
          id: data.text.toLowerCase().replace(/\s+/g, '-'),
          text: data.text,
          level,
        };
      });

    setHeadings(extractedHeadings);
  }, [content]);

  // Handle scroll and highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(({ id }) =>
        document.getElementById(id)
      );

      const currentHeading = headingElements.find((element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight / 2;
      });

      if (currentHeading) {
        setActiveHeading(currentHeading.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className='ml-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border-white/10'>
      <h3 className='text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
        Table of Contents
      </h3>
      <nav className='space-y-2'>
        {headings.map((heading) => (
          <motion.a
            key={heading.id}
            href={`#${heading.id}`}
            className={`
              block text-sm transition-colors duration-200
              ${
                activeHeading === heading.id
                  ? 'text-purple-400'
                  : 'text-gray-400 hover:text-gray-200'
              }
              ${heading.level === 2 ? 'ml-0' : 'ml-4'}
            `}
            style={{
              paddingLeft: `${(heading.level - 2) * 0.75}rem`,
            }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
            whileHover={{ x: 5 }}
          >
            {heading.text}
          </motion.a>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;
