import { withSSRHighlighting } from './hoc/withSSRHighlighting';
import { ParagraphRendererSSR } from './ParagraphRendererSSR';
import { ParagraphRenderer } from './ParagraphRenderer';

/**
 * Smart Paragraph Renderer
 *
 * Automatically switches between SSR and Client rendering:
 * - SSR: Used for initial render and when no annotations present (better performance, SEO)
 * - Client: Used when annotations are detected (enables RoughNotation effects)
 *
 * This prevents hydration mismatches while maintaining annotation functionality
 */
export const SmartParagraphRenderer = withSSRHighlighting(
  ParagraphRendererSSR,
  ParagraphRenderer
);

export default SmartParagraphRenderer;
