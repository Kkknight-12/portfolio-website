// components/blog/content/blocks/CodeRenderer.tsx
'use client';

import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/types';
import { isSandboxCodeBlock, isSimpleCodeBlock } from '@/types/blog/form';
import React, { memo } from 'react';
import SandboxBlock from './SandboxBlock';
import { SimpleCodeBlock } from './SimpleCodeBlock';


interface CodeRendererProps {
  block: CodeBlock;
}

const CodeRenderer: React.FC<CodeRendererProps> = memo(({ block }) => {
  isSimpleCodeBlock;
  return (
    <CodeErrorBoundary>
      <Card className='code-block relative'>
        {isSimpleCodeBlock(block.data) && (
          <SimpleCodeBlock
            code={block.data.code}
            language={block.data.language}
          />
        )}
        {isSandboxCodeBlock(block.data) && (
          <SandboxBlock
            sandbox={block.data.sandbox}
            metadata={block.data.metadata}
          />
        )}
      </Card>
    </CodeErrorBoundary>
  );
});

// Set display name for SandboxBlock
CodeRenderer.displayName = 'CodeRenderer';

export default CodeRenderer;

// Error Boundary Component for Code Blocks
class CodeErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='p-4 text-red-500 bg-red-50 rounded-md'>
          Failed to render code block. Please try refreshing the page.
        </div>
      );
    }

    return this.props.children;
  }
}
