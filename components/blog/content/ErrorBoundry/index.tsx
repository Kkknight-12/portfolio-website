// src/components/shared/ErrorBoundary/ErrorBoundary.tsx

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallbackUI?: ReactNode; // Custom error UI
  onReset?(): void;
  // Custom props for different error UIs
  variant?: 'default' | 'minimal' | 'inline';
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Shared ErrorBoundary Component
 * Can be used across the application with customizable error UI
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
    // Log error to your preferred error tracking service
    console.error('Caught error:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    this.props.onReset?.();
  };

  /**
   * Renders minimal error UI for inline components
   */
  private renderMinimalError(): ReactNode {
    return (
      <div className='text-red-500 p-4 border border-red-300 rounded-md bg-red-50'>
        <div className='flex items-center gap-2'>
          <AlertTriangle className='h-4 w-4' />
          <span>Failed to render content</span>
        </div>
        <Button
          variant='ghost'
          size='sm'
          onClick={this.handleReset}
          className='mt-2'
        >
          Try Again
        </Button>
      </div>
    );
  }

  /**
   * Renders inline error UI for content blocks
   */
  private renderInlineError(): ReactNode {
    return (
      <div className='text-red-500 p-3 text-sm border border-red-200 rounded'>
        Failed to render content block
        <Button
          variant='ghost'
          size='sm'
          onClick={this.handleReset}
          className='ml-2'
        >
          Retry
        </Button>
      </div>
    );
  }

  /**
   * Renders default full error UI
   */
  private renderDefaultError(): ReactNode {
    const isDevelopment = process.env.NODE_ENV === 'development';

    return (
      <Card className='error-boundary-card w-full max-w-2xl mx-auto my-8'>
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <AlertTriangle className='h-5 w-5 text-red-500' />
            <CardTitle>Error Occurred</CardTitle>
          </div>
          <CardDescription>
            {isDevelopment && this.state.error
              ? this.state.error.message
              : 'Something went wrong. Please try again.'}
          </CardDescription>
        </CardHeader>

        {isDevelopment && this.state.errorInfo && (
          <CardContent>
            <details className='text-sm'>
              <summary className='cursor-pointer text-muted-foreground hover:text-foreground'>
                Error Details
              </summary>
              <pre className='mt-2 whitespace-pre-wrap bg-muted p-4 rounded-md overflow-auto'>
                {this.state.error?.stack}
                <hr className='my-2 border-muted-foreground/20' />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          </CardContent>
        )}

        <CardFooter className='flex justify-end space-x-2'>
          <Button
            variant='outline'
            onClick={() => window.location.reload()}
            className='space-x-2'
          >
            <RefreshCcw className='h-4 w-4' />
            <span>Refresh Page</span>
          </Button>
          <Button onClick={this.handleReset}>Try Again</Button>
        </CardFooter>
      </Card>
    );
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback UI if provided
      if (this.props.fallbackUI) {
        return this.props.fallbackUI;
      }

      // Otherwise, use variant-based error UI
      switch (this.props.variant) {
        case 'minimal':
          return this.renderMinimalError();
        case 'inline':
          return this.renderInlineError();
        default:
          return this.renderDefaultError();
      }
    }

    return this.props.children;
  }
}

/**
 * HOC for easier usage of ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}
