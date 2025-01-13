// src/features/Blog/BlogViewer/components/ContentBlock/ListRenderer.tsx

import React, { useCallback } from 'react';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';
import { ListBlock, Annotation } from '@/types';

interface ListRendererProps {
  block: ListBlock;
}

// const createMethodPattern = (methodName: string): RegExp => {
//   // return new RegExp(`${methodName}\\(\\)`, 'g');
//   return new RegExp(`\\b${methodName}\\b`, 'g');
// };

// const createMethodPattern = (methodName: string): RegExp => {
//   // Escape special regex characters and create a pattern that matches the exact phrase
//   const escapedPattern = methodName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//   console.log('Pattern created:', escapedPattern); // Debug
//   return new RegExp(escapedPattern, 'g');
// };

// const createMethodPattern = (methodName: string): RegExp => {
//   // 1. Escape special regex characters
//   const escapedPattern = methodName
//     .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
//     // 2. Allow for flexible whitespace
//     .replace(/\s+/g, '\\s+');

//   // 3. Add word boundaries only for single words
//   const isSingleWord = !methodName.includes(' ');
//   const pattern = isSingleWord
//     ? `\\b${escapedPattern}\\b` // Add word boundaries for single words
//     : escapedPattern; // Use exact matching for phrases

//   return new RegExp(pattern, 'g');
// };

const createMethodPattern = (methodName: string): RegExp => {
  const escapedPattern = methodName
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\s+/g, '\\s+');

  const isSingleWord = !methodName.includes(' ');
  const pattern = isSingleWord ? `\\b${escapedPattern}\\b` : escapedPattern;

  return new RegExp(pattern, 'g');
};
/**
 * Enhanced segment processor that respects code blocks and method calls
 */
const processTextSegments = (
  content: string,
  annotations: Annotation[]
): Array<{
  text: string;
  start: number;
  end: number;
  annotations: Annotation[];
}> => {
  if (!annotations.length) {
    return [{ text: content, start: 0, end: content.length, annotations: [] }];
  }

  // 1. Create a mapping of positions to annotation changes
  type AnnotationChange = {
    position: number;
    annotation: Annotation;
    isStart: boolean;
  };

  const changes: AnnotationChange[] = [];

  // 2. Find all annotation boundaries with context
  annotations.forEach((annotation) => {
    const regex = createMethodPattern(annotation.regex);
    let match;

    while ((match = regex.exec(content)) !== null) {
      console.log('match ', match);
      changes.push(
        {
          position: match.index,
          annotation,
          isStart: true,
        },
        {
          position: match.index + match[0].length,
          annotation,
          isStart: false,
        }
      );
    }
  });
  console.log('changes before  ', changes);

  // 3. Sort changes by position and type (starts before ends)
  changes.sort((a, b) => {
    if (a.position !== b.position) return a.position - b.position;
    return a.isStart ? -1 : 1; // Start changes come before end changes
  });
  console.log('changes after  ', changes);

  // 4. Process segments with active annotations tracking
  const segments: Array<{
    text: string;
    start: number;
    end: number;
    annotations: Annotation[];
  }> = [];

  let currentPosition = 0;
  const activeAnnotations = new Set<Annotation>();

  // Add start position if not already included
  if (!changes.length || changes[0].position > 0) {
    segments.push({
      text: content.slice(0, changes[0]?.position || content.length),
      start: 0,
      end: changes[0]?.position || content.length,
      annotations: [],
    });
  }
  console.log('segments before ', segments);

  // Process each change
  for (let i = 0; i < changes.length; i++) {
    const currentChange = changes[i];
    const nextChange = changes[i + 1];
    const nextPosition = nextChange?.position ?? content.length;

    // Update active annotations
    if (currentChange.isStart) {
      activeAnnotations.add(currentChange.annotation);
    } else {
      activeAnnotations.delete(currentChange.annotation);
    }

    // Create segment if there's text between this and next change
    if (nextPosition > currentChange.position) {
      segments.push({
        text: content.slice(currentChange.position, nextPosition),
        start: currentChange.position,
        end: nextPosition,
        annotations: Array.from(activeAnnotations),
      });
    }
  }
console.log('segments after ', segments);
  return segments;
};

