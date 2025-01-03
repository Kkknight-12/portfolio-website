import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SandboxCodeData } from '@/types';
import { memo, useMemo } from 'react';

// Dependencies List Component
const DependenciesList = memo(
  ({ dependencies }: { dependencies: string[] }) => (
    <div className='mt-4 text-sm text-muted-foreground'>
      <h4 className='font-medium'>Dependencies:</h4>
      <ul className='list-disc list-inside'>
        {dependencies.map((dep, index) => (
          <li key={index}>{dep}</li>
        ))}
      </ul>
    </div>
  )
);

// Set display name for DependenciesList
DependenciesList.displayName = 'DependenciesList';

// Sandbox Block Component
const SandboxBlock = memo(
  ({ sandbox, metadata }: Omit<SandboxCodeData, 'displayType'>) => {
    const embedUrl = useMemo(() => {
      const sandboxUrl = new URL(sandbox.url);
      return sandboxUrl.href.replace('/s/', '/embed/');
    }, [sandbox.url]);

    return (
      <>
        <CardHeader>
          <CardTitle className='text-sm font-medium'>
            {'CodeSandbox Preview'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mt-4 border rounded-md overflow-hidden'>
            <iframe
              src={embedUrl}
              style={{
                width: '100%',
                height: '500px',
                border: '0',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
              title='Code Preview'
              allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking'
              sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'
              loading='lazy'
            />
          </div>
          {metadata?.dependencies && metadata.dependencies.length > 0 && (
            <DependenciesList dependencies={metadata.dependencies} />
          )}
        </CardContent>
      </>
    );
  }
);

// Set display name for SandboxBlock
SandboxBlock.displayName = 'SandboxBlock';

export default SandboxBlock;
