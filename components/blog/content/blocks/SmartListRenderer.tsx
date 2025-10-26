import { withSSRHighlighting } from './hoc/withSSRHighlighting';
import { ListRendererSSR } from './ListRendererSSR';
import { ListRenderer } from './ListRenderer';

/**
 * Smart List Renderer
 *
 * Automatically switches between SSR and Client rendering:
 * - SSR: Used for initial render and when no annotations present (better performance, SEO)
 * - Client: Used when annotations are detected (enables RoughNotation effects)
 *
 * This prevents hydration mismatches while maintaining annotation functionality
 */
export const SmartListRenderer = withSSRHighlighting(
  ListRendererSSR,
  ListRenderer
);

export default SmartListRenderer;
