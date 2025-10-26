'use client';

import React, { useEffect, useState } from 'react';
import { ParagraphBlock, ListBlock } from '@/types';

export interface WithSSRHighlightingProps {
  block: ParagraphBlock | ListBlock;
}

/**
 * Higher-Order Component that handles SSR/Client rendering switch
 *
 * Purpose:
 * - Prevents hydration mismatches caused by client-only libraries (RoughNotation)
 * - Improves SEO by rendering clean HTML on server
 * - Optimizes performance by only loading annotation code when needed
 *
 * How it works:
 * 1. On server + initial hydration: Renders SSR component (plain HTML)
 * 2. After hydration completes: Checks if block has annotations
 * 3. If annotations exist: Switches to Client component (with RoughNotation)
 * 4. If no annotations: Continues using SSR component (lighter weight)
 *
 * @param SSRComponent - Component for server-side rendering (no annotations)
 * @param ClientComponent - Component for client-side rendering (with annotations)
 * @returns HOC that intelligently switches between SSR and Client components
 */
export function withSSRHighlighting<P extends WithSSRHighlightingProps>(
  SSRComponent: React.ComponentType<P>,
  ClientComponent: React.ComponentType<P>
) {
  return function WithSSRHighlightingComponent(props: P) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      // Only runs on client after hydration
      setIsClient(true);
    }, []);

    // Phase 1: SSR + Hydration (renders SSR component)
    // This ensures server HTML matches initial client render
    if (!isClient) {
      return <SSRComponent {...props} />;
    }

    // Phase 2: Client-side (post-hydration)
    // Check if block has annotations
    const hasAnnotations =
      props.block.data.annotations &&
      props.block.data.annotations.length > 0;

    if (!hasAnnotations) {
      // No annotations - keep using lightweight SSR component
      return <SSRComponent {...props} />;
    }

    // Has annotations - switch to full client component with RoughNotation
    return <ClientComponent {...props} />;
  };
}

export default withSSRHighlighting;
