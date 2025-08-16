// components/blog/content/blocks/CalloutRenderer.tsx

import { CalloutBlock } from '@/types';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  AlertCircle,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface CalloutRendererProps {
  block: CalloutBlock;
}

/**
 * Style configuration for different callout types
 * Maps style types to their visual representations
 */
const CALLOUT_STYLES = {
  warning: {
    icon: AlertTriangle,
    className: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    iconClassName: 'text-yellow-600',
    headingClassName: 'text-yellow-800',
  },
  success: {
    icon: CheckCircle2,
    className: 'bg-green-50 border-green-200 text-green-800',
    iconClassName: 'text-green-600',
    headingClassName: 'text-green-800',
  },
  error: {
    icon: XCircle,
    className: 'bg-red-50 border-red-200 text-red-800',
    iconClassName: 'text-red-600',
    headingClassName: 'text-red-800',
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 text-blue-800',
    iconClassName: 'text-blue-600',
    headingClassName: 'text-blue-800',
  },
  gray: {
    icon: AlertCircle,
    className: 'bg-gray-50 border-gray-200 text-gray-800',
    iconClassName: 'text-gray-600',
    headingClassName: 'text-gray-800',
  },
  white: {
    icon: AlertCircle,
    className: 'bg-white border-gray-200 text-gray-800',
    iconClassName: 'text-gray-600',
    headingClassName: 'text-gray-800',
  },
} as const;

/**
 * CalloutRenderer Component
 *
 * Renders callout blocks with:
 * - Different styles (warning, success, error, info, etc.)
 * - Custom icons
 * - Optional headings
 * - Markdown support in content
 * - Responsive design
 *
 * @param {CalloutRendererProps} props - The callout block to render
 * @returns {JSX.Element} Rendered callout with styling
 */
export const CalloutRenderer: React.FC<CalloutRendererProps> = ({ block }) => {
  console.log('CalloutRenderer ', block);
  const { heading, text, style } = block.data;
  // const { heading, text, style, icon: customIcon } = block.data;

  // Get style configuration based on callout type
  const styleConfig = CALLOUT_STYLES[style] || CALLOUT_STYLES.info;
  const Icon = styleConfig.icon;

  /**
   * Processes text content to handle markdown-style formatting
   * Currently supports basic markdown like **bold** and *italic*
   */
  const processText = (content: string): JSX.Element => {
    // Replace **text** with <strong>text</strong>
    const boldPattern = /\*\*(.*?)\*\*/g;
    const italicPattern = /\*(.*?)\*/g;

    const parts = content.split(/(\*\*.*?\*\*|\*.*?\*)/g);

    return (
      <>
        {parts.map((part, index) => {
          if (boldPattern.test(part)) {
            return <strong key={index}>{part.replace(/\*\*/g, '')}</strong>;
          }
          if (italicPattern.test(part)) {
            return <em key={index}>{part.replace(/\*/g, '')}</em>;
          }
          return part;
        })}
      </>
    );
  };

  return (
    <div
      className={cn(
        'callout relative my-6 rounded-lg border',
        'p-3 sm:p-4', // Responsive padding
        'transition-colors duration-200',
        styleConfig.className
      )}
      role='alert'
      aria-labelledby={heading ? `callout-${block.order}` : undefined}
    >
      {/* Icon and Content Container */}
      <div className='flex items-start space-x-2 sm:space-x-4'>
        {' '}
        {/* Reduced spacing on mobile */}
        {/* Icon */}
        <div className={cn('flex-shrink-0 mt-1', styleConfig.iconClassName)}>
          <Icon className='h-4 w-4 sm:h-5 sm:w-5' />{' '}
          {/* Smaller icon on mobile */}
        </div>
        {/* Content */}
        <div className='flex-1 min-w-0'>
          {' '}
          {/* min-w-0 prevents flex child from overflowing */}
          {/* Heading (if provided) */}
          {heading && (
            <h4
              id={`callout-heading-${block.order}`}
              className={cn(
                'text-base sm:text-lg font-semibold leading-6',
                'break-words', // Ensures long words break
                styleConfig.headingClassName
              )}
            >
              {processText(heading)}
            </h4>
          )}
          {/* Main Text Content */}
          <div className='text-sm leading-relaxed break-words overflow-wrap-anywhere'>
            {processText(text)}
          </div>
        </div>
      </div>
    </div>
  );
};

// Type safety enhancements
type CalloutStyleType = keyof typeof CALLOUT_STYLES;

// Extend the CalloutBlock type to ensure style is one of the valid options
declare module '@/types' {
  interface CalloutBlockData {
    style: CalloutStyleType;
    icon?: string;
  }
}

export default React.memo(CalloutRenderer);

/**
 * Optional accessibility component for screen readers
 * Use this when you need to provide additional context
 */
const ScreenReaderText: React.FC<{ children: string }> = ({ children }) => (
  <span className='sr-only'>{children}</span>
);
