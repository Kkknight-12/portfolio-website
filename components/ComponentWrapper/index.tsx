import { Box } from '@mui/system';
import { ComponentType, ReactNode } from 'react';

type ComponentProps = {
  children?: ReactNode;
};

type ServerComponentProps = {
  params: {};
  searchParams: {};
};
const Page = (Component: ComponentType<ComponentProps>) => {
  const WithPageStyles = (props?: any) => {
    console.log('props ', props);
    return (
      <Box className='pt-10 px-2'>
        {/* <CanvasComponent /> */}
        <Component {...props} />
      </Box>
    );
  };

  return WithPageStyles;
};

export default Page;
