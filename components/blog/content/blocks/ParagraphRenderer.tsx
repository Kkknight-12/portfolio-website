// components/blog/content/blocks/ParagraphRenderer.tsx
import React from 'react';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';
import { cn } from '@/lib/utils';
import { ParagraphBlock, Annotation, HtmlTagType } from '@/types';

interface ParagraphRendererProps {
  block: ParagraphBlock;
}

const tagStyles: Record<HtmlTagType, string> = {
  h1: 'text-4xl font-bold mb-6',
  h2: 'text-3xl font-bold mb-5',
  h3: 'text-2xl font-bold mb-4',
  h4: 'text-xl font-bold mb-3',
  h5: 'text-lg font-bold mb-2',
  p: 'text-base leading-7 mb-4',
  div: 'mb-4',
  span: 'inline-block',
};

export const ParagraphRenderer: React.FC<ParagraphRendererProps> = ({
  block,
}) => {
  const { text, htmlTag: Tag, annotations = [], brackets = [] } = block.data;
  const baseStyles = tagStyles[Tag];

  // Process text into segments with annotations
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
      return [
        { text: content, start: 0, end: content.length, annotations: [] },
      ];
    }

    // Find segment boundaries
    const boundaries = new Set<number>();
    boundaries.add(0);
    boundaries.add(content.length);

    annotations.forEach((annotation) => {
      const regex = new RegExp(annotation.regex, 'g');
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

    // Create segments with their annotations
    for (let i = 0; i < sortedBoundaries.length - 1; i++) {
      const start = sortedBoundaries[i];
      const end = sortedBoundaries[i + 1];
      const segmentText = content.slice(start, end);

      const appliedAnnotations = annotations.filter((annotation) => {
        const regex = new RegExp(annotation.regex);
        return regex.test(content.slice(start, end));
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
          color={currentAnnotation.color}
          brackets={currentAnnotation.brackets}
          padding={4}
        >
          {renderWithAnnotations(text, rest, currentIndex + 1)}
        </RoughNotation>
      );
    };

    return renderWithAnnotations(segment.text, segment.annotations, index);
  };

  // Process segments
  const segments = processAnnotations(text, annotations);

  return (
    <RoughNotationGroup show={true}>
      <Tag className={cn(baseStyles, 'relative paragraph-block')}>
        {/* Bracket decorations if any */}
        {brackets.length > 0 ? (
          <RoughNotation
            type='bracket'
            brackets={brackets}
            show={true}
            color='black'
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
