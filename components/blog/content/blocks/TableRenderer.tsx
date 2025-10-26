'use client';

import React from 'react';
import { ContentBlock, TableBlockData, TableCell } from '@/types';
import { RoughNotation } from 'react-rough-notation';

interface TableRendererProps {
  block: ContentBlock & { data: TableBlockData };
}

export const TableRenderer: React.FC<TableRendererProps> = ({ block }) => {
  const { rows, metadata } = block.data;

  const renderCellContent = (cell: TableCell) => {
    const { content } = cell;
    const { text, annotations = [] } = content;

    if (annotations.length === 0) {
      return text;
    }

    // Process annotations similar to paragraph renderer
    const segments: Array<{
      text: string;
      annotation?: typeof annotations[0];
    }> = [];

    let lastIndex = 0;
    const sortedAnnotations = [...annotations].sort(
      (a, b) => (a.startOffset || 0) - (b.startOffset || 0)
    );

    sortedAnnotations.forEach(annotation => {
      if (
        typeof annotation.startOffset === 'number' &&
        typeof annotation.endOffset === 'number'
      ) {
        // Add text before annotation
        if (lastIndex < annotation.startOffset) {
          segments.push({
            text: text.slice(lastIndex, annotation.startOffset)
          });
        }

        // Add annotated text
        segments.push({
          text: text.slice(annotation.startOffset, annotation.endOffset),
          annotation
        });

        lastIndex = annotation.endOffset;
      }
    });

    // Add remaining text
    if (lastIndex < text.length) {
      segments.push({
        text: text.slice(lastIndex)
      });
    }

    return (
      <>
        {segments.map((segment, index) => {
          if (!segment.annotation) {
            return <React.Fragment key={index}>{segment.text}</React.Fragment>;
          }

          const ann = segment.annotation;

          // Handle bold and code
          if (ann.type === 'bold') {
            return (
              <strong key={index} className="font-bold">
                {segment.text}
              </strong>
            );
          }

          if (ann.type === 'code') {
            return (
              <code key={index} className="px-1 py-0.5 bg-gray-800/50 text-purple-300 rounded text-xs font-mono">
                {segment.text}
              </code>
            );
          }

          // Other annotations use RoughNotation
          const displayColor = ann.type === 'highlight' && ann.color === 'black'
            ? 'rgba(181,216,238,0.53)'
            : ann.color;

          return (
            <RoughNotation
              key={index}
              type={(ann.type === 'brackets' ? 'bracket' : ann.type) as any}
              show={ann.show !== false}
              color={displayColor}
              brackets={ann.brackets as any}
              padding={2}
            >
              {segment.text}
            </RoughNotation>
          );
        })}
      </>
    );
  };

  return (
    <div className="my-8 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-700">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={row.isHeader ? 'bg-gray-800' : 'bg-gray-900/50'}>
              {row.cells.map((cell, cellIndex) => {
                const CellTag = cell.type === 'header' ? 'th' : 'td';
                const bgStyle = cell.background ? { backgroundColor: cell.background } : {};

                return (
                  <CellTag
                    key={cellIndex}
                    colSpan={cell.colspan}
                    rowSpan={cell.rowspan}
                    style={{
                      ...bgStyle,
                      width: cell.colwidth ? `${cell.colwidth}px` : undefined
                    }}
                    className={`border border-gray-700 px-4 py-2 text-left ${
                      cell.type === 'header'
                        ? 'font-bold text-purple-300'
                        : 'text-gray-300'
                    }`}
                  >
                    {renderCellContent(cell)}
                  </CellTag>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableRenderer;
