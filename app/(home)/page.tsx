import Page from '@/components/ComponentWrapper';
import { Box } from '@mui/material';
import Intro from './_components/intro';

function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'text.primary',
        p: 3,
      }}
    >
      <Intro />
    </Box>
  );
}

export default Page(HomePage);