/**
 * ListRenderer Component
 *
 * Renders list blocks with:
 * - Ordered and unordered list support
 * - Text annotations for list items
 * - Custom list styles
 * - Nested annotations
 * - Accessibility support
 *
 * @param {ListRendererProps} props - The list block to render
 * @returns {JSX.Element} Rendered list with annotations
 */
export const ListRenderer: React.FC<ListRendererProps> = ({ block }) => {
  const { items, text, annotations = [], style = 'unordered' } = block.data;

  /**
   * Processes text to find annotation matches
   * Returns segments with their applicable annotations
   *
   * @param text - Text to process
   * @param annotations - Array of annotations to apply
   */

  /**
   * Renders a text segment with its annotations
   * Handles nested annotations recursively
   */
  const renderAnnotatedSegment = useCallback(
    (
      segment: {
        text: string;
        annotations: Annotation[];
      },
      index: number
    ): JSX.Element => {
      const renderWithAnnotations = (
        text: string,
        annotations: Annotation[],
        depth: number
      ): JSX.Element => {
        if (!annotations.length) {
          return (
            <React.Fragment key={`${index}-${depth}`}>{text}</React.Fragment>
          );
        }

        const [current, ...remaining] = annotations;

        return (
          <RoughNotation
            key={`${index}-${depth}`}
            type={current.type == 'brackets' ? 'bracket' : current.type}
            show={current.show}
            color={
              current.type === 'highlight' && current.color === 'black'
                ? '#ee82ee61'
                : current.color === 'black'
                ? 'violet'
                : 'currentColor'
            }
            brackets={current.brackets}
            padding={4}
          >
            {renderWithAnnotations(text, remaining, depth + 1)}
          </RoughNotation>
        );
      };

      return renderWithAnnotations(segment.text, segment.annotations, 0);
    },
    []
  );

  /**
   * Renders a list item with its annotations
   */
  const renderListItem = useCallback(
    (item: string, index: number): JSX.Element => {
      const segments = processTextSegments(item, annotations);

      return (
        <li key={index} className='my-2' data-testid={`list-item-${index}`}>
          {segments.map((segment, segIndex) =>
            renderAnnotatedSegment(segment, segIndex)
          )}
        </li>
      );
    },
    [annotations, processTextSegments, renderAnnotatedSegment]
  );

  /**
   * Renders the list header/description if provided
   */
  const renderListHeader = useCallback(() => {
    if (!text) return null;

    const segments = processTextSegments(text, annotations);

    return (
      <div className='mb-4'>
        {segments.map((segment, index) =>
          renderAnnotatedSegment(segment, index)
        )}
      </div>
    );
  }, [text, annotations, processTextSegments, renderAnnotatedSegment]);

  return (
    <div className='list-block my-6'>
      {/* List description/header */}
      {renderListHeader()}

      {/* Main list */}
      <RoughNotationGroup show={true}>
        {style === 'ordered' ? (
          <ol className='list-decimal pl-6 space-y-2'>
            {items.map((item, index) => renderListItem(item, index))}
          </ol>
        ) : (
          <ul className='list-disc pl-6 space-y-2'>
            {items.map((item, index) => renderListItem(item, index))}
          </ul>
        )}
      </RoughNotationGroup>
    </div>
  );
};

export default React.memo(ListRenderer);

// Optional: CSS styles (can be moved to a separate file)
const styles = `
  .list-block {
    /* Base styles */
    @apply relative;

    /* List item styles */
    li {
      @apply relative leading-relaxed;
    }

    /* Nested list styles */
    ul ul, ol ol, ul ol, ol ul {
      @apply mt-2 mb-2;
    }

    /* Animation styles */
    .rough-annotation {
      @apply transition-opacity duration-300;
    }
  }
`;
