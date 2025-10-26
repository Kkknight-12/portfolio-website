'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ParagraphBlock } from '@/types';
import { HtmlTagType } from '@/types/blog';
import { RoughNotation } from 'react-rough-notation';

interface ParagraphRendererProps {
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

interface TextSegment {
  text: string;
  annotationId?: string;
  type?: string;
  color?: string;
  show?: boolean;
  brackets?: string[];
}

/**
 * Client-only renderer that uses position-based or regex matching
 */
export const ParagraphRenderer: React.FC<ParagraphRendererProps> = ({
  block
}) => {
  const { text, htmlTag: Tag, annotations = [], id } = block.data;
  const baseStyles = tagStyles[Tag];
  const containerRef = useRef<HTMLElement>(null);
  const [segments, setSegments] = useState<TextSegment[]>([]);
  const [isProcessed, setIsProcessed] = useState(false);

  useEffect(() => {
    if (isProcessed || annotations.length === 0) {
      return;
    }

    // Create segments based on annotations
    const newSegments: TextSegment[] = [];
    let lastIndex = 0;

    // Process annotations - use position data if available, fallback to regex
    const processedAnnotations = annotations
      .map(ann => {
        // First, try to use position-based data if available
        if (ann.startOffset !== undefined && ann.endOffset !== undefined) {
          // Use exact position data from backend
          return {
            annotation: ann,
            start: ann.startOffset,
            end: ann.endOffset,
            text: ann.text || text.slice(ann.startOffset, ann.endOffset)
          };
        }

        // Fallback to regex-based matching for old content
        try {
          const regex = new RegExp(ann.regex, 'g');
          let match;
          let occurrenceCount = 0;

          while ((match = regex.exec(text)) !== null) {
            occurrenceCount++;
            // If occurrenceNumber is specified, use it; otherwise default to first occurrence
            const targetOccurrence = ann.occurrenceNumber || 1;
            if (occurrenceCount === targetOccurrence) {
              return {
                annotation: ann,
                start: match.index,
                end: match.index + match[0].length,
                text: match[0]
              };
            }
          }
        } catch (error) {
          console.warn('Failed to process annotation with regex:', error);
        }

        return null;
      })
      .filter(Boolean)
      .sort((a, b) => a!.start - b!.start);

    // Build segments
    processedAnnotations.forEach(item => {
      if (!item) return;

      // Add text before annotation
      if (lastIndex < item.start) {
        newSegments.push({
          text: text.slice(lastIndex, item.start)
        });
      }

      // Add annotated text
      // Fix black highlight issue - only for highlight type
      let annotationColor: string = item.annotation.color;
      if (item.annotation.type === 'highlight' && item.annotation.color === 'black') {
        annotationColor = 'rgba(181,216,238,0.53)'; // Light blue for black highlights
      }

      newSegments.push({
        text: item.text,
        annotationId: `ann-${item.start}`,
        type: item.annotation.type,
        color: annotationColor as any,
        show: item.annotation.show !== false,
        brackets: item.annotation.brackets
      });

      lastIndex = item.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      newSegments.push({
        text: text.slice(lastIndex)
      });
    }

    setSegments(newSegments);
    setIsProcessed(true);
  }, [text, annotations, isProcessed]);

  // If no annotations or not processed yet, just show plain text
  if (annotations.length === 0 || segments.length === 0) {
    const props = Tag.startsWith('h')
      ? { id, className: 'scroll-mt-14' }
      : {};

    return (
      <Tag {...props} ref={containerRef as any} className={cn(baseStyles, 'relative paragraph-block')}>
        {text}
      </Tag>
    );
  }

  const props = Tag.startsWith('h')
    ? { id, className: 'scroll-mt-14' }
    : {};

  return (
    <Tag {...props} ref={containerRef as any} className={cn(baseStyles, 'relative paragraph-block')}>
      {segments.map((segment, index) => {
        if (segment.annotationId) {
          // Handle bold and code as plain HTML (not RoughNotation)
          if (segment.type === 'bold') {
            return (
              <strong key={index} className="font-bold">
                {segment.text}
              </strong>
            );
          }

          if (segment.type === 'code') {
            return (
              <code key={index} className="px-1.5 py-0.5 bg-gray-800/50 text-purple-300 rounded text-sm font-mono">
                {segment.text}
              </code>
            );
          }

          // Other annotations use RoughNotation
          // Fix bracket type for RoughNotation
          const annotationType = segment.type === 'brackets' ? 'bracket' : segment.type;

          return (
            <RoughNotation
              key={index}
              type={annotationType as any}
              show={segment.show}
              color={segment.color}
              brackets={segment.brackets as any}
              padding={4}
              multiline={true}
            >
              {segment.text}
            </RoughNotation>
          );
        }
        return <React.Fragment key={index}>{segment.text}</React.Fragment>;
      })}
    </Tag>
  );
};

export default React.memo(ParagraphRenderer);
