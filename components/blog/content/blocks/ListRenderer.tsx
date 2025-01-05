// src/features/Blog/BlogViewer/components/ContentBlock/ListRenderer.tsx

import React, { useCallback } from 'react';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';
import { ListBlock, Annotation } from '@/types';

interface ListRendererProps {
  block: ListBlock;
}

const createMethodPattern = (methodName: string): RegExp => {
  // return new RegExp(`${methodName}\\(\\)`, 'g');
  return new RegExp(`\\b${methodName}\\b`, 'g');
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

  // Find all boundaries including code blocks
  const boundaries = new Set<number>();
  boundaries.add(0);
  boundaries.add(content.length);

  annotations.forEach((annotation) => {
    // Create appropriate regex based on annotation type
    const regex = createMethodPattern(annotation.regex);
    let match;

    while ((match = regex.exec(content)) !== null) {
      boundaries.add(match.index);
      boundaries.add(match.index + match[0].length);
    }
  });

  const sortedBoundaries = Array.from(boundaries).sort((a, b) => a - b);
  const segments: Array<{
    text: string;
    start: number;
    end: number;
    annotations: Annotation[];
  }> = [];

  // Process segments with their annotations
  for (let i = 0; i < sortedBoundaries.length - 1; i++) {
    const start = sortedBoundaries[i];
    const end = sortedBoundaries[i + 1];
    const segmentText = content.slice(start, end);

    const appliedAnnotations = annotations.filter((annotation) => {
      const regex = createMethodPattern(annotation.regex);
      return regex.test(segmentText);
    });

    segments.push({
      text: segmentText,
      start,
      end,
      annotations: appliedAnnotations,
    });
  }

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
  console.log('ListRenderer ', block.data);

  /**
   * Processes text to find annotation matches
   * Returns segments with their applicable annotations
   *
   * @param text - Text to process
   * @param annotations - Array of annotations to apply
   */
  // const processTextSegments = useCallback(
  //   (content: string, annotations: Annotation[]) => {
  //     if (!annotations.length) {
  //       return [{ text: content, annotations: [] }];
  //     }

  //     // Find all annotation boundaries
  //     type Boundary = {
  //       index: number;
  //       isStart: boolean;
  //       annotation: Annotation;
  //     };

  //     const boundaries: Boundary[] = [];

  //     annotations.forEach((annotation) => {
  //       const regex = new RegExp(annotation.regex, 'g');
  //       let match;

  //       while ((match = regex.exec(content)) !== null) {
  //         boundaries.push(
  //           {
  //             index: match.index,
  //             isStart: true,
  //             annotation,
  //           },
  //           {
  //             index: match.index + match[0].length,
  //             isStart: false,
  //             annotation,
  //           }
  //         );
  //       }
  //     });

  //     // Sort boundaries by index
  //     boundaries.sort((a, b) => {
  //       if (a.index !== b.index) return a.index - b.index;
  //       return a.isStart ? -1 : 1;
  //     });

  //     if (!boundaries.length) {
  //       return [{ text: content, annotations: [] }];
  //     }

  //     // Create segments
  //     const segments: Array<{
  //       text: string;
  //       annotations: Annotation[];
  //     }> = [];

  //     let currentIndex = 0;
  //     const activeAnnotations: Annotation[] = [];

  //     boundaries.forEach((boundary) => {
  //       if (currentIndex < boundary.index) {
  //         segments.push({
  //           text: content.slice(currentIndex, boundary.index),
  //           annotations: [...activeAnnotations],
  //         });
  //       }

  //       if (boundary.isStart) {
  //         activeAnnotations.push(boundary.annotation);
  //       } else {
  //         const index = activeAnnotations.findIndex(
  //           (a) => a === boundary.annotation
  //         );
  //         if (index !== -1) {
  //           activeAnnotations.splice(index, 1);
  //         }
  //       }

  //       currentIndex = boundary.index;
  //     });

  //     if (currentIndex < content.length) {
  //       segments.push({
  //         text: content.slice(currentIndex),
  //         annotations: [...activeAnnotations],
  //       });
  //     }

  //     return segments;
  //   },
  //   []
  // );

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
            color={current.color}
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
      <div className='text-xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent'>
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
