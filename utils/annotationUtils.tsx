// utils/annotationUtils.ts

import { Annotation } from '@/types';
import React from 'react';

interface TextSegment {
  text: string;
  annotations: Annotation[];
}

interface AnnotationBoundary {
  index: number;
  isStart: boolean;
  annotation: Annotation;
}

/**
 * Creates a regex pattern for matching method names and code syntax
 * @param methodName - The method or pattern to match
 * @returns RegExp for matching the pattern
 */
// export const createMethodPattern = (pattern: string): RegExp => {
//   return new RegExp(`(?<=[\\s]|^)${pattern}\\(\\)(?=[\\s]|$|[.,!?])`, 'g');
// };
const createMethodPattern = (methodName: string): RegExp => {
  return new RegExp(`${methodName}\\(\\)`, 'g');
};

/**
 * Processes text content and returns segments with their applicable annotations
 * Can be used by any block type (Paragraph, List, Callout, etc.)
 *
 * @param content - Text content to process
 * @param annotations - Array of annotations to apply
 * @returns Array of text segments with their annotations
 */
export const processAnnotations = (
  content: string,
  annotations: Annotation[]
): TextSegment[] => {
  if (!annotations?.length) {
    return [{ text: content, annotations: [] }];
  }

  // Find all annotation boundaries
  const boundaries: AnnotationBoundary[] = [];

  annotations.forEach((annotation) => {
    const regex = createMethodPattern(annotation.regex);
    let match;

    while ((match = regex.exec(content)) !== null) {
      boundaries.push(
        {
          index: match.index,
          isStart: true,
          annotation,
        },
        {
          index: match.index + match[0].length,
          isStart: false,
          annotation,
        }
      );
    }
  });

  // Sort boundaries by index
  boundaries.sort((a, b) => {
    if (a.index !== b.index) return a.index - b.index;
    // If indices are same, put start boundary before end boundary
    return a.isStart ? -1 : 1;
  });

  if (!boundaries.length) {
    return [{ text: content, annotations: [] }];
  }

  // Create segments
  const segments: TextSegment[] = [];
  let currentIndex = 0;
  const activeAnnotations: Annotation[] = [];

  // Process each boundary
  boundaries.forEach((boundary) => {
    // Add segment for text before current boundary if exists
    if (currentIndex < boundary.index) {
      segments.push({
        text: content.slice(currentIndex, boundary.index),
        annotations: [...activeAnnotations],
      });
    }

    // Update active annotations
    if (boundary.isStart) {
      activeAnnotations.push(boundary.annotation);
    } else {
      const index = activeAnnotations.findIndex(
        (a) => a === boundary.annotation
      );
      if (index !== -1) {
        activeAnnotations.splice(index, 1);
      }
    }

    currentIndex = boundary.index;
  });

  // Add remaining text as final segment if exists
  if (currentIndex < content.length) {
    segments.push({
      text: content.slice(currentIndex),
      annotations: [...activeAnnotations],
    });
  }

  return segments;
};

/**
 * Renders a segment with its annotations using RoughNotation
 * Shared render logic for all block types
 *
 * @param segment - Text segment with its annotations
 * @param renderNotation - Function to render RoughNotation component
 * @returns JSX element with applied annotations
 */
export const renderAnnotatedSegment = (
  segment: TextSegment,
  index: number,
  renderNotation: (props: {
    type: string;
    show: boolean;
    color: string;
    brackets?: string[];
    children: React.ReactNode;
  }) => JSX.Element
): JSX.Element => {
  const renderWithAnnotations = (
    text: string,
    annotations: Annotation[],
    depth: number
  ): JSX.Element => {
    if (!annotations.length) {
      return <React.Fragment key={`${index}-${depth}`}>{text}</React.Fragment>;
    }

    const [current, ...remaining] = annotations;

    return renderNotation({
      type: current.type === 'brackets' ? 'bracket' : current.type,
      show: current.show,
      color: current.color,
      brackets: current.brackets,
      children: renderWithAnnotations(text, remaining, depth + 1),
    });
  };

  return renderWithAnnotations(segment.text, segment.annotations, 0);
};
