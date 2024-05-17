import { Box } from '@mui/system';
import { ComponentType, ReactNode } from 'react';

type ComponentProps = {
  children?: ReactNode;
};

const Page = (Component: any) => {
  const WithPageStyles = (props: any) => (
    <Box className='pt-10 px-2'>
      {/* <CanvasComponent /> */}
      <Component {...props} />
    </Box>
  );

  return WithPageStyles;
};

export default Page;
