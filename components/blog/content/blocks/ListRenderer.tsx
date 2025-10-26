'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { ListBlock } from '@/types';
import { RoughNotation } from 'react-rough-notation';

interface ListRendererProps {
  block: ListBlock;
}

interface AnnotationSegment {
  text: string;
  annotationId?: string;
  type?: string;
  color?: string;
  show?: boolean;
  brackets?: string[];
}

/**
 * Enterprise-grade list renderer with per-item annotation support
 * Each list item has its own annotation space (0-based positions)
 */
export const ListRenderer: React.FC<ListRendererProps> = ({
  block
}) => {
  const { items, text, annotations = [], style = 'unordered' } = block.data;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  /**
   * Group annotations by itemIndex for efficient lookup
   * This is computed once and memoized
   */
  const annotationsByItem = useMemo(() => {
    const grouped = new Map<number, typeof annotations>();
    annotations.forEach(annotation => {
      // Only process annotations with valid itemIndex
      if (typeof annotation.itemIndex === 'number' && annotation.itemIndex >= 0) {
        const itemAnnotations = grouped.get(annotation.itemIndex) || [];
        itemAnnotations.push(annotation);
        grouped.set(annotation.itemIndex, itemAnnotations);
      }
    });

    return grouped;
  }, [annotations]);

  /**
   * Process a single item's text with its annotations
   * Clean, single-responsibility function
   */
  const processItemWithAnnotations = (
    itemText: string,
    itemAnnotations: typeof annotations
  ): AnnotationSegment[] => {
    if (!itemAnnotations || itemAnnotations.length === 0) {
      return [{ text: itemText }];
    }

    // Sort annotations by start position to process in order
    const sortedAnnotations = [...itemAnnotations].sort(
      (a, b) => (a.startOffset || 0) - (b.startOffset || 0)
    );

    const segments: AnnotationSegment[] = [];
    let lastIndex = 0;

    sortedAnnotations.forEach(annotation => {
      // Validate annotation has required position data
      if (
        typeof annotation.startOffset !== 'number' ||
        typeof annotation.endOffset !== 'number' ||
        annotation.startOffset < 0 ||
        annotation.endOffset > itemText.length ||
        annotation.startOffset >= annotation.endOffset
      ) {
        console.warn('Invalid annotation positions:', annotation);
        return;
      }

      // Add text before annotation
      if (lastIndex < annotation.startOffset) {
        segments.push({
          text: itemText.slice(lastIndex, annotation.startOffset)
        });
      }

      // Add annotated segment
      const annotatedText = itemText.slice(annotation.startOffset, annotation.endOffset);

      // Handle black highlight color (use light blue for visibility)
      const displayColor = annotation.type === 'highlight' && annotation.color === 'black'
        ? 'rgba(181,216,238,0.53)'
        : annotation.color;

      segments.push({
        text: annotatedText,
        annotationId: `item-${annotation.itemIndex}-${annotation.startOffset}-${annotation.endOffset}`,
        type: annotation.type,
        color: displayColor,
        show: annotation.show !== false,
        brackets: annotation.brackets
      });

      lastIndex = annotation.endOffset;
    });

    // Add remaining text after last annotation
    if (lastIndex < itemText.length) {
      segments.push({
        text: itemText.slice(lastIndex)
      });
    }

    return segments;
  };

  /**
   * Render annotation segments with RoughNotation or plain HTML
   */
  const renderSegments = (segments: AnnotationSegment[]) => {
    return segments.map((segment, index) => {
      if (!segment.annotationId) {
        return <React.Fragment key={index}>{segment.text}</React.Fragment>;
      }

      // Handle bold and code as plain HTML (not RoughNotation)
      if (segment.type === 'bold') {
        return (
          <strong key={segment.annotationId} className="font-bold">
            {segment.text}
          </strong>
        );
      }

      if (segment.type === 'code') {
        return (
          <code key={segment.annotationId} className="px-1.5 py-0.5 bg-gray-800/50 text-purple-300 rounded text-sm font-mono">
            {segment.text}
          </code>
        );
      }

      // Other annotations use RoughNotation
      return (
        <RoughNotation
          key={segment.annotationId}
          type={(segment.type === 'brackets' ? 'bracket' : segment.type) as any}
          show={segment.show}
          color={segment.color}
          brackets={segment.brackets as any}
          padding={4}
          multiline={true}
        >
          {segment.text}
        </RoughNotation>
      );
    });
  };

  /**
   * Helper to get item text (handles both old and new format)
   */
  const getItemText = (item: any): string => {
    return typeof item === 'string' ? item : item.text;
  };

  /**
   * Helper to get item children (supports two-level nesting)
   */
  const getItemChildren = (item: any): Array<{ text: string; children: string[] }> | string[] => {
    return typeof item === 'object' && item.children ? item.children : [];
  };

  /**
   * Helper to get item annotations (new format has annotations per item)
   */
  const getItemAnnotations = (item: any, index: number) => {
    // New format: annotations are stored in the item itself
    if (typeof item === 'object' && item.annotations && item.annotations.length > 0) {
      return item.annotations;
    }
    // Old format: annotations are in the parent list with itemIndex
    return annotationsByItem.get(index) || [];
  };

  /**
   * Render list item with processed annotations
   */
  const renderListItem = (item: any, index: number) => {
    const itemText = getItemText(item);
    const children = getItemChildren(item);

    if (!isClient) {
      // SSR: Return plain text without annotations
      return (
        <>
          {itemText}
          {/* Nested bullet list for children (two-level nesting) */}
          {children.length > 0 && (
            <ul className='list-disc pl-6 space-y-1 mt-1'>
              {children.map((child: any, childIndex: number) => {
                // Handle both old format (string) and new format (object with text, children)
                const childText = typeof child === 'string' ? child : child.text;
                const grandchildren = typeof child === 'object' && child.children ? child.children : [];

                return (
                  <li key={childIndex} className='my-1'>
                    {childText}
                    {/* Grandchildren (second level nesting) */}
                    {grandchildren.length > 0 && (
                      <ul className='list-disc pl-6 space-y-1'>
                        {grandchildren.map((grandchild: string, grandchildIndex: number) => (
                          <li key={grandchildIndex} className='my-1'>
                            {grandchild}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </>
      );
    }

    // Get annotations for this specific item
    const itemAnnotations = getItemAnnotations(item, index);

    if (itemAnnotations.length === 0) {
      return (
        <>
          {itemText}
          {/* Nested bullet list for children (two-level nesting) */}
          {children.length > 0 && (
            <ul className='list-disc pl-6 space-y-1 mt-1'>
              {children.map((child: any, childIndex: number) => {
                // Handle both old format (string) and new format (object with text, children)
                const childText = typeof child === 'string' ? child : child.text;
                const grandchildren = typeof child === 'object' && child.children ? child.children : [];

                return (
                  <li key={childIndex} className='my-1'>
                    {childText}
                    {/* Grandchildren (second level nesting) */}
                    {grandchildren.length > 0 && (
                      <ul className='list-disc pl-6 space-y-1'>
                        {grandchildren.map((grandchild: string, grandchildIndex: number) => (
                          <li key={grandchildIndex} className='my-1'>
                            {grandchild}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </>
      );
    }

    // Client-side with annotations: process and render
    const segments = processItemWithAnnotations(itemText, itemAnnotations);

    return (
      <>
        {renderSegments(segments)}
        {/* Nested bullet list for children (two-level nesting) */}
        {children.length > 0 && (
          <ul className='list-disc pl-6 space-y-1 mt-1'>
            {children.map((child: any, childIndex: number) => {
              // Handle both old format (string) and new format (object with text, children)
              const childText = typeof child === 'string' ? child : child.text;
              const grandchildren = typeof child === 'object' && child.children ? child.children : [];

              return (
                <li key={childIndex} className='my-1'>
                  {childText}
                  {/* Grandchildren (second level nesting) */}
                  {grandchildren.length > 0 && (
                    <ul className='list-disc pl-6 space-y-1'>
                      {grandchildren.map((grandchild: string, grandchildIndex: number) => (
                        <li key={grandchildIndex} className='my-1'>
                          {grandchild}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </>
    );
  };

  return (
    <div className='list-block my-6'>
      {/* Main list */}
      {style === 'ordered' ? (
        <ol className='list-decimal pl-6 space-y-2'>
          {items.map((item, index) => (
            <li key={index} className='my-2' data-testid={`list-item-${index}`}>
              {renderListItem(item, index)}
            </li>
          ))}
        </ol>
      ) : (
        <ul className='list-disc pl-6 space-y-2'>
          {items.map((item, index) => (
            <li key={index} className='my-2' data-testid={`list-item-${index}`}>
              {renderListItem(item, index)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(ListRenderer);
