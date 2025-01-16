import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { cn } from '@/lib/utils';
import { ParagraphBlock, Annotation, HtmlTagType } from '@/types';

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

// Animations
const drawUnderline = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const fadeHighlight = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const drawCircle = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

const createMethodPattern = (pattern: string): RegExp => {
  // Check if the pattern includes parentheses
  const hasParentheses = pattern.includes('()');

  if (hasParentheses) {
    //   // For method calls like some(), find(), etc.
    //   const methodName = pattern.replace('()', '');
    //   return new RegExp(`\\b${methodName}\\(\\)\\b`, 'g');
    return new RegExp(`(?<=[\\s]|^)${pattern}\\(\\)(?=[\\s]|$|[.,!?])`, 'g');
  } else {
    // For normal text matches, use word boundaries
    // return new RegExp(`\\b${pattern}\\b`, 'g');
    const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escapedPattern, 'g');
  }
};

// Base styled component for annotations
const AnnotationWrapper = styled.span<{
  type: string;
  color: string;
  brackets?: string[];
}>`
  position: relative;
  display: inline-block;
  white-space: pre-wrap;

  ${(props) => {
    switch (props.type) {
      case 'highlight':
        return css`
          background-color: ${props.color === 'black'
            ? '#ee82ee61'
            : `${props.color}`};
          border-radius: 0.2em;
          padding: 0.1em 0.2em;
          animation: ${fadeHighlight} 0.3s ease forwards;
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
            background-color: ${props.color === 'black'
              ? 'violet'
              : props.color};
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
            border: 2px solid
              ${props.color === 'black' ? 'violet' : props.color};
            border-radius: 1em;
            animation: ${drawCircle} 0.3s ease forwards;
            z-index: -1;
          }
        `;

      case 'bracket':
        return css`
          padding: 0 4px;
          ${props.brackets?.includes('left') &&
          css`
            &::before {
              content: '[';
              position: absolute;
              left: -4px;
              color: ${props.color === 'black' ? 'violet' : props.color};
            }
          `}
          ${props.brackets?.includes('right') &&
          css`
            &::after {
              content: ']';
              position: absolute;
              right: -4px;
              color: ${props.color === 'black' ? 'violet' : props.color};
            }
          `}
        `;

      default:
        return '';
    }
  }}
`;

// Wrapper for paragraph with brackets
const BracketWrapper = styled.span<{ color: string }>`
  position: relative;
  display: inline-block;
  padding: 0 4px;

  &::before {
    content: '[';
    position: absolute;
    left: -4px;
    color: ${(props) => props.color};
  }

  &::after {
    content: ']';
    position: absolute;
    right: -4px;
    color: ${(props) => props.color};
  }
`;

/**
 * Enhanced segment processor that respects code blocks and method calls
 */
const processAnnotations = (
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

export const ParagraphRenderer: React.FC<ParagraphRendererProps> = ({
  block,
}) => {
  const {
    text,
    htmlTag: Tag,
    annotations = [],
    brackets = [],
    id,
  } = block.data;
  const baseStyles = tagStyles[Tag];

  const renderAnnotatedSegment = (
    segment: {
      text: string;
      annotations: Annotation[];
    },
    index: number
  ): JSX.Element => {
    if (!segment.annotations.length) {
      return <React.Fragment key={index}>{segment.text}</React.Fragment>;
    }

    const renderWithAnnotations = (
      text: string,
      remainingAnnotations: Annotation[],
      currentIndex: number
    ): JSX.Element => {
      if (!remainingAnnotations.length) {
        return <React.Fragment key={currentIndex}>{text}</React.Fragment>;
      }

      const [currentAnnotation, ...rest] = remainingAnnotations;

      return (
        <AnnotationWrapper
          key={currentIndex}
          type={
            currentAnnotation.type === 'brackets'
              ? 'bracket'
              : currentAnnotation.type
          }
          //   color={
          //     currentAnnotation.type === 'highlight' &&
          //     currentAnnotation.color === 'black'
          //       ? '#ee82ee61'
          //       : currentAnnotation.color === 'black'
          //       ? 'violet'
          //       : currentAnnotation.color
          //   }
          color={currentAnnotation.color}
          brackets={currentAnnotation.brackets}
        >
          {renderWithAnnotations(text, rest, currentIndex + 1)}
        </AnnotationWrapper>
      );
    };

    return renderWithAnnotations(segment.text, segment.annotations, index);
  };

  const segments = processAnnotations(text, annotations);

  const props = Tag.startsWith('h')
    ? {
        id,
        className: 'scroll-mt-14',
      }
    : {};

  const content = segments.map((segment, index) =>
    renderAnnotatedSegment(
      {
        text: segment.text,
        annotations: segment.annotations,
      },
      index
    )
  );

  return (
    <Tag {...props} className={cn(baseStyles, 'relative paragraph-block')}>
      {brackets.length > 0 ? (
        <BracketWrapper color='violet'>{content}</BracketWrapper>
      ) : (
        content
      )}
    </Tag>
  );
};

export default React.memo(ParagraphRenderer);
