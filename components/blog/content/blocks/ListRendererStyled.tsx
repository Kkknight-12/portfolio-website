// src/features/Blog/BlogViewer/components/ContentBlock/ListRenderer.tsx

import React, { useCallback } from 'react';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';
import { ListBlock, Annotation } from '@/types';
import styled, { css, keyframes } from 'styled-components';

interface ListRendererProps {
  block: ListBlock;
}

// Animations
const drawUnderline = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const drawCircle = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Base styled component for annotations
const AnnotationWrapper = styled.span<{
  type: string;
  color: string;
  brackets?: string[];
}>`
  position: relative;
  display: inline-block;
  white-space: pre-wrap;

  ${props => {
    switch (props.type) {
      case 'highlight':
        return css`
          background-color: ${props.color === 'black' 
            ? '#ee82ee61' 
            : `${props.color}33`};
          border-radius: 0.2em;
          padding: 0.1em 0.2em;
          animation: ${fadeIn} 0.3s ease forwards;
        `;

      case 'underline':
        return css`
          &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -2px;
            height: 2px;
            background-color: ${props.color === 'black' ? 'violet' : props.color};
            animation: ${drawUnderline} 0.3s ease forwards;
          }
        `;

      case 'circle':
        return css`
          &::before {
            content: '';
            position: absolute;
            left: -4px;
            right: -4px;
            top: -4px;
            bottom: -4px;
            border: 2px solid ${props.color === 'black' ? 'violet' : props.color};
            border-radius: 1em;
            animation: ${drawCircle} 0.3s ease forwards;
            z-index: -1;
          }
        `;

      case 'bracket':
        return css`
          padding: 0 4px;
          ${props.brackets?.includes('left') && css`
            &::before {
              content: '[';
              position: absolute;
              left: -4px;
              color: ${props.color === 'black' ? 'violet' : props.color};
              animation: ${fadeIn} 0.3s ease forwards;
            }
          `}
          ${props.brackets?.includes('right') && css`
            &::after {
              content: ']';
              position: absolute;
              right: -4px;
              color: ${props.color === 'black' ? 'violet' : props.color};
              animation: ${fadeIn} 0.3s ease forwards;
            }
          `}
        `;

      default:
        return '';
    }
  }}
`;


const createMethodPattern = (methodName: string): RegExp => {
  const escapedPattern = methodName
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\s+/g, '\\s+');

  const isSingleWord = !methodName.includes(' ');
  const pattern = isSingleWord ? `\\b${escapedPattern}\\b` : escapedPattern;

  return new RegExp(pattern, 'g');
};

/**
 * Processes text to find annotation matches
 * Returns segments with their applicable annotations
 *
 * @param content - Text to process
 * @param annotations - Array of annotations to apply
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
          <AnnotationWrapper
            key={`${index}-${depth}`}
            type={current.type === 'brackets' ? 'bracket' : current.type}
            color={current.color}
            brackets={current.brackets}
          >
            {renderWithAnnotations(text, remaining, depth + 1)}
          </AnnotationWrapper>
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