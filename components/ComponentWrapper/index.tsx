import { Box } from '@mui/system';
import { ComponentType, ReactNode } from 'react';
import CanvasComponent from '../canvas/ParticleComponent';

type ComponentProps = {
  children?: ReactNode;
};

type ServerComponentProps = {
  params: {};
  searchParams: {};
};
const Page = (Component: ComponentType<ComponentProps>) => {
  const WithPageStyles = (props?: any) => {
    return (
      <>
        <Box className='pt-10 px-2'>
          <Component {...props} />
        </Box>
      </>
    );
  };

  return WithPageStyles;
};

export default Page;
