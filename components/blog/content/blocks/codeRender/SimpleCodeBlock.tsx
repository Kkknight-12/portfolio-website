import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCheck, Copy } from 'lucide-react';
import { shikiService } from '@/lib/shikiHighlighter';
import { cn } from '@/lib/utils';
import { BundledLanguage } from 'shiki';

interface SimpleCodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export const SimpleCodeBlock = ({
  code,
  language,
  title,
}: SimpleCodeBlockProps) => {
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load and highlight code
  useEffect(() => {
    const highlightCode = async () => {
      try {
        setIsLoading(true);
        const html = await shikiService.highlightCode(code, {
          lang: language as BundledLanguage,
          theme: 'github-dark',
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error('Error highlighting code:', error);
      } finally {
        setIsLoading(false);
      }
    };

    highlightCode();
  }, [code, language]);

  // Handle copy functionality
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }, [code]);

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='flex flex-row items-center justify-between py-2'>
        <CardTitle className='text-sm font-medium'>
          {title || `${language} snippet`}
        </CardTitle>
        <Button
          variant='ghost'
          size='sm'
          onClick={handleCopy}
          className='h-8 w-8 p-0'
          aria-label={isCopied ? 'Copied' : 'Copy code'}
        >
          {isCopied ? (
            <CheckCheck className='h-4 w-4 text-green-500' />
          ) : (
            <Copy className='h-4 w-4' />
          )}
        </Button>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='relative'>
          {isLoading ? (
            <div className='animate-pulse bg-muted h-32' />
          ) : (
            <div
              className={cn(
                'shiki-code-block overflow-x-auto',
                'max-h-[800px] overflow-y-auto',
                'font-mono text-sm flex',
                '[&_pre]:!h-full [&_pre]:!flex-grow'
              )}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          )}
          <div className='absolute top-0 right-0 px-2 py-1 text-xs text-muted-foreground bg-muted rounded-bl'>
            {language}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
