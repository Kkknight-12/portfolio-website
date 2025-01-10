import React from 'react';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';
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

/**
 * Creates a regex pattern for method names with word boundaries
 * Handles both simple method calls and full syntax
 * @example some() -> /\bsome\(\)\b/
 * @example array.some(x => x > 5) -> matches the full pattern
 */
// const createMethodPattern = (methodName: string): RegExp => {
//   // Match the exact method name with () and ensure it's a standalone word
//   // Look behind for word boundary or whitespace
//   // Look ahead for word boundary or whitespace
//   return new RegExp(`(?<=[\\s]|^)${methodName}\\(\\)(?=[\\s]|$|[.,!?])`, 'g');
// };
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
    return new RegExp(`\\b${pattern}\\b`, 'g');
  }
};

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

  // Render annotated segment recursively
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
        <RoughNotation
          key={currentIndex}
          type={
            currentAnnotation.type === 'brackets'
              ? 'bracket'
              : currentAnnotation.type
          }
          show={currentAnnotation.show}
          color={
            currentAnnotation.type === 'highlight' &&
            currentAnnotation.color === 'black'
              ? '#ee82ee61'
              : currentAnnotation.color === 'black'
              ? 'violet'
              : 'currentColor'
          }
          brackets={currentAnnotation.brackets}
          padding={1}
        >
          {renderWithAnnotations(text, rest, currentIndex + 1)}
        </RoughNotation>
      );
    };

    return renderWithAnnotations(segment.text, segment.annotations, index);
  };

  // Process and render segments
  const segments = processAnnotations(text, annotations);

  const props = Tag.startsWith('h')
    ? {
        id,
        className: 'scroll-mt-20', // Adjust based on your navbar height
      }
    : {};

  return (
    <RoughNotationGroup show={true}>
      <Tag {...props} className={cn(baseStyles, 'relative paragraph-block')}>
        {brackets.length > 0 ? (
          <RoughNotation
            type='bracket'
            brackets={brackets}
            show={true}
            color='violet'
            strokeWidth={2}
          >
            {segments.map((segment, index) =>
              renderAnnotatedSegment(
                {
                  text: segment.text,
                  annotations: segment.annotations,
                },
                index
              )
            )}
          </RoughNotation>
        ) : (
          segments.map((segment, index) =>
            renderAnnotatedSegment(
              {
                text: segment.text,
                annotations: segment.annotations,
              },
              index
            )
          )
        )}
      </Tag>
    </RoughNotationGroup>
  );
};

export default React.memo(ParagraphRenderer);
