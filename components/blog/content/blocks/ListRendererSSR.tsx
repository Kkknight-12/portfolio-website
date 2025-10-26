import React from 'react';
import { ListBlock } from '@/types';

interface ListRendererSSRProps {
  block: ListBlock;
}

/**
 * SSR-only list renderer - plain HTML without annotations
 * Used for initial server render and SEO
 */
export const ListRendererSSR: React.FC<ListRendererSSRProps> = ({
  block
}) => {
  const { items, style = 'unordered' } = block.data;

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
   * Render list item without annotations
   */
  const renderListItem = (item: any, index: number) => {
    const itemText = getItemText(item);
    const children = getItemChildren(item);

    return (
      <>
        {itemText}
        {/* Nested bullet list for children (two-level nesting) */}
        {children.length > 0 && (
          <ul className='list-disc pl-6 space-y-1 mt-1'>
            {children.map((child: any, childIndex: number) => {
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

export default ListRendererSSR;
